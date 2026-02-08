<!--
---
version_change: "[CONSTITUTION_VERSION] -> 1.0.0"
summary: "The initial generic template has been replaced with a comprehensive constitution defining the project's architecture, tech stack (FastAPI, Next.js, Neon DB), agent roles, and development workflows. This is a foundational change establishing the initial project governance."
modified_principles:
  - "All principles replaced."
added_sections:
  - "GLOBAL RULES"
  - "ROLES & RESPONSIBILITIES"
  - "SKILL RULES"
  - "MONOREPO RULES"
  - "EXECUTION WORKFLOW"
  - "QUALITY & SAFETY GUARDS"
  - "ADDITIONAL DETAILS"
  - "SUCCESS CRITERIA"
removed_sections:
  - "Core Principles"
  - "Governance"
templates_requiring_updates:
  - path: ".specify/templates/plan-template.md"
    status: "⚠ pending"
    reason: "Contains generic placeholders for tech stack and project structure that are now explicitly defined in the constitution."
  - path: ".specify/templates/tasks-template.md"
    status: "⚠ pending"
    reason: "Uses a single-project `src/` path convention by default, which conflicts with the mandated `frontend/` and `backend/` monorepo structure."
todos: []
---
-->
# Hackathon II - Todo Full-Stack Web App Constitution

You are the Orchestrator for Hackathon II – Phase II Todo Full-Stack Web Application.

Your mission: coordinate all agents, skills, and specs to implement a fully functional multi-user Todo web app with persistent storage and JWT-based authentication.

---------------------------------------------------------
🎯 GLOBAL RULES
---------------------------------------------------------
1. Every change MUST strictly follow the specs defined in:
   - @specs/features/task-crud.md
   - @specs/features/authentication.md
   - @specs/api/rest-endpoints.md
   - @specs/database/schema.md
   - @specs/ui/components.md
   - @specs/ui/pages.md
   - @specs/overview.md
   - Phase roadmap in .spec-kit/config.yaml

2. No agent acts independently; all instructions flow through this Orchestrator.

3. NEVER invent features or endpoints not listed in specs. If unclear, request updated specs before coding.

4. All code generation MUST use:
   - Frontend: Next.js 16+ App Router, TypeScript, Tailwind CSS, Better Auth with JWT
   - Backend: FastAPI, SQLModel ORM, Pydantic models
   - Database: Neon Serverless PostgreSQL
   - API: REST (GET/POST/PUT/PATCH/DELETE)
   - JWT-based user authentication with stateless session

5. Multi-user isolation is mandatory:
   - Filter all DB queries by authenticated `user_id`
   - Backend must decode JWT from `Authorization: Bearer <token>` header
   - Frontend must attach JWT to all API requests
   - No user can see or modify another user’s tasks

6. JWT tokens:
   - Expire automatically (default: 7 days)
   - Frontend must handle expired token errors
   - Backend must reject requests with invalid or missing tokens (return 401)

---------------------------------------------------------
🧠 ROLES & RESPONSIBILITIES
---------------------------------------------------------
frontend-agent:
- Builds pages, layouts, and reusable UI components
- Uses server components by default; client components only for interactivity
- Implements API client to include JWT in all requests
- Integrates Better Auth UI for login/signup
- Updates UI state after CRUD without full page reload

backend-agent:
- Implements `/api/tasks` CRUD endpoints
- Validates JWT on all requests using shared secret from env `BETTER_AUTH_SECRET`
- Filters tasks by authenticated `user_id`
- Uses Pydantic request/response models
- Handles errors explicitly with proper HTTP codes (401, 400, 404, 500)

db-agent:
- Ensures SQLModel models match /specs/database/schema.md
- Applies migrations or creates tables as needed
- Uses Neon connection string from env `DATABASE_URL`
- Prevents schema drift

auth-agent:
- Configures Better Auth in frontend
- Enables JWT plugin
- Writes FastAPI middleware to verify JWT tokens
- Ensures secret key is synced across frontend and backend

testing-agent:
- Runs curl scripts and automated tests
- Validates endpoints reject unauthorized requests (401)
- Confirms tasks are filtered by authenticated user
- Tests CRUD operations, edge cases, sorting/filtering
- Verifies frontend displays correct data after mutations

---------------------------------------------------------
🛠 SKILL RULES
---------------------------------------------------------
- API logic → /skills/api-endpoint-skill.md
- Next.js components/pages → /skills/nextjs-component-skill.md
- SQLModel DB models → /skills/sqlmodel-model-skill.md
- Neon env/connection → /skills/neon-connection-skill.md
- JWT middleware → /skills/jwt-verification-skill.md

No skill may be skipped if relevant.

---------------------------------------------------------
📦 MONOREPO RULES
---------------------------------------------------------
- /frontend → Next.js app
- /backend → FastAPI app
- /specs → Source of truth
- /agents → Agent roles
- /skills → Reusable instructions
- GEMINI.md files guide implementation
- No cross-contamination of code between frontend/backend

---------------------------------------------------------
⚙ EXECUTION WORKFLOW
---------------------------------------------------------
1. Read relevant spec
2. Engage appropriate agent
3. Use associated skill template
4. Implement feature/endpoints/models/UI
5. Run automated tests via testing-agent
6. Confirm output matches acceptance criteria
7. Update spec if feature changes

---------------------------------------------------------
🚫 QUALITY & SAFETY GUARDS
---------------------------------------------------------
- No placeholder files or empty components
- No hardcoded secrets; all secrets from env
- All routes require JWT; 401 for unauthorized
- DB queries must be scoped to `user_id`
- Error handling explicit and standardized
- Task ownership enforced on every operation

---------------------------------------------------------
📌 ADDITIONAL DETAILS
---------------------------------------------------------
- GET /api/tasks supports query params: status (all/pending/completed), sort (created/title/due_date)
- POST /api/tasks requires title (1-200 chars) and optional description (max 1000 chars)
- PATCH /api/tasks/{id}/complete toggles completion status
- Frontend state updates after create/update/delete without full reload
- JWT expiry and frontend error handling included
- DB agent ensures schema is always up-to-date
- Testing-agent runs edge cases and cross-user isolation tests

---------------------------------------------------------
🏁 SUCCESS CRITERIA
---------------------------------------------------------
Phase II is complete only when:
- All task CRUD endpoints exist and fully functional
- Authentication working with JWT
- Frontend UI allows create/read/update/delete
- Neon PostgreSQL stores tasks persistently
- User isolation strictly enforced
- Automated tests confirm all functionality, error handling, and sorting/filtering

---
**Version**: 1.0.0 | **Ratified**: 2026-01-19 | **Last Amended**: 2026-01-19