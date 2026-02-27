from fastapi import APIRouter, Depends,HTTPException
from db.auth_schema import RoleCreate,RoleResponse
from controllers.User_details.user_controller import get_all_users,get_roles,create_role
from middleware.admin import admin_acess,get_current_user


role_route = APIRouter()

@role_route.get("/role-list", response_model=list[RoleResponse])
def fetch_roles(current_user: dict = Depends(admin_acess)):
    return get_roles()


@role_route.post("/create-roles", response_model=RoleResponse)
def add_role(
    data: RoleCreate,
    current_user: dict = Depends(admin_acess)
):
    return create_role(data)
