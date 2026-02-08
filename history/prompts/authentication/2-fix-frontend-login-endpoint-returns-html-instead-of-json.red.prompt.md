---
id: 2
title: Fix: Frontend login endpoint returns HTML instead of JSON
stage: red
date: 2026-02-07
surface: agent
model: gemini-1.5-flash
feature: authentication
branch: main
user: 
command: /fix Unexpected token '<', "<!DOCTYPE "... is not valid JSON
labels: ["bugfix", "frontend", "backend", "authentication"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/lib/auth.ts
tests_yaml: []
prompt_text: |
  login kerne pe email aur password dalne k bd ye likha hoa araha hai Unexpected token '<', "<!DOCTYPE "... is not valid JSON
response_text: |
  I have identified that the frontend was likely trying to access a relative `/api/auth/login` endpoint, which the Next.js development server might have handled by serving an HTML error page, leading to the "Unexpected token '<'" error.

  To fix this, I have updated `frontend/lib/auth.ts` to use the full, absolute URL for the backend login endpoint: `http://localhost:8000/api/auth/login`. This ensures the request goes directly to the running FastAPI backend.
---
