---
id: 1
title: Create Agent Definition Files
stage: general
date: 2026-01-19
surface: agent
model: gemini-pro
feature: none
branch: master
user: user
command: You are now my Orchestrator Agent for Hackathon II Phase II Todo Full-Stack project.

Your job is to create the entire multi-agent system for me step by step.

First task: Create the agents folder with 6 agent files. You will generate the FULL content for each .md file yourself – no empty files, no placeholders. I should only copy-paste what you give me.

The 6 agent files are:

1. agents/frontend-agent.md – Next.js, Tailwind, Better Auth frontend role
2. agents/backend-agent.md – FastAPI, SQLModel, API endpoints role
3. agents/db-agent.md – Neon PostgreSQL, SQLModel schema & connection role
4. agents/auth-agent.md – Better Auth + JWT integration role
5. agents/orchestrator-agent.md – Master coordinator role (this is you right now)
6. agents/testing-agent.md – Testing, validation, curl commands role

For each file:
- Write clear role description
- List what commands/instructions the agent accepts
- Mention which specs it should reference
- Keep it short but complete (200–400 words per file)

Output format – exactly like this, one after another:

--- agents/frontend-agent.md ---
[full content of the file here]

--- agents/backend-agent.md ---
[full content here]

... and so on for all 6 files.

Do not leave anything empty. Generate meaningful, project-specific content based on the hackathon document (multi-user Todo, JWT auth, Neon DB, REST API /api/tasks, user isolation).

Start now – give me all 6 agent files one by one in this message.
After that I will tell you to move to skills
labels: [agent-setup, configuration]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - agents/frontend-agent.md
  - agents/backend-agent.md
  - agents/db-agent.md
  - agents/auth-agent.md
  - agents/orchestrator-agent.md
  - agents/testing-agent.md
tests:
  - "none"
---

## Prompt

You are now my Orchestrator Agent for Hackathon II Phase II Todo Full-Stack project.

Your job is to create the entire multi-agent system for me step by step.

First task: Create the agents folder with 6 agent files. You will generate the FULL content for each .md file yourself – no empty files, no placeholders. I should only copy-paste what you give me.

The 6 agent files are:

1. agents/frontend-agent.md – Next.js, Tailwind, Better Auth frontend role
2. agents/backend-agent.md – FastAPI, SQLModel, API endpoints role
3. agents/db-agent.md – Neon PostgreSQL, SQLModel schema & connection role
4. agents/auth-agent.md – Better Auth + JWT integration role
5. agents/orchestrator-agent.md – Master coordinator role (this is you right now)
6. agents/testing-agent.md – Testing, validation, curl commands role

For each file:
- Write clear role description
- List what commands/instructions the agent accepts
- Mention which specs it should reference
- Keep it short but complete (200–400 words per file)

Output format – exactly like this, one after another:

--- agents/frontend-agent.md ---
[full content of the file here]

--- agents/backend-agent.md ---
[full content here]

... and so on for all 6 files.

Do not leave anything empty. Generate meaningful, project-specific content based on the hackathon document (multi-user Todo, JWT auth, Neon DB, REST API /api/tasks, user isolation).

Start now – give me all 6 agent files one by one in this message.
After that I will tell you to move to skills

## Response snapshot

Created the `agents` directory and 6 agent definition files as requested.

## Outcome

- ✅ Impact: Created 6 agent definition files in the `agents` directory.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - `agents/frontend-agent.md`
  - `agents/backend-agent.md`
  - `agents/db-agent.md`
  - `agents/auth-agent.md`
  - `agents/orchestrator-agent.md`
  - `agents/testing-agent.md`
- 🔁 Next prompts: User will provide the next instruction.
- 🧠 Reflection: The process of creating multiple files with generated content was successful. The instructions were clear and I was able to follow them.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a
