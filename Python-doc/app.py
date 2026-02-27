
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes.auth import auth_router
from routes.user_detail import user_route
from routes.roles import role_route
from routes.task import task_route
from routes.comment import comment_route
from routes.Attachment import attach_route
app = FastAPI()
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router, prefix="/auth", tags=["Auth"])

app.include_router(user_route,prefix="/user",tags=["detail"])

app.include_router(role_route,prefix="/role",tags=['role'])
app.include_router(task_route, prefix="/task", tags=["Tasks"])
app.include_router(comment_route,prefix="/comment",tags=["comment"])
app.include_router(attach_route,prefix="/attachment",tags=["attachment"])
# print(app.routes)