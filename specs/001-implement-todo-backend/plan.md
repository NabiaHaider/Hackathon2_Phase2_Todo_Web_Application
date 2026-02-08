# Implementation Plan: Todo App Backend

**Branch**: `001-implement-todo-backend` | **Date**: 2026-02-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-implement-todo-backend/spec.md`

## Summary

This plan outlines the step-by-step implementation of the backend for a multi-user Todo application. The backend will be built using Python, FastAPI, and SQLModel, with a Neon Serverless PostgreSQL database. It will expose a REST API for the existing Next.js frontend to consume. The core requirements are to provide full CRUD functionality for tasks, enforce strict user ownership and data isolation via JWT-based authentication, and seamlessly integrate with the completed frontend without requiring any modifications to the frontend code.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: FastAPI, SQLModel, Pydantic, python-jose, passlib
**Storage**: Neon Serverless PostgreSQL
**Testing**: Pytest
**Target Platform**: Linux server (or any environment capable of running FastAPI)
**Project Type**: Web application backend
**Performance Goals**: Respond to all API requests within 500ms p95.
**Constraints**: Must integrate with the existing frontend at `http://localhost:3000`. No changes to the frontend are permitted. All backend code must reside in the `/backend` directory.
**Scale/Scope**: The backend will support all functionality for the Todo app, scoped to the endpoints and data models defined in the specification.

## Constitution Check

*GATE: All checks must pass before implementation.*

- **[PASS]** Adheres to specified tech stack (FastAPI, SQLModel, Neon).
- **[PASS]** All work is confined to the `/backend` directory.
- **[PASS]** Plan respects the "no frontend modification" rule.
- **[PASS]** Plan includes mandatory JWT authentication for all endpoints.
- **[PASS]** Plan enforces strict user data isolation in all database operations.
- **[PASS]** API endpoints and database schema match the specification exactly.

## Project Structure

### Documentation (this feature)

```text
specs/001-implement-todo-backend/
├── plan.md              # This file
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── openapi.yml
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
backend/
├── auth/
│   └── jwt.py           # JWT verification logic
├── routes/
│   └── tasks.py         # Task-related API endpoints
├── .env                 # (already exists)
├── db.py                # Database engine, session management
├── main.py              # FastAPI app instantiation, CORS, routers
├── models.py            # SQLModel table models
└── schemas.py           # Pydantic data transfer objects
```

**Structure Decision**: The plan adopts the recommended backend structure. This layout provides clear separation of concerns for authentication, routing, database logic, and data models, which is a standard practice for FastAPI applications.

## Implementation Steps

1.  **Backend Folder Structure Setup**: Create the directory structure inside `/backend` as outlined above.

2.  **Database Engine & Session Management (`db.py`)**:
    *   Read `Neon_db_url` from the `.env` file.
    *   Create the SQLModel engine using `create_engine`.
    *   Implement a function `create_db_and_tables()` to be called on application startup. This function should check for the existence of tables before attempting to create them to be safe for restarts (`SQLModel.metadata.create_all(engine, checkfirst=True)`). No destructive operations like table drops should be included.
    *   Create a dependency `get_session()` that yields a `Session` from the engine and ensures it is closed after the request.

3.  **SQLModel Task Model (`models.py`)**:
    *   Define a `Task` class that inherits from `SQLModel` and is decorated as a `@table`.
    *   Define columns exactly as specified in the schema: `id`, `user_id`, `title`, `description`, `completed`, `created_at`, `updated_at`.
    *   Set `id` as the primary key. Use appropriate data types (e.g., `int`, `str`, `bool`, `datetime`).
    *   Timestamps (`created_at`, `updated_at`) must be timezone-aware (use `datetime.utcnow`) and generated exclusively by the backend, not accepted from client input. `updated_at` must be refreshed on every PUT and PATCH operation.

4.  **Pydantic Schemas (`schemas.py`)**:
    *   `TaskBase`: Contains common fields (`title`, `description`, `completed`).
    *   `TaskCreate`: Inherits from `TaskBase`. For creating new tasks.
    *   `TaskUpdate`: Inherits from `TaskBase`. All fields optional.
    *   `TaskRead`: Inherits from `TaskBase` and includes `id`, `created_at`, `updated_at`. This will be the response model. **Crucially, `user_id` MUST NOT be included in this schema** to avoid exposing it to the client.

5.  **JWT Verification (`auth/jwt.py`)**:
    *   Read `BETTER_AUTH_SECRET` from the `.env` file.
    *   Create an `OAuth2PasswordBearer` scheme.
    *   Create a dependency `get_current_user()` that takes the `token: str = Depends(oauth2_scheme)`.
    *   Inside this dependency:
        *   Define the expected JWT payload structure. The token must contain a `user_id` claim.
        *   Decode the JWT using `jose.jwt.decode` with the `BETTER_AUTH_SECRET`.
        *   Extract the `user_id` from the `user_id` claim in the decoded token payload.
        *   If the token is invalid, expired, or the `user_id` claim is missing, raise an `HTTPException` with status 401.
        *   Return the extracted `user_id`. The backend must **NEVER** trust `user_id` from a request body or path/query parameter.

6.  **Task CRUD Routes (`routes/tasks.py`)**:
    *   Create an `APIRouter`.
    *   Implement all endpoints: `GET /`, `POST /`, `GET /{id}`, `PUT /{id}`, `DELETE /{id}`, `PATCH /{id}/complete`.
    *   Inject the authenticated `user_id` into each endpoint using `user_id: int = Depends(get_current_user)`.
    *   Inject the database session using `session: Session = Depends(get_session)`.
    *   For all database queries (SELECT, UPDATE, DELETE), **always** include a `where(Task.user_id == user_id)` clause to enforce ownership.
    *   For `GET /{id}`, `PUT /{id}`, `DELETE /{id}`, `PATCH /{id}/complete`, if a query for a task with the given `id` and `user_id` returns no result, raise `HTTPException` with status 404.
    *   The `PATCH /{id}/complete` endpoint must not accept a request body. It should fetch the task, toggle its `completed` boolean field (`true` -> `false`, `false` -> `true`), and save the change.

7.  **Filtering Logic (`routes/tasks.py`)**:
    *   In the `GET /api/tasks` endpoint, accept an optional query parameter `status: str = "all"`.
    *   Based on the `status` value (`"pending"` or `"completed"`), add an additional `where()` clause to the database query to filter by the `completed` boolean field.

8.  **Main Application (`main.py`)**:
    *   Instantiate the `FastAPI` app.
    *   Configure CORS using `CORSMiddleware` to allow requests from `http://localhost:3000`.
    *   Include the router from `routes/tasks.py` with the prefix `/api/tasks`.
    *   Add a startup event handler that calls `create_db_and_tables()`.

9.  **Error Handling and Logging**:
    *   Implement a consistent JSON error response shape: `{ "detail": "Error message" }`.
    *   FastAPI's default `HTTPException` produces this format, which should be used for all handled errors (400, 401, 404).
    *   For unexpected server-side errors, a generic 500 response must be returned. No stack traces or internal details should ever be exposed in error responses.
    *   Server-side logging is permitted for debugging purposes, but sensitive information such as JWTs, secrets, or database credentials must NEVER be logged.

10. **HTTP Status Codes**:
    *   `200 OK`: For successful `GET`, `POST`, `PUT`, `PATCH` requests.
    *   `204 No Content`: For successful `DELETE` requests (as an alternative to 200, but must be consistent with frontend expectations). Let's stick with 200 for simplicity if the frontend handles it. A quick check on modern frontend practices suggests returning the deleted object or a success message with a 200 is common. Let's plan for a `{"message": "Task deleted successfully"}` with a 200 status.
    *   `400 Bad Request`: For request validation errors.
    *   `401 Unauthorized`: For missing, invalid, or expired JWTs.
    *   `404 Not Found`: For requests targeting a resource that does not exist or is not owned by the user.

11. **Integration & Validation**:
    *   Once all steps are complete, start the backend server.
    *   Manually test the integration by using the frontend application at `http://localhost:3000` to perform all CRUD operations.
    *   Verify that tasks are created, displayed, updated, and deleted correctly.
    *   Verify that filtering works.
    *   Verify that creating accounts with different users results in completely separate task lists.
    *   Use browser developer tools to inspect network requests and confirm the backend returns correct data and status codes as defined in this plan.
