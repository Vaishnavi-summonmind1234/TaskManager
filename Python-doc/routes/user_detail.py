from fastapi import APIRouter, Depends,HTTPException
from db.auth_schema import UserSchema,RegisterRequest,updatedProfile
from controllers.User_details.user_controller import get_all_users,get_userby_id,update_Profile,delete_user
from middleware.admin import admin_acess,get_current_user
from controllers.auth.register import register

user_route = APIRouter()

@user_route.get("/user-details", response_model=list[UserSchema])
def get_user_details(current_user: dict = Depends(admin_acess)):
    return get_all_users()
@user_route.get("/userby/{user_id}")
def get_userbyid(
    user_id:int,
    current_user: dict = Depends(admin_acess)
):
    return get_userby_id(user_id)
@user_route.post('/add_user')
    
def add_user_by_admin(data: RegisterRequest ,current_user:dict=Depends(admin_acess)):
    result = register(
        name=data.name,
        email=data.email,
        password=data.password,
        role_id=data.role_id
    )


    return {"message": result}

@user_route.put('/update/{user_id}')
def update(user_id:int,data:updatedProfile , current_user: dict = Depends(get_current_user)):
    if current_user["role_id"] != "1" and user_id != current_user["id"]:
        raise HTTPException(status_code=403, detail="Not allowed to update this user ")
    result = update_Profile(user_id, data)

    return {
        "message": "User updated profile successfully",
        "data": result
    }


@user_route.delete('/delete_user/{user_id}')
def deleted(user_id:int, current_user: dict = Depends(get_current_user)):
    if current_user["role_id"]!="1" and user_id!=current_user["id"]:
        raise HTTPException(status_code=403, detail="Not allowed to delete user")
    result = delete_user(user_id)

    return {
        "message":"user deleted successfully",

    }


