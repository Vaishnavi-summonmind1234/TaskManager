from fastapi import APIRouter, HTTPException,Depends
from controllers.comment_controller.comment import Add_comments,get_all_coments,update_comment,delete_comment
from db.Comment import coment_Schema,response_Schema,updatecomment
from middleware.admin import get_current_user
comment_route=APIRouter()

@comment_route.post('/tasks/{id}/comment',response_model=response_Schema)
def add_comment(id:int,data:coment_Schema,current_user:dict=Depends(get_current_user)):
    return Add_comments(id,current_user['id'],data)
@comment_route.get('/task/{id}/getallcoment')
def get_comment(id:int):
    return get_all_coments(id)

@comment_route.put("/updatecomments/{id}")
def updated_comment(id:int,data:updatecomment,current_user:dict=Depends(get_current_user)):
    if current_user['role_id'] !=1:
        return "it is not admin not allowed"
    return update_comment(id,data,current_user)
@comment_route.delete('/delete-comment/{id}')
def deletecomment(id:int, current_user:dict=Depends(get_current_user)):
    if current_user['role_id']!=1:
        return "your are not admin"
    return delete_comment(id,current_user)
