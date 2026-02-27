from fastapi import HTTPException
from db.connction import get_connection


def get_tasks_filtered(status=None, priority=None, title=None, assignee_id=None):
    con = get_connection()
    try:
        cur = con.cursor()

        query = """
            SELECT t.id,
                   t.title,
                   t.description,
                   t.status,
                   t.priority,
                   t.created_at
            FROM tasks t
            LEFT JOIN task_assignments ta ON t.id = ta.task_id
        """

        filters = []
        values = []



        if status:
            filters.append("t.status = %s")
            values.append(status)

        if priority:
            filters.append("t.priority = %s")
            values.append(priority)

        if title:
            filters.append("LOWER(t.title) LIKE LOWER(%s)")
            values.append(f"%{title}%")

        if assignee_id:
            filters.append("ta.user_id = %s")
            values.append(assignee_id)

       
        if filters:
            query += " WHERE " + " AND ".join(filters)

        query += " GROUP BY t.id"

        cur.execute(query, tuple(values))
        rows = cur.fetchall()

        columns = [desc[0] for desc in cur.description]
        result = [dict(zip(columns, row)) for row in rows]

        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        cur.close()
        con.close()