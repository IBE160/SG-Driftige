from fastapi import FastAPI
from app.api.v1.upload import router as upload_router
from app.api.v1.summarize import summarize_router

app = FastAPI()

app.include_router(upload_router, prefix="/api/v1")
app.include_router(summarize_router, prefix="/api/v1")

@app.get("/")
async def read_root():
    return {"message": "FastAPI backend is running!"}