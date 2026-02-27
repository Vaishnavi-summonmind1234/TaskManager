from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role_id: int

class LoginRequest(BaseModel):
   
    email: EmailStr
    password: str
class UserSchema(BaseModel):
    id:int
    name: str
    email: EmailStr
    role_id: int
    created_at: datetime

class updatedProfile(BaseModel):
    name:str
    email:EmailStr


class RoleCreate(BaseModel):
    title: str

class RoleResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None