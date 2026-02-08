# Quickstart: Todo App Backend

This guide provides instructions on how to set up and run the Todo App backend.

## Prerequisites

-   Python 3.11+
-   An existing `.env` file in the `/backend` directory with the following variables:
    -   `Neon_db_url`
    -   `BETTER_AUTH_SECRET`
    -   `BETTER_AUTH_URL`

## Setup

1.  **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2.  **Create a virtual environment**:
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment**:
    -   **Windows**: `venv\Scripts\activate`
    -   **macOS/Linux**: `source venv/bin/activate`

4.  **Install dependencies**:
    ```bash
    pip install fastapi "uvicorn[standard]" sqlmodel python-jose passlib
    ```

## Running the Application

1.  **Start the server**:
    From within the `/backend` directory:
    ```bash
    uvicorn main:app --reload
    python -m uvicorn main:app
    ```

2.  **Access the API**:
    The API will be available at `http://127.0.0.1:8000`.

3.  **API Documentation**:
    Interactive API documentation (Swagger UI) will be available at `http://127.0.0.1:8000/docs`.

## Integration

The backend is designed to work with the existing frontend running at `http://localhost:3000`. Ensure the frontend is running and that CORS is correctly configured in `main.py` to allow requests from the frontend's origin.
