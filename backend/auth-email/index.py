'''
Business: Email/пароль авторизация с reCAPTCHA и подтверждением по email
Args: event - HTTP запрос (POST) с email, password, code, action
Returns: Success/error с токеном или кодом подтверждения
'''
import json
import os
import psycopg2
import requests
import hashlib
import secrets
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event, context):
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    body = json.loads(event.get('body', '{}'))
    action = body.get('action')
    
    if action == 'register':
        return handle_register(body, context)
    elif action == 'verify':
        return handle_verify(body, context)
    elif action == 'login':
        return handle_login(body, context)
    else:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неизвестное действие'})
        }

def verify_recaptcha(token):
    secret = os.environ.get('RECAPTCHA_SECRET_KEY')
    response = requests.post('https://www.google.com/recaptcha/api/siteverify', data={
        'secret': secret,
        'response': token
    })
    result = response.json()
    return result.get('success', False) and result.get('score', 0) >= 0.5

def send_verification_email(email, code):
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = email
    msg['Subject'] = 'Код подтверждения PozLite Studio'
    
    body = f'''
    <html>
        <body>
            <h2>Добро пожаловать в PozLite Studio!</h2>
            <p>Ваш код подтверждения:</p>
            <h1 style="color: #8B5CF6; font-size: 32px;">{code}</h1>
            <p>Код действителен 5 минут.</p>
        </body>
    </html>
    '''
    
    msg.attach(MIMEText(body, 'html'))
    
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()

def handle_register(body, context):
    email = body.get('email')
    password = body.get('password')
    name = body.get('name', email.split('@')[0])
    recaptcha_token = body.get('recaptchaToken')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'})
        }
    
    if len(password) < 8:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пароль должен быть минимум 8 символов'})
        }
    
    if not verify_recaptcha(recaptcha_token):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'reCAPTCHA проверка не пройдена'})
        }
    
    conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    cur = conn.cursor()
    
    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
    if cur.fetchone():
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email уже зарегистрирован'})
        }
    
    code = ''.join([str(secrets.randbelow(10)) for _ in range(6)])
    expires_at = datetime.now() + timedelta(minutes=5)
    
    cur.execute("""
        INSERT INTO email_verifications (email, code, expires_at)
        VALUES (%s, %s, %s)
    """, (email, code, expires_at))
    
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    cur.execute("""
        INSERT INTO users (email, name, password_hash, role, email_verified)
        VALUES (%s, %s, %s, 'user', FALSE)
    """, (email, name, password_hash))
    
    conn.commit()
    cur.close()
    conn.close()
    
    send_verification_email(email, code)
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'message': 'Код отправлен на email',
            'email': email
        })
    }

def handle_verify(body, context):
    email = body.get('email')
    code = body.get('code')
    
    if not email or not code:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и код обязательны'})
        }
    
    conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    cur = conn.cursor()
    
    cur.execute("""
        SELECT code, expires_at FROM email_verifications
        WHERE email = %s
        ORDER BY created_at DESC
        LIMIT 1
    """, (email,))
    
    result = cur.fetchone()
    
    if not result:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Код не найден'})
        }
    
    stored_code, expires_at = result
    
    if datetime.now() > expires_at:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Код истёк'})
        }
    
    if code != stored_code:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный код'})
        }
    
    cur.execute("""
        UPDATE users SET email_verified = TRUE, last_login = %s
        WHERE email = %s
        RETURNING id, role
    """, (datetime.now(), email))
    
    user_data = cur.fetchone()
    
    if not user_data:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Пользователь не найден'})
        }
    
    user_id, role = user_data
    
    token = secrets.token_urlsafe(32)
    token_expires = datetime.now() + timedelta(days=30)
    
    cur.execute("""
        INSERT INTO sessions (user_id, token, expires_at)
        VALUES (%s, %s, %s)
    """, (user_id, token, token_expires))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'token': token
        })
    }

def handle_login(body, context):
    email = body.get('email')
    password = body.get('password')
    recaptcha_token = body.get('recaptchaToken')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'})
        }
    
    if not verify_recaptcha(recaptcha_token):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'reCAPTCHA проверка не пройдена'})
        }
    
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    
    conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, role, status, email_verified FROM users
        WHERE email = %s AND password_hash = %s
    """, (email, password_hash))
    
    user = cur.fetchone()
    
    if not user:
        cur.close()
        conn.close()
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный email или пароль'})
        }
    
    user_id, role, status, email_verified = user
    
    if status == 'blocked':
        cur.close()
        conn.close()
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Аккаунт заблокирован'})
        }
    
    if not email_verified:
        cur.close()
        conn.close()
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email не подтверждён'})
        }
    
    cur.execute("""
        UPDATE users SET last_login = %s WHERE id = %s
    """, (datetime.now(), user_id))
    
    token = secrets.token_urlsafe(32)
    token_expires = datetime.now() + timedelta(days=30)
    
    cur.execute("""
        INSERT INTO sessions (user_id, token, expires_at)
        VALUES (%s, %s, %s)
    """, (user_id, token, token_expires))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'token': token
        })
    }
