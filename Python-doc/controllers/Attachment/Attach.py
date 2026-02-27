
from db.connction import get_connection
import os
from fastapi import HTTPException,UploadFile

from datetime import datetime




def add_Attach(task_id: int, file_name, file_url, current_user):
    con = get_connection()
    try:
        cur = con.cursor()
        cur.execute("""
            INSERT INTO attachments 
            (task_id, uploaded_by, file_name, file_url, created_at)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id;
        """, (
            task_id,
            current_user['id'],
            file_name,
            file_url,
            datetime.utcnow()
        ))

        attachment = cur.fetchone()[0]
        con.commit()

        return {
            "message": "attachment is added",
            "attachment_id": attachment
        }

    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
def get_attachment(task_id:int,current_user):
    con=get_connection()
    try:
        cur=con.cursor()
        # cur.execute("SELECT current_database();")
        # print("Connected DB:", cur.fetchone())
        # cur.execute("SELECT COUNT(*) FROM attachments;")
        # print("Total attachments:", cur.fetchone())


        cur.execute("""SELECT task_id,uploaded_by,file_name,file_url,created_at FROM attachments WHERE task_id=%s"""
                    ,(task_id,))
        all_attachments=cur.fetchall()
        if not all_attachments:
            raise HTTPException(status_code=404,detail="not found")
        result=[]
        for row in all_attachments:
            result.append({
               
                "task_id": row[0],
                "uploaded_by": row[1],
                "file_name": row[2],
                "file_url": row[3],
                "created_at": row[4]
            })
        return result
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    
def delete_attachment(task_id:int,current_user:dict):
    con=get_connection()
    try:
        cur=con.cursor()
        cur.execute("""UPDATE attachments SET deleted_at =NOW() WHERE deleted_at IS  NULL AND task_id=%s""",(task_id,))
        
        if cur.rowcount == 0:
            raise HTTPException(status_code=404,detail="not found")
        con.commit()
        return{
            "message":"dleted successfully",
            "affected_rows": cur.rowcount
        }
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    

# def add_files_to_static(task_id:int,):