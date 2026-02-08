# Feature Specification: Todo App Backend Implementation

**Feature Branch**: `001-implement-todo-backend`  
**Created**: 2026-02-03  
**Status**: Draft  
**Input**: User description: "CONTEXT: This project is Hackathon II – Phase II Todo Full-Stack Web Application. IMPORTANT: The FRONTEND is already COMPLETE, WORKING, and LOCATED inside the `/frontend` folder. The BACKEND folder already EXISTS and ALL backend work MUST be done ONLY inside `/backend`. ABSOLUTE RULES (CRITICAL): - Do NOT modify frontend code - Do NOT refactor, rename, or move any frontend files - Do NOT touch `/frontend` folder at all - Do NOT recreate login or signup pages - Do NOT reinstall frontend libraries - Do NOT change frontend routing or UI - Backend changes MUST be isolated to `/backend` folder ONLY GOAL: Implement ONLY the BACKEND using FastAPI, SQLModel, and Neon PostgreSQL, strictly following the project constitution and specs, and ensure it INTEGRATES SUCCESSFULLY with the existing frontend without requiring ANY frontend change. SCOPE (BACKEND ONLY): - Folder: /backend - Language: Python - Framework: FastAPI - ORM: SQLModel - Database: Neon Serverless PostgreSQL - Auth: JWT verification compatible with Better Auth (frontend) ENVIRONMENT VARIABLES (ALREADY CONFIGURED): Use the existing `/backend/.env` file EXACTLY as provided. Do NOT rename variables. Do NOT hardcode secrets. .env contains: Neon_db_url=postgresql://neondb_owner:DuaBWi37ZCJb@ep-still-fog-a4k0kj01-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require BETTER_AUTH_SECRET=1bFJGeBl1rd8BOITJSFV9V4XmJ8xvPbs BETTER_AUTH_URL=http://localhost:3000 DATABASE RULES: - Use Neon_db_url from environment - Do NOT embed DB credentials in code - Use SQLModel engine + sessions correctly MANDATORY SPECS TO FOLLOW (NO EXCEPTIONS): - @specs/features/task-crud.md - @specs/features/authentication.md - @specs/api/rest-endpoints.md - @specs/database/schema.md - @specs/overview.md - Hackathon II Constitution (JWT, security, ownership rules) AUTHENTICATION (CRITICAL): - Every API endpoint MUST require JWT - JWT is received from: Authorization: Bearer <token> - Verify JWT using BETTER_AUTH_SECRET - Decode JWT and extract authenticated user_id - Reject missing or invalid JWT with 401 - NEVER trust user_id from request body or params USER ISOLATION (MANDATORY): - Every DB query MUST be scoped to authenticated user_id - Users must NEVER see or modify other users’ tasks - Return 404 if task does not belong to user DATABASE SCHEMA (MUST MATCH EXACTLY): tasks: - id - user_id - title - description - completed - created_at - updated_at (users table is managed externally by Better Auth) API ENDPOINTS (IMPLEMENT EXACTLY — NO ADDITIONS): GET /api/tasks - List tasks for authenticated user - Support filters: - status: all | pending | completed POST /api/tasks - Create task for authenticated user - title: required (1–200 chars) - description: optional (max 1000 chars) GET /api/tasks/{id} - Return task ONLY if owned by user - Otherwise return 404 PUT /api/tasks/{id} - Update task (title / description) - Ownership enforced DELETE /api/tasks/{id} - Delete task - Ownership enforced PATCH /api/tasks/{id}/complete - Toggle completed status - Ownership enforced ERROR HANDLING: - 401 → Missing / invalid JWT - 404 → Task not found or not owned - 400 → Validation errors - 500 → Unexpected server errors BACKEND STRUCTURE (RECOMMENDED): /backend - main.py - db.py - models.py - routes/tasks.py - auth/jwt.py - schemas.py - .env (already exists) INTEGRATION REQUIREMENT (VERY IMPORTANT): - Backend MUST work with the existing frontend at http://localhost:3000 - API responses must match frontend expectations - No frontend changes should be required after backend completion SUCCESS CRITERIA: Backend is COMPLETE only when: - All endpoints work correctly - JWT auth is enforced everywhere - User isolation is guaranteed - Frontend works without modification - Tasks load, create, update, delete, and toggle successfully"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Manage Tasks (Priority: P1)

As an authenticated user, I want to be able to create, view, update, and delete my own tasks, so that I can manage my to-do list effectively.

**Why this priority**: This is the core functionality of the application.

**Independent Test**: An authenticated user can log in, create a new task, see it in their list, edit it, and then delete it. The entire lifecycle of a task can be tested for a single user.

**Acceptance Scenarios**:

1.  **Given** I am an authenticated user, **When** I create a new task with a valid title, **Then** the task appears in my list of tasks.
2.  **Given** I am an authenticated user with tasks, **When** I view my task list, **Then** I only see the tasks I have created.
3.  **Given** I am an authenticated user, **When** I update the title or description of my own task, **Then** the task is updated with the new information.
4.  **Given** I am an authenticated user, **When** I delete my own task, **Then** the task is removed from my list.
5.  **Given** I am an authenticated user, **When** I try to view, update, or delete a task that does not belong to me, **Then** I receive a "not found" error.

---

### User Story 2 - Filter and Toggle Tasks (Priority: P2)

As an authenticated user, I want to filter my tasks by their completion status and mark tasks as complete or pending, so I can focus on what I need to do.

**Why this priority**: This provides essential usability for managing a task list.

**Independent Test**: An authenticated user can create several tasks, mark some as complete, and then filter the list to see all tasks, only pending tasks, and only completed tasks.

**Acceptance Scenarios**:

1.  **Given** I am an authenticated user with a mix of pending and completed tasks, **When** I filter my task list by "pending", **Then** I only see tasks that are not complete.
2.  **Given** I am an authenticated user with a mix of pending and completed tasks, **When** I filter my task list by "completed", **Then** I only see tasks that are complete.
3.  **Given** I am an authenticated user, **When** I mark a pending task as complete, **Then** its status is updated to "completed".
4.  **Given** I am an authenticated user, **When** I mark a completed task as pending, **Then** its status is updated to "pending".

---

### Edge Cases

-   How does the system handle requests with an invalid or expired authentication token? (Should return an unauthorized error).
-   How does the system handle an attempt to create a task with a title that is too long? (Should return a validation error).
-   How does the system handle an attempt to access a task with a non-existent ID? (Should return a not found error).

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The system MUST provide an API for managing tasks.
-   **FR-002**: All API endpoints MUST require user authentication.
-   **FR-003**: A user's access MUST be strictly limited to the tasks they own.
-   **FR-004**: Users MUST be able to create a task with a title and an optional description.
-   **FR-005**: Users MUST be able to retrieve a list of their own tasks.
-   **FR-006**: The task list MUST be filterable by completion status (all, pending, completed).
-   **FR-007**: Users MUST be able to retrieve a single task by its ID, if they own it.
-   **FR-008**: Users MUST be able to update the title and description of their own tasks.
-   **FR-009**: Users MUST be able to delete their own tasks.
-   **FR-010**: Users MUST be able to toggle the completion status of their own tasks.
-   **FR-011**: The system MUST NOT allow changes to the existing frontend application.
-   **FR-012**: The backend implementation MUST be entirely contained within the `/backend` directory.

### Key Entities *(include if feature involves data)*

-   **Task**: Represents a to-do item.
    -   **Attributes**: ID, User ID (owner), Title, Description, Completion Status, Creation Timestamp, Last Updated Timestamp.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: All specified API endpoints are implemented and functional.
-   **SC-002**: 100% of API endpoints enforce authentication and user-level data isolation.
-   **SC-003**: The existing frontend application, when connected to the new backend, can successfully perform all task management operations (create, read, update, delete, filter, toggle) without any frontend code changes.
-   **SC-004**: The system correctly handles invalid requests (e.g., bad data, unauthorized access) by returning appropriate error codes (400, 401, 404).
-   **SC-005**: The backend implementation passes all integration tests with the frontend.