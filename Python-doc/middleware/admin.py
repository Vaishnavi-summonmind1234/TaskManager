from fastapi import Depends, HTTPException, status

from controllers.auth.register import get_current_user

def admin_acess(current_user:dict=Depends(get_current_user)):
    if current_user.get('role_id')!=1:
        
         raise HTTPException (
               status_code=status.HTTP_403_FORBIDDEN,
            detail="Admins only"
         )
    return current_user



  