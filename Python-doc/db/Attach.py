from pydantic import BaseModel
from datetime import datetime,date
from typing import Optional

class Attachment_Schema(BaseModel):
    file_name:str
    file_url:str
