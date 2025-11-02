'''
Business: Управление пользователями для админа (список, блокировка, мут, удаление)
Args: event - HTTP запрос с методами GET/POST/PUT/DELETE и заголовком X-Auth-Token
Returns: Список пользователей или результат операции
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
        SELECT u.role FROM users u
        INNER JOIN sessions s ON u.id = s.user_id
        WHERE s.token = %s AND s.expires_at > %s
    """, (token, datetime.now()))
    
    admin = cur.fetchone()
    
    if not admin or admin[0] != 'admin':
        cur.close()
        conn.close()
        return {
            'statusCode': 403,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Доступ запрещён'})
        }
    
    if method == 'GET':
        cur.execute("""
            SELECT id, email, name, avatar_url, role, status, provider, created_at, last_login
            FROM users
            ORDER BY created_at DESC
        """)
        
        users = []
        for row in cur.fetchall():
            users.append({
                'id': row[0],
                'email': row[1],
                'name': row[2],
                'avatar': row[3] or '',
                'role': row[4],
                'status': row[5],
                'provider': row[6],
                'createdAt': row[7].isoformat() if row[7] else None,
                'lastLogin': row[8].isoformat() if row[8] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'users': users, 'total': len(users)})
        }
    
    elif method == 'PUT':
        body = json.loads(event.get('body', '{}'))
        user_id = body.get('userId')
        action = body.get('action')
        
        if not user_id or not action:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'userId и action обязательны'})
            }
        
        if action == 'block':
            cur.execute("UPDATE users SET status = 'blocked' WHERE id = %s", (user_id,))
            message = 'Пользователь заблокирован'
        elif action == 'unblock':
            cur.execute("UPDATE users SET status = 'active' WHERE id = %s", (user_id,))
            message = 'Пользователь разблокирован'
        elif action == 'mute':
            cur.execute("UPDATE users SET status = 'muted' WHERE id = %s", (user_id,))
            message = 'Пользователь в муте'
        elif action == 'unmute':
            cur.execute("UPDATE users SET status = 'active' WHERE id = %s", (user_id,))
            message = 'Мут снят'
        else:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неизвестное действие'})
            }
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': message})
        }
    
    else:
        cur.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
