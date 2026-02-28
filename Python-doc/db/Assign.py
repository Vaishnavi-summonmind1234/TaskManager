from pydantic import BaseModel
from datetime import datetime,date
from typing import Optional,List

class Assign_schema(BaseModel):
     user_ids: List[int]
    