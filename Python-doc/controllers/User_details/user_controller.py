
from db.connction import get_connection
from db.auth_schema import UserSchema
from fastapi import Depends,HTTPException
from middleware.admin import admin_acess
from controllers.auth.register import get_current_user

def get_all_users(current_user: dict = Depends(admin_acess)):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, name, email, role_id, created_at FROM users;")
    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    users = [
        UserSchema(
            id=row[0],
            name=row[1],
            email=row[2],
            role_id=row[3],
            created_at=row[4],
        )
        for row in rows
    ]

    return users


def get_userby_id(user_id:int):
    con=get_connection()
    if not con:
        return "no database connected"
    try:
        cur=con.cursor()
        cur.execute("""select * from users where id=%s""",(user_id,))
        required_user=cur.fetchone()
        if not required_user:
            return "no such user found"
        return required_user
    except Exception as e:
        print(e)


def update_Profile(id:int,data):
    con=get_connection()
    if not con:
        return 'no database connection'
    try:
        cur=con.cursor()
        cur.execute("""SELECT * FROM users WHERE id=%s""",(id,))
        existing_user=cur.fetchone()

        if not existing_user:
            cur.close()
            con.close()
            raise HTTPException(status_code=404, detail="User not found")
        cur.execute("""
           UPDATE users
           SET email = %s,
           name = %s
           
           WHERE id = %s
           RETURNING id, name, email, role_id
           """, (data.email, data.name, id))

        updated_user = cur.fetchone()

        con.commit()
        cur.close()
        con.close() 
        return updated_user    
    except Exception as e:
        print(e)

def delete_user(id:int):
     con=get_connection()
     if not con:
         return "no database connected"
     try:
        cur=con.cursor()
        cur.execute("""SELECT * FROM users WHERE id=%s""",(id,))
        existing_user=cur.fetchone()

        if not existing_user:
            cur.close()
            con.close()
            raise HTTPException(status_code=404, detail="User not found")
        cur.execute(
            """
               UPDATE users SET deleted_at =NOW()
            WHERE id=%s AND deleted_at IS NULL
           RETURNING id, name, email, role_id
        """, (id,))

        deleted_user=cur.fetchone()
        if not deleted_user:
            cur.close()
            con.close()
            raise HTTPException(status_code=404, detail="User not found")
        con.commit()
        return deleted_user
       
     except Exception as e:
        con.rollback()
        print("Soft delete error:", e)
        raise HTTPException(status_code=500, detail="Database error")

def create_role(data):
    con = get_connection()
    cur = con.cursor()

    try:
        cur.execute("""
            INSERT INTO roles (title)
            VALUES (%s)
            RETURNING id, title, created_at, updated_at, deleted_at;
        """, (data.title,))

        role = cur.fetchone()

        con.commit()
        cur.close()
        con.close()

        return {
        "id": role[0],
        "title": role[1],
        "created_at": role[2],
        "updated_at": role[3],
        "deleted_at": role[4]
    }

    except Exception as e:
        con.rollback()
        raise HTTPException(status_code=400, detail="Role already exists")
def get_roles():
    con = get_connection()
    cur = con.cursor()

    cur.execute("""
        SELECT id, title, created_at, updated_at, deleted_at
        FROM roles
        WHERE deleted_at IS NULL
        ORDER BY id;
    """)

    roles = cur.fetchall()

    cur.close()
    con.close()

   
   
    return [
        {
            "id": r[0],
            "title": r[1],
            "created_at": r[2],
            "updated_at": r[3],
            "deleted_at": r[4]
        }
        for r in roles
    ]
