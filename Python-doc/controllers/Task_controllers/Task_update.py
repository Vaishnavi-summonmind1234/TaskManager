from fastapi import HTTPException
from db.connction import get_connection


def task_update_logs(task_id: int, current_user, payload):
    con = get_connection()

    try:
        cur = con.cursor()

       
        cur.execute(
            "SELECT title, description, status, priority FROM tasks WHERE id = %s",
            (task_id,)
        )
        old_task = cur.fetchone()

        if not old_task:
            raise HTTPException(status_code=404, detail="Task not found")

        old_title, old_desc, old_status, old_priority = old_task

        updates = []
        values = []
        activity_messages = []

      
        if payload.status is not None:
            if str(payload.status).strip().lower() != str(old_status).strip().lower():
                updates.append("status = %s")
                values.append(payload.status)
                activity_messages.append(
                    f"Status updated from {old_status} to {payload.status}"
                )

      
        if payload.priority is not None:
            if str(payload.priority).strip().lower() != str(old_priority).strip().lower():
                updates.append("priority = %s")
                values.append(payload.priority)
                activity_messages.append(
                    f"Priority updated from {old_priority} to {payload.priority}"
                )

        if payload.title is not None:
            if payload.title != old_title:
                updates.append("title = %s")
                values.append(payload.title)
                activity_messages.append("Task title updated")

        if payload.description is not None:
            if payload.description != old_desc:
                updates.append("description = %s")
                values.append(payload.description)
                activity_messages.append("Task description updated")

       
        if not updates:
            return {"message": "No changes detected"}

   
        updates.append("updated_at = NOW()")

        query = f"UPDATE tasks SET {', '.join(updates)} WHERE id = %s"
        values.append(task_id)

       
        cur.execute(query, tuple(values))


        for msg in activity_messages:
            cur.execute("""
                INSERT INTO activities (task_id, user_id, action, details)
                VALUES (%s, %s, %s, %s)
            """, (
                task_id,
                current_user["id"],
                "Task Updated",
                msg
            ))

        con.commit()

        return {
            "message": "Task updated successfully",
            "changes": activity_messages
        }

    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        con.close()