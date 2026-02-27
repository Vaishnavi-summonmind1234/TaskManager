import os
import psycopg2
from dotenv import load_dotenv

def get_connection():
    load_dotenv()

    try:
        connection = psycopg2.connect(
             dbname=os.getenv("POSTGRES_DB"),
             user=os.getenv("POSTGRES_USER"),
             password=os.getenv("POSTGRES_PASSWARD"),
             host=os.getenv("POSTGRES_HOST"),
             port=os.getenv('POSTGRES_PORT')
        )

        curr=connection.cursor()
        # curr.execute("SELECT current_database(), current_user;")
        # result = curr.fetchone()

        return connection
  
        # print(result[0])
    except Exception as e:
        print(e)    
if __name__ == "__main__":
    conn = get_connection()
    if conn:
        print("✅ Connected successfully")
        conn.close()
