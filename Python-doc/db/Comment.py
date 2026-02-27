from pydantic import BaseModel
from datetime import datetime,date
from typing import Optional

class coment_Schema(BaseModel):
    
    
    comment:str
    parent_id:Optional[int]=None

class response_Schema(BaseModel):
    
    
     message: str
     comment_id: int    
class updatecomment(BaseModel):
     comment:str     
