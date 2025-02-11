from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()


class Message(BaseModel):
    message: str


@app.get("/")
async def read_root():
    return {"Hello": "Welcome to FastAPI"}


@app.get("/hello", response_model=Message)
async def hello_world():
    return Message(message="hello, World! This is Python within Next.js!")
