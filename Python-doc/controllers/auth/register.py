import bcrypt
import jwt
import os
from dotenv import load_dotenv
from db.connction import get_connection
from psycopg2.extras import RealDictCursor
from fastapi import Depends, FastAPI, HTTPException, status

from fastapi.security import OAuth2PasswordBearer
from Config.jwt_handler import create_token ,decode_token


load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_EXP_MINUTES"))  # default 1 day


def register(name,email,password,role_id):
    con = get_connection()
    if not con:
        print("no database connected")
    cur=con.cursor()

    try:
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        hashed_password_str = hashed_password.decode()
        cur.execute("""
                    INSERT INTO users(name,email,password,role_id) 
                    VALUES (%s, %s, %s, %s) 
                    RETURNING id;
                    """,(name, email, hashed_password_str, role_id))
        user_id = cur.fetchone()[0] 
        con.commit()
        return f"✅ User created successfully! User ID: {user_id}"
    except Exception as e:
        con.rollback()
        print(e)
    finally:
      if cur:
        cur.close()
      if con:
        con.close()
   


def login(email: str, password: str):
    con = get_connection()
    if not con:
        return {"error": "Database not connected"}

    try:
        cur = con.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM users WHERE email=%s", (email,))
        login_user = cur.fetchone()

        if not login_user:
            return {"error": "Invalid email or password"}

        hashed_bytes = login_user["password"].encode()
        if not bcrypt.checkpw(password.encode(), hashed_bytes):
            return {"error": "Invalid email or password"}

        access_token = create_token({
            "sub": str(login_user["id"]),
            "email": login_user["email"],
            "role_id": login_user["role_id"]
        })

        return {"access_token": access_token, "token_type": "bearer"}

    except Exception as e:
        return {"error": "Login failed"}
    finally:
        if cur:
            cur.close()
        if con:
            con.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")
def get_current_user(token:str=Depends(oauth2_scheme)):
    try:
       playload=decode_token(token)
       user_id=playload.get('sub')

       if not user_id:
           return 'invalid token'
       con = get_connection()
       if not con:
        print("no database connected")
       cur=con.cursor()
       cur.execute(""" SELECT id,email,name,role_id FROM users WHERE id=%s""",(user_id,))
       profile_user=cur.fetchone()

       if not profile_user:
           raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
       current_user = {
            "id": profile_user[0],
            "email": profile_user[1],
            "name": profile_user[2],
            "role_id": profile_user[3]
        }

       return current_user
    except jwt.ExpiredSignatureError:
        HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="JWT token expired"
        )
    except jwt.InvalidTokenError:
       raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token passed"
        )
    


   


   

