from fastapi import FastAPI
from .api.upload import text, pdf

app = FastAPI()

app.include_router(text.router, prefix="/api")
app.include_router(pdf.router, prefix="/api")

@app.get("/")
async def read_root():
    return {"message": "Hello FastAPI!"}
