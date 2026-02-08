from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from db import create_db_and_tables
from routes import tasks, auth

app = FastAPI()

# Configure CORS - Ensure this is applied immediately after app initialization
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Todo API running successfully 🚀"}

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

app.include_router(tasks.router, prefix="/api/tasks") # Uncomment once tasks router is implemented
app.include_router(auth.router, prefix="/api/auth")