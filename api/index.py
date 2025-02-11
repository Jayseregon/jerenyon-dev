from fastapi import FastAPI
from pydantic import BaseModel

from .services.keywordEmbedding import EmbeddingService

app = FastAPI()


class Keywords(BaseModel):
    keywords: list[str]


class Message(BaseModel):
    message: str


@app.get("/")
async def read_root():
    return {"Hello": "Welcome to FastAPI"}


@app.get("/hello", response_model=Message)
async def hello_world():
    return Message(message="hello, World! This is Python within Next.js!")


@app.post("/embeddings")
async def create_embeddings(keywords: Keywords):
    embedding_service = EmbeddingService()
    return embedding_service.process_keywords(keywords.keywords)
