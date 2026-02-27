import jwt
from datetime import datetime, timedelta

import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET=os.getenv('JWT_SECERT_KEY')
JWT_ALGORITHM=os.getenv('JWT_ALGORITHM')
JWT_TIME=os.getenv('JWT_EXP_MINUTES')

def create_token(data: dict):
    to_encode=data.copy()
    expire = datetime.utcnow() + timedelta(minutes=int(JWT_TIME))
    to_encode.update({'exp':expire})
    encode_jwt_token= jwt.encode(to_encode,JWT_SECRET,algorithm=JWT_ALGORITHM)  #playload=to_encode

    return encode_jwt_token

def decode_token(token:str):
    decode_jwt_token=jwt.decode(token,JWT_SECRET,algorithms=JWT_ALGORITHM)
    return decode_jwt_token


