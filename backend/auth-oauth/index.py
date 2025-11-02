'''
Business: Универсальная OAuth авторизация (Google, Yandex, Twitter/X)
Args: event - HTTP запрос с provider (google/yandex/twitter) в path и queryStringParameters
Returns: Редирект на OAuth провайдера или JWT токен после авторизации
'''
import json
import os
import psycopg2
from urllib.parse import urlencode
import requests
from datetime import datetime, timedelta
import secrets

PROVIDERS_CONFIG = {
    'google': {
        'auth_url': 'https://accounts.google.com/o/oauth2/v2/auth',
        'token_url': 'https://oauth2.googleapis.com/token',
        'user_info_url': 'https://www.googleapis.com/oauth2/v2/userinfo',
        'client_id_env': 'GOOGLE_CLIENT_ID',
        'client_secret_env': 'GOOGLE_CLIENT_SECRET',
        'scope': 'openid email profile'
    },
    'yandex': {
        'auth_url': 'https://oauth.yandex.ru/authorize',
        'token_url': 'https://oauth.yandex.ru/token',
        'user_info_url': 'https://login.yandex.ru/info',
        'client_id_env': 'YANDEX_CLIENT_ID',
        'client_secret_env': 'YANDEX_CLIENT_SECRET',
        'scope': ''
    },
    'twitter': {
        'auth_url': 'https://twitter.com/i/oauth2/authorize',
        'token_url': 'https://api.twitter.com/2/oauth2/token',
        'user_info_url': 'https://api.twitter.com/2/users/me',
        'client_id_env': 'TWITTER_API_KEY',
        'client_secret_env': 'TWITTER_API_SECRET',
        'scope': 'tweet.read users.read'
    }
}

def handler(event, context):
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    path = event.get('path', '')
    query_params = event.get('queryStringParameters', {}) or {}
    
    provider = query_params.get('provider', 'google')
    
    if provider not in PROVIDERS_CONFIG:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неизвестный провайдер'})
        }
    
    if query_params.get('code'):
        return handle_callback(provider, query_params, context)
    else:
        return initiate_oauth(provider, context)

def initiate_oauth(provider, context):
    config = PROVIDERS_CONFIG[provider]
    client_id = os.environ.get(config['client_id_env'])
    redirect_uri = f"https://your-domain.com/api/auth/oauth?provider={provider}"
    
    params = {
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code'
    }
    
    if config['scope']:
        params['scope'] = config['scope']
    
    if provider == 'google':
        params['access_type'] = 'offline'
    
    auth_url = f"{config['auth_url']}?{urlencode(params)}"
    
    return {
        'statusCode': 302,
        'headers': {
            'Location': auth_url,
            'Access-Control-Allow-Origin': '*'
        },
        'body': ''
    }

def handle_callback(provider, query_params, context):
    code = query_params.get('code')
    
    if not code:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Код не получен'})
        }
    
    config = PROVIDERS_CONFIG[provider]
    client_id = os.environ.get(config['client_id_env'])
    client_secret = os.environ.get(config['client_secret_env'])
    redirect_uri = f"https://your-domain.com/api/auth/oauth?provider={provider}"
    
    token_data = {
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    
    token_response = requests.post(config['token_url'], data=token_data)
    
    if token_response.status_code != 200:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Ошибка получения токена', 'details': token_response.text})
        }
    
    access_token = token_response.json().get('access_token')
    
    auth_header = 'Bearer ' + access_token
    if provider == 'yandex':
        auth_header = 'OAuth ' + access_token
    
    user_info_response = requests.get(
        config['user_info_url'],
        headers={'Authorization': auth_header}
    )
    
    if user_info_response.status_code != 200:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Ошибка получения данных пользователя'})
        }
    
    user_info = user_info_response.json()
    
    if provider == 'twitter':
        user_info = user_info.get('data', {})
    
    provider_id = str(user_info.get('id', user_info.get('sub', '')))
    email = user_info.get('email', user_info.get('default_email', f'{provider_id}@{provider}.user'))
    name = user_info.get('name', user_info.get('display_name', user_info.get('username', 'Пользователь')))
    
    conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, role, status FROM users 
        WHERE provider = %s AND provider_id = %s
    """, (provider, provider_id))
    
    user = cur.fetchone()
    
    if user:
        user_id, role, status = user
        
        if status == 'blocked':
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Аккаунт заблокирован'})
            }
        
        cur.execute("""
            UPDATE users SET last_login = %s WHERE id = %s
        """, (datetime.now(), user_id))
    else:
        cur.execute("""
            INSERT INTO users (email, name, provider, provider_id, email_verified, role)
            VALUES (%s, %s, %s, %s, TRUE, 'user')
            RETURNING id, role
        """, (email, name, provider, provider_id))
        
        user_id, role = cur.fetchone()
    
    token = secrets.token_urlsafe(32)
    expires_at = datetime.now() + timedelta(days=30)
    
    cur.execute("""
        INSERT INTO sessions (user_id, token, expires_at)
        VALUES (%s, %s, %s)
    """, (user_id, token, expires_at))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 302,
        'headers': {
            'Location': f"https://your-domain.com/?token={token}",
            'Access-Control-Allow-Origin': '*'
        },
        'body': ''
    }
