from pydantic import BaseModel
from datetime import datetime,date
from typing import Optional

class Assign_schema(BaseModel):
    
   
    user_id: int
    