from fastapi import APIRouter, HTTPException,Depends

from controllers.auth.register import register,login,get_current_user
from db.auth_schema import RegisterRequest,LoginRequest

auth_router = APIRouter()



@auth_router.post("/register")
def signup(data: RegisterRequest):
    
    return register(data.name,data.email,data.password,data.role_id)

@auth_router.post("/login")
def signin(data: LoginRequest):
    return login(data.email, data.password)

@auth_router.get("/me")
def current_user_data(current_user:dict=Depends(get_current_user)):
    return current_user





