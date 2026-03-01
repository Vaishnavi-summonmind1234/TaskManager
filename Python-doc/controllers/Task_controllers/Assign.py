from fastapi import HTTPException
from db.connction import get_connection
from db.Assign import Assign_schema

def assign_task(id: int, data: Assign_schema):
    con = get_connection()
    if not con:
        raise HTTPException(status_code=500, detail="No database connection")

    try:
        cur = con.cursor()

        for user_id in data.user_ids:
            cur.execute("""
                INSERT INTO task_assignments (task_id, user_id)
                VALUES (%s, %s)
                ON CONFLICT (task_id, user_id) DO NOTHING
            """, (id, user_id))

        con.commit()
        cur.close()
        con.close()

        return {"task_id": id, "assigned_users": data.user_ids}

    except Exception as e:
        con.rollback()
        con.close()
        raise HTTPException(status_code=500, detail=str(e))

def task_assignees(task_id:int):
    con = get_connection()
    try:
        cur = con.cursor()

        cur.execute(
            "SELECT id,task_id,user_id,assigned_at FROM task_assignments WHERE task_id=%s",
            (task_id,)
        )

        rows = cur.fetchall()

        result = []

        for row in rows:
            result.append({
                "id": row[0],
                "task_id": row[1],
                "user_id": row[2],
                "assigned_at": row[3]
            })

        return result   # ✅ correct place

    except Exception as e:
        return str(e) 
    
def delete_task_assigned(task_id:int,user_id:int):
    con=get_connection()
    try:
        cur=con.cursor()
        cur.execute("""DELETE FROM task_assignments WHERE task_id=%s AND user_id=%s""",(task_id,user_id))
        

        
        con.commit()
        return {"message":"deleted successflly"}
    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    