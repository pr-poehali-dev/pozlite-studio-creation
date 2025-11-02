'''
Business: Получение информации о текущем пользователе по токену
Args: event - HTTP GET запрос с заголовком X-Auth-Token
Returns: Данные пользователя (id, email, name, role, status)
'''
import json
import os
import psycopg2
from datetime import datetime

def handler(event, context):
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Токен не предоставлен'})
        }
    
    conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    cur = conn.cursor()
    
    cur.execute("""
        SELECT u.id, u.email, u.name, u.avatar_url, u.role, u.status, u.provider, u.created_at
        FROM users u
        INNER JOIN sessions s ON u.id = s.user_id
        WHERE s.token = %s AND s.expires_at > %s
    """, (token, datetime.now()))
    
    user = cur.fetchone()
    
    cur.close()
    conn.close()
    
    if not user:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Недействительный или истёкший токен'})
        }
    
    user_id, email, name, avatar_url, role, status, provider, created_at = user
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'id': user_id,
            'email': email,
            'name': name,
            'avatar': avatar_url or '',
            'role': role,
            'status': status,
            'provider': provider,
            'createdAt': created_at.isoformat() if created_at else None
        })
    }
