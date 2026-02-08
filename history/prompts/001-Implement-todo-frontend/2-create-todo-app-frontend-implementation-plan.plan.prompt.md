---
id: 2
title: Create Todo App Frontend Implementation Plan
stage: plan
date: 2026-01-31
surface: agent
model: gemini
feature: replace-ecommerce-specs
branch: 001-replace-ecommerce-specs
user: user
command: sp.plan
labels: [plan,frontend,ui]
links:
  spec: specs/001-replace-ecommerce-specs/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-replace-ecommerce-specs/plan.md # created
tests:
  - "none"
---

## Prompt

---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
handoffs:
  - label: Create Tasks
    agent: sp.tasks
    prompt: Break the plan into tasks
    send: true
  - label: Create Checklist
    agent: sp.checklist
    prompt: Create a checklist for the following domain...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/powershell/setup-plan.ps1 -Json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'm Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType gemini`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage: 
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer | misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.plan                                                                                                                                                                                                       You are a Senior Frontend Architect & UI Systems Designer.

Your task is to CREATE A NEW `/sp.plan.md` FILE
for a TODO APPLICATION FRONTEND.

IMPORTANT:
❌ The existing `/sp.plan.md` is WRONG
❌ It is based on an E-COMMERCE application
❌ That plan must be COMPLETELY DISCARDED

This project is NOT an e-commerce website.

━━━━━━━━━━━━━━━━━━━━━━
🧠 PROJECT CONTEXT
━━━━━━━━━━━━━━━━━━━━━━

Project Name: Task Management / TODO Web Application

Tech Stack:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- next-themes
- Lucide Icons

Already Exists:
- Login page (styled)
- Signup page (styled)
- A color theme is already established on those pages

MANDATORY RULE:
- The SAME color palette and visual theme from Login / Signup
  MUST be reused everywhere
- Dark-first UI
- Do NOT introduce a new theme

Your job:
- Create a NEW frontend implementation plan
- Only for TODO APP UI
- No backend logic
- No e-commerce concepts

━━━━━━━━━━━━━━━━━━━━━━
🎨 UI & VISUAL DIRECTION (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━

The application must include TWO core UI experiences:

1️⃣ LANDING / MAIN PAGE (`/`)

Visual direction:
- Dark gradient background
- Bold, modern headline
- Supporting subtitle text
- Primary CTA button (Get Started)
- Secondary CTA button (optional future feature)
- A small stats section (static UI only, no charts)

This page should feel:
- Modern
- Professional
- Productive
- SaaS-style
- Clean and minimal

2️⃣ TASK DASHBOARD (`/tasks`)

Visual direction:
- Modern dark UI
- Card-based layout
- Clean spacing and hierarchy
- Productivity-focused design

Dashboard MUST include:
- Header (logo/title, user name, logout)
- Welcome section
- Task statistics cards:
  - Total tasks
  - Completed tasks
  - Pending tasks
- Main task list panel
- Filters (All / Pending / Completed)
- Clear empty state UI
- Visually distinct completed tasks

━━━━━━━━━━━━━━━━━━━━━━
📄 WHAT YOU MUST CREATE
━━━━━━━━━━━━━━━━━━━━━━

Create a COMPLETE `/sp.plan.md` that includes ALL sections below.

━━━━━━━━━━
1️⃣ Frontend Architecture Overview
━━━━━━━━━━
- Next.js App Router usage
- Server vs Client Components strategy
- Layout nesting approach
- Providers hierarchy:
  - ThemeProvider (next-themes)
  - Any required UI/global providers
- Routing philosophy

━━━━━━━━━━
2️⃣ Folder & File Structure (TODO-based)
━━━━━━━━━━

Must include:
- app/
  - page.tsx (Landing page)
  - login/
  - signup/
  - tasks/
  - layout.tsx
- components/
  - layout (Header, DashboardLayout)
  - task (TaskCard, TaskList, TaskStatsCard)
  - common (Buttons, EmptyState)
- components/ui (shadcn/ui)
- lib/
- styles/ (if needed)

STRICTLY FORBIDDEN:
❌ products
❌ cart
❌ checkout
❌ admin
❌ shop

━━━━━━━━━━
3️⃣ Styling Initialization Plan (CRITICAL)
━━━━━━━━━━

Include step-by-step instructions for:
- Tailwind CSS setup
- Correct `tailwind.config.ts` content paths
- globals.css setup
- Root layout CSS import
- shadcn/ui initialization
- next-themes setup
- Visual verification steps
- Clear troubleshooting steps if styles do not apply

This section MUST prevent UI styling bugs.

━━━━━━━━━━
4️⃣ Design System
━━━━━━━━━━

Define:
- Colors (based on existing login/signup theme)
- Typography scale
- Buttons
- Cards
- Inputs
- Modals / dialogs
- Icon usage (Lucide)

━━━━━━━━━━
5️⃣ Page-by-Page UI Plan
━━━━━━━━━━

Pages to define:
- `/` Landing Page
- `/login`
- `/signup`
- `/tasks` Dashboard

For EACH page include:
- Layout structure
- Components used
- UI states (loading, empty, populated)

━━━━━━━━━━
6️⃣ Task Dashboard Behavior (UI ONLY)
━━━━━━━━━━

Explain UI behavior for:
- Add task
- Edit task
- Delete task
- Mark complete
- Filters
- Empty state UI
- Visual distinction for completed tasks

NO backend logic.

━━━━━━━━━━
7️⃣ Responsiveness Strategy
━━━━━━━━━━

Explain:
- Mobile-first approach
- Tablet adaptations
- Desktop layout
- Dashboard behavior on small screens

━━━━━━━━━━
8️⃣ Accessibility & UX
━━━━━━━━━━

Include:
- Keyboard navigation
- Focus states
- ARIA considerations
- Color contrast
- Empty state UX

━━━━━━━━━━
9️⃣ Testing & Visual QA
━━━━━━━━━━

Include:
- Manual UI checklist
- Theme consistency verification
- Responsive behavior checks
- Confirmation that no default Next.js page exists

━━━━━━━━━━
🔟 Final Verification Checklist
━━━━━━━━━━

Include a strict checklist confirming:
- This is a TODO application
- No e-commerce language or structure exists
- Landing page matches the defined hero layout
- Dashboard matches the defined productivity dashboard layout
- Color theme is consistent across all pages
- UI is production-ready

━━━━━━━━━━━━━━━━━━━━━━
🚫 STRICT RULES
━━━━━━━━━━━━━━━━━━━━━━

❌ No products
❌ No cart
❌ No checkout
❌ No admin panel
❌ No charts
❌ No e-commerce terminology

━━━━━━━━━━━━━━━━━━━━━━
🎯 FINAL EXPECTATION
━━━━━━━━━━━━━━━━━━━━━━

- `/sp.plan.md` must be COMPLETE and CLEAR
- Another AI should be able to implement the UI from this plan
- UI must be visually consistent and professional
- Theme consistency is mandatory

Start by:
1. Discarding the existing e-commerce-based plan
2. Writing a NEW TODO frontend plan from scratch

## Response snapshot

The plan file `specs/001-replace-ecommerce-specs/plan.md` has been successfully created and populated with the detailed implementation plan for the Todo Application Frontend.
The `update-agent-context.ps1` script ran successfully. It updated the `GEMINI.md` file.

## Outcome

- ✅ Impact: A detailed implementation plan for the Todo Application Frontend UI has been created and saved to `specs/001-replace-ecommerce-specs/plan.md`. The agent's context has been updated.
- 🧪 Tests: No tests were run as this was a plan generation.
- 📁 Files: Created `specs/001-replace-ecommerce-specs/plan.md` and updated `GEMINI.md`.
- 🔁 Next prompts: The next step is to break this plan into concrete tasks using `/sp.tasks`.
- 🧠 Reflection: The `sp.plan` command successfully generated a comprehensive plan based on the user's detailed requirements. The plan addresses architectural, structural, styling, design system, page-by-page UI, behavioral, responsiveness, accessibility, and testing aspects.

## Evaluation notes (flywheel)

- Failure modes observed: None in this specific turn, but previous issues with script execution were mitigated.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Ensure the `create-new-feature.ps1` script is robust against long `FeatureDescription` inputs.

```