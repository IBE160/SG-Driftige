from fastapi import FastAPI
from app.api.v1.upload import router as upload_router
from app.api.v1.summarize import summarize_router
from app.api.quiz_router import router as quiz_router

app = FastAPI()

app.include_router(upload_router, prefix="/api/v1")
app.include_router(summarize_router, prefix="/api/v1")
app.include_router(quiz_router, prefix="/api")

@app.get("/")
async def read_root():
    return {"message": "FastAPI backend is running!"}