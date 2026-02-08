from sqlmodel import create_engine, Session, SQLModel
from models import User, Task
import os

# Get the database URL from environment variables
DATABASE_URL = os.getenv("Neon_db_url")
if not DATABASE_URL:
    raise ValueError("Neon_db_url environment variable not set.")

# Create the engine
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    """
    Creates database tables if they don't already exist.
    """
    SQLModel.metadata.create_all(engine, checkfirst=True)

def get_session():
    """
    Dependency to get a database session.
    Yields a session that is automatically closed after the request.
    """
    with Session(engine) as session:
        yield session
