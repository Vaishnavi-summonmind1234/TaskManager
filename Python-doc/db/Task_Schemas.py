from pydantic import BaseModel
from datetime import datetime,date
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str
    priority: str
    assigned_by: int
    start_date: date
    end_date: date
    estimate_time: int
    approach: str
class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    priority: str
    assigned_by: int
    start_date: date
    end_date: date
    estimate_time: int
    approach: str
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]
    
class Taskupdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assigned_by: Optional[int] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    estimate_time: Optional[int] = None
    approach: Optional[str] = None

class StatusUpdate(BaseModel):
    status: str

class PrioritySchema(BaseModel):
    priority: str

class Task_update(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
