from fastapi import APIRouter,Depends,UploadFile,File
import os
import uuid
from controllers.Attachment.Attach  import add_Attach,get_attachment,delete_attachment
# from db.Attach import Attachment_Schema
from middleware.admin import admin_acess
from controllers.auth.register import get_current_user

attach_route=APIRouter()


@attach_route.post('/tasks/{task_id}/attachment')
async def add_attachments(task_id: int,file:UploadFile=File(...), current_user: dict = Depends(get_current_user)):
    Base_Dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    upload_dir=os.path.join(Base_Dir,'Static','upload-files')
    os.makedirs(upload_dir,exist_ok=True)
    unique_name=f'{uuid.uuid4()}_{file.filename}'  #it is useed to add unique name to file that have uuid+filename ex:vgdvhjdbjjd_ab.pdf
    file_path=os.path.join(upload_dir,unique_name)

    with open(file_path,'wb') as f:
       contents = await file.read()   # ✅ FIX
       f.write(contents)
    
    
    return add_Attach(task_id, unique_name, file_path, current_user)


    
    
@attach_route.get('/tasks/{task_id}/get_all_attach')
def get_all_task(
    task_id: int,
    current_user: dict = Depends(get_current_user)
):
    return get_attachment(task_id, current_user)
@attach_route.delete('/tasks/{task_id}/delete-attach')
def delete_attach(
    task_id:int,
    current_user:dict=Depends(admin_acess)):
    return delete_attachment(task_id,current_user)


