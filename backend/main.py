# import os
import uvicorn
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    MetaData,
    Table,
)
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base
from databases import Database
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")
DATABASE_URL = "postgres://koyeb-adm:wQpqLvkP5n7X@ep-noisy-dream-a24ovsvy.eu-central-1.pg.koyeb.app/koyebdb"

connection_string = URL.create(
    "postgresql",
    username="koyeb-adm",
    password="wQpqLvkP5n7X",
    host="ep-noisy-dream-a24ovsvy.eu-central-1.pg.koyeb.app",
    database="koyebdb",
)

engine = create_engine(connection_string)


engine = create_engine(connection_string)

metadata = MetaData()

posts = Table(
    "posts",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String, index=True),
    Column("body", String),
)

Base = declarative_base()


class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    body = Column(String)


Base.metadata.create_all(bind=engine)

app = FastAPI()

database = Database(DATABASE_URL)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    await database.connect()


@app.on_event("shutdown")
async def shutdown_db_client():
    await database.disconnect()


class PostCreate(BaseModel):
    title: str
    body: str


app.mount("/static", StaticFiles(directory="build/static"), name="static")


@app.get("/")
async def root():
    return FileResponse("build/index.html")


@app.post("/posts")
async def create_post(post: PostCreate):
    query = posts.insert().values(title=post.title, body=post.body)
    post_id = await database.execute(query)
    return {"id": post_id, "title": post.title, "body": post.body}


@app.get("/posts")
async def get_posts():
    query = posts.select()
    return await database.fetch_all(query)


@app.get("/posts/{id}")
async def get_post(id: int):
    query = posts.select().where(posts.c.id == id)
    post = await database.fetch_one(query)

    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@app.put("/posts/{id}")
async def update_post(id: int, post: PostCreate):
    query = (
        posts.update().where(posts.c.id == id).values(title=post.title, body=post.body)
    )
    updated_rows = await database.execute(query)
    if updated_rows == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post updated successfully"}


@app.delete("/posts/{id}")
async def delete_pose(id: int):
    query = posts.delete().where(posts.c.id == id)
    deleted_rows = await database.execute(query)
    if deleted_rows == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
