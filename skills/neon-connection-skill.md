# Skill: Neon Database Connection

## Description
This skill provides a self-contained Python module for establishing a connection to the Neon serverless PostgreSQL database. It handles reading the connection string from environment variables, creating the SQLModel engine, and defining a FastAPI dependency (`get_session`) to provide a database session to API routes.

This is a foundational skill for the `db-agent` to use. It centralizes all database connection logic into a single, reusable module, ensuring that the rest of the application does not need to be concerned with the details of how the database is connected.

## Example Prompt
"As the `db-agent`, use the `neon-connection-skill` to create the `database.py` module. It must be configured to connect to the Neon PostgreSQL database using a `DATABASE_URL` from an environment variable."

## Template
```python
# In a file like `backend/database.py`

import os
from sqlmodel import create_engine, Session, SQLModel
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# The database URL for Neon should be stored in an environment variable.
# Format: postgresql://user:password@host:port/dbname
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable not set.")

# The `connect_args` are recommended for serverless environments like Neon.
engine = create_engine(DATABASE_URL, echo=True, connect_args={"sslmode": "require"})


def create_db_and_tables():
    """
    One-time function to create all tables defined by SQLModel metadata.
    """
    SQLModel.metadata.create_all(engine)


def get_session():
    """

    FastAPI dependency to get a database session.
    Ensures the session is always closed after the request.
    """
    with Session(engine) as session:
        yield session

```

### .env File
The application's root directory must contain a `.env` file with the following variable:
```
# .env

DATABASE_URL="postgresql://<user>:<password>@<neon_host>.neon.tech/neondb?sslmode=require"
```
This file should be added to `.gitignore` and managed securely.
