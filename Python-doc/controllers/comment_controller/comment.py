from fastapi import HTTPException
from db.connction import get_connection
from db.Comment import coment_Schema,updatecomment

def Add_comments(task_id: int, comment_by: int, data: coment_Schema):
    con = get_connection()
    try:
        cur = con.cursor()

      
        if data.parent_id is not None:
            cur.execute(
                "SELECT parent_id FROM comments WHERE id=%s",
                (data.parent_id,)
            )
            parent = cur.fetchone()

            if not parent:
                raise HTTPException(
                    status_code=404,
                    detail="Parent comment not found"
                )

            if parent[0] is not None:
                raise HTTPException(
                    status_code=400,
                    detail="Only 1-level replies allowed"
                )

        cur.execute("""
            INSERT INTO comments(comment, task_id, comment_by, parent_id, created_at)
            VALUES (%s, %s, %s, %s, NOW())
            RETURNING id
        """, (
            data.comment,
            task_id,
            comment_by,
            data.parent_id
        ))

        new_id = cur.fetchone()[0]
        con.commit()

        return {
            "message": "Comment added successfully",
            "comment_id": new_id
        }

    except HTTPException:
      con.rollback()
      raise

    except Exception as e:
      con.rollback()
      print("DATABASE ERROR:", e)
      raise HTTPException(status_code=500, detail=str(e))
    

def get_all_coments(task_id:int):
   con=get_connection()
   try:
      cur=con.cursor()
      cur.execute("""SELECT id, comment, comment_by FROM comments WHERE task_id=%s AND parent_id IS NULL ORDER BY  created_at """,(task_id,)) 
      parent = cur.fetchall()
      result=[]
      for parent in parent:
        parent_id = parent[0] 
        cur.execute("""
                SELECT id, comment, comment_by
                FROM comments
                WHERE parent_id=%s
                ORDER BY created_at
            """, (parent_id,))
        replies = cur.fetchall()
        result.append(
         {
                "id": parent[0],
                "comment": parent[1],
                "comment_by": parent[2],
                "replies": [
                    {
                        "id": r[0],
                        "comment": r[1],
                        "comment_by": r[2]
                    }
                    for r in replies
                ]
            }
      )
      return result
   except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))
def update_comment(id:int,data:updatecomment,user:dict):
   con=get_connection()
   try:
      cur=con.cursor()
      cur.execute("""UPDATE comments SET comment =%s,updated_at=NOW() WHERE id=%s AND 
                  comment_by = %s AND deleted_at IS NULL""",(data.comment,id,user['id']))
      if cur.rowcount==0:
         raise HTTPException(status_code=404,detail="no coment exist")
      con.commit()
      return {
         "message":"updated suceessfully"
      }   
   except Exception as e:
      raise HTTPException(status_code=500,detail=print(e))
def delete_comment(id:int,user:dict):
   con=get_connection()
   try:
      cur=con.cursor()
      cur.execute("""UPDATE comments
                SET deleted_at = NOW()
                WHERE id = %s
                  AND deleted_at IS NULL
            """, (id,))
      if cur.rowcount==0:
         raise HTTPException(status_code=404,detail="no comment found")
      con.commit()
      return {"message":"deleted successfully"}
   except Exception as e:
      con.rollback()
      raise HTTPException(status_code=500,detail="deatails not found")
       