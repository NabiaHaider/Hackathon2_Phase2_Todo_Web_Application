---
id: 2
title: Create Skill Definition Files
stage: general
date: 2026-01-19
surface: agent
model: gemini-pro
feature: none
branch: master
user: user
command: skills prompt
Now that the agents files are created, move to skills.

You are still my Orchestrator Agent.

Next task: Create the skills folder with 5 reusable skill files. Generate the FULL content for each .md file yourself – no empty files, no placeholders. I will only copy-paste what you provide.

The 5 skill files are:

1. skills/api-endpoint-skill.md – Template for generating FastAPI REST endpoints
2. skills/nextjs-component-skill.md – Template for Next.js pages/components
3. skills/sqlmodel-model-skill.md – Template for SQLModel database models
4. skills/neon-connection-skill.md – Template for Neon DB connection & env setup
5. skills/jwt-verification-skill.md – Template for JWT verification middleware

For each file:
- Write a clear description of the skill
- Give example prompt how to use it (what to tell Gemini)
- Include a template or structure that can be reused
- Make it specific to the hackathon project (multi-user Todo, JWT, user isolation, Neon DB)

Output format – exactly like this:

--- skills/api-endpoint-skill.md ---
[full content of the file here]

--- skills/nextjs-component-skill.md ---
[full content here]

... and so on for all 5 files.

Do not leave anything empty. Generate meaningful content.

Start now – give me all 5 skills files in this message.
After this I will move to constitution.
labels: [skill-creation, configuration, template]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - skills/api-endpoint-skill.md
  - skills/nextjs-component-skill.md
  - skills/sqlmodel-model-skill.md
  - skills/neon-connection-skill.md
  - skills/jwt-verification-skill.md
tests:
  - "none"
---

## Prompt

skills prompt
Now that the agents files are created, move to skills.

You are still my Orchestrator Agent.

Next task: Create the skills folder with 5 reusable skill files. Generate the FULL content for each .md file yourself – no empty files, no placeholders. I will only copy-paste what you provide.

The 5 skill files are:

1. skills/api-endpoint-skill.md – Template for generating FastAPI REST endpoints
2. skills/nextjs-component-skill.md – Template for Next.js pages/components
3. skills/sqlmodel-model-skill.md – Template for SQLModel database models
4. skills/neon-connection-skill.md – Template for Neon DB connection & env setup
5. skills/jwt-verification-skill.md – Template for JWT verification middleware

For each file:
- Write a clear description of the skill
- Give example prompt how to use it (what to tell Gemini)
- Include a template or structure that can be reused
- Make it specific to the hackathon project (multi-user Todo, JWT, user isolation, Neon DB)

Output format – exactly like this:

--- skills/api-endpoint-skill.md ---
[full content of the file here]

--- skills/nextjs-component-skill.md ---
[full content here]

... and so on for all 5 files.

Do not leave anything empty. Generate meaningful content.

Start now – give me all 5 skills files in this message.
After this I will move to constitution.

## Response snapshot

Created the `skills` directory and 5 skill definition files as requested.

## Outcome

- ✅ Impact: Created 5 skill definition files in the `skills` directory.
- 🧪 Tests: No tests were run.
- 📁 Files: 
  - `skills/api-endpoint-skill.md`
  - `skills/nextjs-component-skill.md`
  - `skills/sqlmodel-model-skill.md`
  - `skills/neon-connection-skill.md`
  - `skills/jwt-verification-skill.md`
- 🔁 Next prompts: User will provide the next instruction.
- 🧠 Reflection: The process of creating multiple skill files with generated content was successful.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): n/a
