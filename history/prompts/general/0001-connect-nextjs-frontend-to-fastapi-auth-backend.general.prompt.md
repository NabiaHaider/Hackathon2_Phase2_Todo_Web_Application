---
id: 0001
title: Connect Next.js Frontend to FastAPI Auth Backend
stage: implement
date: 2026-02-08
surface: agent
model: gemini-1.5-pro-latest
feature: todo-app-auth
branch: main
user: user
command: Connect existing Next.js login and signup pages to the existing FastAPI authentication backend without changing any UI styling or recreating any files.

Requirements:

1. Do NOT create new pages or components.
2. Use the already existing AuthForm component.
3. Keep all UI styling exactly as it is.
4. Do NOT modify layout or design system.

Backend API Endpoints:
POST http://localhost:8000/api/auth/signup
POST http://localhost:8000/api/auth/login

Signup Flow:
- send email and password
- receive success response

Login Flow:
- send email and password
- receive JWT token containing { user_id }
- store token in localStorage
- redirect to /tasks

Tasks Page:
- when opening /tasks
- read token from localStorage
- attach Authorization header:
  Authorization: Bearer <token>

Do NOT use Better Auth npm library.
Authentication is handled by FastAPI backend.

Only modify:
- login/page.tsx logic
- signup/page.tsx logic
- tasks/page.tsx API calls
 GOAL:

Signup Flow

connect existing signup page to:
POST http://localhost:8000/api/auth/signup

send email and password

show backend error message if exists

on success redirect to /login

Login Flow

connect existing login page to:
POST http://localhost:8000/api/auth/login

receive JWT token

save token in localStorage as "token"

redirect to /tasks after login

Auth Handling

DO NOT use NextAuth

DO NOT create fakeUser

DO NOT use fakeToken

DO NOT create new auth provider

use simple fetch API

Tasks Page Auth

read token from localStorage

send header:
Authorization: Bearer <token>

if no token redirect to /login

Error Handling

show backend error.detail message

do not show generic errors

File Safety

ONLY update:
login page
signup page
API fetch logic

DO NOT create new folders

DO NOT rename files

Backend Info

Backend runs on port 8000

Frontend runs on port 3000

CORS already enabled

OUTPUT FORMAT:

show ONLY modified code sections

explain where to paste code

do not rewrite full files

END GOAL:
User should be able to:

signup → data saved in Neon DB

login → token generated

open tasks page successfully

UI remains exactly the same
labels: [frontend, backend, authentication, nextjs, fastapi]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - frontend/app/signup/page.tsx
 - frontend/app/login/page.tsx
 - frontend/app/tasks/page.tsx
tests:
null
---

## Prompt

Connect existing Next.js login and signup pages to the existing FastAPI authentication backend without changing any UI styling or recreating any files.

Requirements:

1. Do NOT create new pages or components.
2. Use the already existing AuthForm component.
3. Keep all UI styling exactly as it is.
4. Do NOT modify layout or design system.

Backend API Endpoints:
POST http://localhost:8000/api/auth/signup
POST http://localhost:8000/api/auth/login

Signup Flow:
- send email and password
- receive success response

Login Flow:
- send email and password
- receive JWT token containing { user_id }
- store token in localStorage
- redirect to /tasks

Tasks Page:
- when opening /tasks
- read token from localStorage
- attach Authorization header:
  Authorization: Bearer <token>

Do NOT use Better Auth npm library.
Authentication is handled by FastAPI backend.

Only modify:
- login/page.tsx logic
- signup/page.tsx logic
- tasks/page.tsx API calls
 GOAL:

Signup Flow

connect existing signup page to:
POST http://localhost:8000/api/auth/signup

send email and password

show backend error message if exists

on success redirect to /login

Login Flow

connect existing login page to:
POST http://localhost:8000/api/auth/login

receive JWT token

save token in localStorage as "token"

redirect to /tasks after login

Auth Handling

DO NOT use NextAuth

DO NOT create fakeUser

DO NOT use fakeToken

DO NOT create new auth provider

use simple fetch API

Tasks Page Auth

read token from localStorage

send header:
Authorization: Bearer <token>

if no token redirect to /login

Error Handling

show backend error.detail message

do not show generic errors

File Safety

ONLY update:
login page
signup page
API fetch logic

DO NOT create new folders

DO NOT rename files

Backend Info

Backend runs on port 8000

Frontend runs on port 3000

CORS already enabled

OUTPUT FORMAT:

show ONLY modified code sections

explain where to paste code

do not rewrite full files

END GOAL:
User should be able to:

signup → data saved in Neon DB

login → token generated

open tasks page successfully

UI remains exactly the same

## Response snapshot

The agent successfully modified `frontend/app/signup/page.tsx`, `frontend/app/login/page.tsx`, and `frontend/app/tasks/page.tsx` to integrate with the FastAPI authentication backend.
- For signup, `next-auth` imports and usage were removed, and a direct `fetch` call to the FastAPI signup endpoint was implemented. On success, it redirects to `/login`.
- For login, `next-auth` imports and usage were removed, and a direct `fetch` call to the FastAPI login endpoint was implemented. On successful login, the JWT token is stored in `localStorage`, and the user is redirected to `/tasks`.
- For the tasks page, the `useEffect` hook was modified to check for a token in `localStorage` and redirect to `/login` if not found. All task-related API calls (`fetchTasks`, `handleAddTask`, `handleToggleComplete`, `handleDeleteTask`, `handleEditTask`) were updated to use `fetch` with the `Authorization: Bearer <token>` header. Mock data and `setTimeout` calls were replaced with actual API interactions.

## Outcome

- ✅ Impact: Successfully connected Next.js frontend authentication flows (signup, login) and task API calls to the FastAPI backend.
- 🧪 Tests: No automated tests were created or run as part of this task.
- 📁 Files: Modified three frontend files to integrate with the backend authentication.
- 🔁 Next prompts: User to verify the changes and potentially add tests.
- 🧠 Reflection: The task involved modifying existing code to replace mock/next-auth logic with direct fetch calls to a FastAPI backend. Careful attention was paid to error handling and token management.

## Evaluation notes (flywheel)

- Failure modes observed: The `cli_help` tool failed to retrieve the original user prompt directly, requiring manual reconstruction.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
