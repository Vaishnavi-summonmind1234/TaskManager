from controllers.Task_controllers.Task import task,show_tasks,get_taskby_id,update_Task,delete_Task,update_status,priority_update
from db.Task_Schemas import TaskCreate,TaskResponse,Taskupdate,StatusUpdate,PrioritySchema,Task_update
from db.Assign import Assign_schema
from middleware.admin import admin_acess
from controllers.auth.register import get_current_user
from fastapi import APIRouter, Depends,HTTPException,Query
from controllers.Task_controllers.Assign import assign_task,task_assignees,delete_task_assigned
from controllers.Task_controllers.Task_update import task_update_logs
from controllers.Task_controllers.Task_filters import get_tasks_filtered
from controllers.Task_controllers.Task import UserTask  

task_route=APIRouter()

@task_route.post('/add-tasks',response_model=TaskResponse)
def create_Task( data:TaskCreate
    ,dict=Depends(admin_acess)):
    print("Task Create Data:", data)
    return task(data)

@task_route.get('/show-tasks', response_model=list[TaskResponse])
def display_tasks(current_user: dict = Depends(get_current_user)):
    return show_tasks()

@task_route.get("/taskby/{task_id}")
def get_userbyid(
    task_id:int,
    current_user: dict = Depends(get_current_user)
):
    return get_taskby_id(task_id)

@task_route.put('/update/{task_id}')
def update(task_id:int,data: Taskupdate, current_user: dict = Depends(get_current_user)):
    if current_user["role_id"] != 1:
        raise HTTPException(
            status_code=403,
            detail="Not allowed to update this task"
        )
    result = update_Task(task_id, data)

    return {
        "message": "User updated profile successfully",
        "data": result
    }
@task_route.delete('/delete_task/{task_id}')
def deleted(task_id:int, current_user: dict = Depends(get_current_user)):
    if current_user["role_id"]!=1 :
        raise HTTPException(status_code=403, detail="Not allowed to delete task")
    result = delete_Task(task_id)

    return {
        "message":"user deleted successfully",

    }


@task_route.patch("/{task_id}/status")
def update_status_route(
    task_id: int,
    data: StatusUpdate,
    current_user: dict = Depends(get_current_user)
):

    if int(current_user["role_id"]) != 1:
        raise HTTPException(status_code=403, detail="Not allowed")

    # if data.status not in ["todo", "in_progress", "done"]:
    #     raise HTTPException(status_code=400, detail="Invalid status")

    result = update_status(task_id, data.status)
    print("ROUTE TASK ID:", task_id)
    if not result:
        raise HTTPException(status_code=404, detail="Task not found")

    return {
        "message": "Task status updated successfully",
        "data": result
    }
@task_route.patch("/{id}/priority")
def priority_update_route(
    id: int,
    data: PrioritySchema
):

    if data.priority not in ["low", "medium", "high"]:
        raise HTTPException(status_code=400, detail="Invalid priority")

    result = priority_update(id, data.priority)

    if not result:
        raise HTTPException(status_code=404, detail="Task not found")

    return {
        "message": "Task priority updated successfully",
        "data": result
    }

#  api to assign task are below   
@task_route.post("/{id}/assign")
def assign_task_route(
    id: int,
    data: Assign_schema,
    current_user: dict = Depends(get_current_user)
):

    if int(current_user["role_id"]) != 1:
        raise HTTPException(status_code=403, detail="Not allowed")

    result = assign_task(id, data)

    return {
        "message": "User assigned successfully",
        "data": result
    }

@task_route.get('/{id}/assignees')
def get_assigness(id: int, current_user: dict = Depends(admin_acess)):
    return task_assignees(id)


@task_route.delete('/{task_id}/assigned/{user_id}')
def delete_assign(task_id,user_id:int,current_user:dict=Depends(admin_acess)):
    return delete_task_assigned(task_id,user_id)

@task_route.patch("/{task_id}/update_logs")
def update_task(
    task_id: int,
    payload: Task_update,
    current_user: dict = Depends(admin_acess)
):
    return task_update_logs(task_id,  current_user,payload)





@task_route.get("/tasks/filter")
def filter_tasks(
    status: str = Query(None),
    priority: str = Query(None),
    title: str = Query(None),
    assignee_id: int = Query(None)
):
    return get_tasks_filtered(
        status=status,
        priority=priority,
        title=title,
        assignee_id=assignee_id
    )

@task_route.get('/{task_id}/task')
def get_assigned_task(
    task_id: int,
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["id"]
 
    task = UserTask(user_id, task_id)
 
    if not task:
        raise HTTPException(status_code=403, detail="Not authorized")
 
    return task    