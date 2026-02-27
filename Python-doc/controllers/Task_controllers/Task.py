from fastapi import HTTPException
from db.connction import get_connection
from db.Task_Schemas import TaskCreate,TaskResponse,StatusUpdate
def task(data):
    con = get_connection()
    if not con:
        raise HTTPException(status_code=500, detail="No database connection")

    try:
        cur = con.cursor()

        cur.execute("""
            INSERT INTO tasks
            (title, description, status, priority,
             assigned_by, start_date, end_date,
             estimate_time, approach)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id, title, description, status,
                      priority, assigned_by, start_date,
                      end_date, estimate_time, approach,
                      created_at, updated_at, deleted_at;
        """, (
            data.title,
            data.description,
            data.status,
            data.priority,
            data.assigned_by,
            data.start_date,
            data.end_date,
            data.estimate_time,
            data.approach
        ))

        task = cur.fetchone()
        con.commit()

        cur.close()
        con.close()

        return {
            "id": task[0],
            "title": task[1],
            "description": task[2],
            "status": task[3],
            "priority": task[4],
            "assigned_by": task[5],
            "start_date": task[6],
            "end_date": task[7],
            "estimate_time": task[8],
            "approach": task[9],
            "created_at": task[10],
            "updated_at": task[11],
            "deleted_at": task[12],
        }

    except Exception as e:
        con.rollback()
        con.close()
        print("Task Create Error:", e)
        raise HTTPException(status_code=500, detail=str(e))

def show_tasks():
    con = get_connection()
    cur = con.cursor()

    try:
        cur.execute("""
            SELECT id, title, description, status, priority,
                   assigned_by, start_date, end_date,
                   estimate_time, approach,
                   created_at, updated_at, deleted_at
            FROM tasks
            WHERE deleted_at IS NULL
        """)

        rows = cur.fetchall()
        for row in rows:
           print("ROW:", row)


        tasks = [
            TaskResponse(
                id=row[0],
                title=row[1],
                description=row[2],
                status=row[3].value if hasattr(row[3], "value") else str(row[3]),
                priority=row[4].value if hasattr(row[4], "value") else str(row[4]),
                assigned_by=row[5],
                start_date=row[6],
                end_date=row[7],
                estimate_time=row[8],
                approach=row[9],
                created_at=row[10],
                updated_at=row[11],
                deleted_at=row[12]
            )
            for row in rows
        ]

        return tasks

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cur.close()
        con.close()
def get_taskby_id(task_id:int):
    con=get_connection()
    if not con:
        return "no database connected"
    try:
        cur=con.cursor()
        cur.execute(
            """SELECT * FROM tasks WHERE id = %s""",
            (task_id,)   
        )
        required_task=cur.fetchone()
        if not required_task:
            return "no such task found"
        return required_task
    except Exception as e:
        print(e)
def update_Task(id:int,data):
    con=get_connection()
    if not con:
        return 'no database connection'
    try:
        cur=con.cursor()
        cur.execute("""SELECT * FROM tasks WHERE id=%s""",(id,))
        existing_user=cur.fetchone()

        if not existing_user:
            cur.close()
            con.close()
            raise HTTPException(status_code=404, detail="Task not found")
        cur.execute("""
    UPDATE tasks
    SET
        title = %s,
        description = %s,
        status = %s,
        priority = %s,
        assigned_by = %s,
        start_date = %s,
        end_date = %s,
        estimate_time = %s,
        approach = %s,
        updated_at = NOW()
    WHERE id = %s
    RETURNING
        id,
        title,
        description,
        status,
        priority,
        assigned_by,
        start_date,
        end_date,
        estimate_time,
        approach,
        created_at,
        updated_at,
        deleted_at
""", (
    data.title,
    data.description,
    data.status,
    data.priority,
    data.assigned_by,
    data.start_date,
    data.end_date,
    data.estimate_time,
    data.approach,
    id
))


        updated_task = cur.fetchone()

        con.commit()
        cur.close()
        con.close() 
        return updated_task    
    except Exception as e:
        print(e)
def delete_Task(id:int):
     con=get_connection()
     if not con:
         return "no database connected"
     try:
        cur=con.cursor()
        cur.execute("""SELECT * FROM tasks WHERE id=%s""",(id,))
        existing_user=cur.fetchone()

        if not existing_user:
            cur.close()
            con.close()
            raise HTTPException(status_code=404, detail="Task not found")
        cur.execute(
            """
               UPDATE tasks SET deleted_at =NOW()
            WHERE id=%s AND deleted_at IS NULL
          RETURNING
        id,
        title,
        description,
        status,
        priority,
        assigned_by,
        start_date,
        end_date,
        estimate_time,
        approach,
        created_at,
        updated_at,
        deleted_at
        """, (id,))

        deleted_task=cur.fetchone()
        if not deleted_task:
            cur.close()
            con.close()
            raise HTTPException(status_code=404, detail="User not found")
        con.commit()
        return deleted_task
       
     except Exception as e:
        con.rollback()
        print("Soft delete error:", e)
        raise HTTPException(status_code=500, detail="Database error")        

def update_status(task_id: int, status: str):
    con = get_connection()
    if not con:
        return None

    try:
        cur = con.cursor()

        cur.execute("""
            UPDATE tasks
            SET status = %s,
                updated_at = NOW()
            WHERE id = %s AND deleted_at IS NULL
            RETURNING *
        """, (status, task_id))

        updated_task = cur.fetchone()

        con.commit()
        cur.close()
        con.close()

        return updated_task

    except Exception as e:
        con.rollback()
        print("Status update error:", e)
        return None




def priority_update(id: int, priority: str):
    con = get_connection()
    if not con:
        return None

    try:
        cur = con.cursor()

        cur.execute("""
            UPDATE tasks
            SET priority = %s,
                updated_at = NOW()
            WHERE id = %s AND deleted_at IS NULL
            RETURNING *
        """, (priority, id))

        updated_task = cur.fetchone()

        con.commit()
        cur.close()
        con.close()

        return updated_task

    except Exception as e:
        con.rollback()
        print("Priority update error:", e)
        return None
