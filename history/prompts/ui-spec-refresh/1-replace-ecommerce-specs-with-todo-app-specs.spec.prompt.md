---
id: 1
title: Replace E-commerce Specs with Todo App Specs
stage: spec
date: 2026-01-31
surface: agent
model: gemini
feature: ui-spec-refresh
branch: main
user: user
command: sp.spec
labels: [spec,frontend,ui]
links:
  spec: specs/ui/pages.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-ecommerce-frontend-spec # removed
  - specs/ui/pages.md # created
  - specs/ui/components.md # created
tests:
  - "none"
---

## Prompt

This is the Gemini CLI. We are setting up the context for our chat.
Today's date is Saturday, January 31, 2026 (formatted according to the user's locale).
My operating system is: win32
The project's temporary directory is: C:\Users\HP PROBOOOK 640 G2\.gemini\tmp\623371534ebaf2b446a1ff214cb9b644404aae566fa032f463e1aeb6332f28d3
I'm currently working in the directory: D:\Hackathon2\NewPhase2 - Copy (2)
Here is the folder structure of the current working directories:

Showing up to 200 items (files + folders). Folders or files indicated with ... contain more items not shown, were ignored, or the display limit (200 items) was reached.

D:\Hackathon2\NewPhase2 - Copy (2)\
├───.gitignore
├───GEMINI.md
├───.gemini\
│   └───commands\...
├───.git\...
├───.specify\
│   ├───memory\
│   │   └───constitution.md
│   ├───scripts\
│   │   └───powershell\
│   │       ├───check-prerequisites.ps1
│   │       ├───common.ps1
│   │       ├───create-new-feature.ps1
│   │       ├───setup-plan.ps1
│   │       └───update-agent-context.ps1
│   └───templates\
│       ├───adr-template.md
│       ├───agent-file-template.md
│       ├───checklist-template.md
│       ├───phr-template.prompt.md
│       ├───plan-template.md
│       ├───spec-template.md
│       └───tasks-template.md
├───.vscode\
├───agents\
│   ├───auth-agent.md
│   ├───backend-agent.md
│   ├───db-agent.md
│   ├───frontend-agent.md
│   ├───orchestrator-agent.md
│   └───testing-agent.md
├───frontend\
│   ├───.gitignore
│   ├───components.json
│   ├───eslint.config.mjs
│   ├───middleware.ts
│   ├───next.config.ts
│   ├───package-lock.json
│   ├───package.json
│   ├───playwright.config.ts
│   ├───postcss.config.mjs
│   ├───README.md
│   ├───tailwind.config.ts
│   ├───tsconfig.json
│   ├───.next\
│   │   └───dev\...
│   ├───app\
│   │   ├───favicon.ico
│   │   ├───globals.css
│   │   ├───layout.tsx
│   │   ├───page.tsx
│   │   ├───(admin)\
│   │   │   ├───layout.tsx
│   │   │   └───dashboard\
│   │   │       └───page.tsx
│   │   ├───(auth)\
│   │   │   ├───layout.tsx
│   │   │   ├───login\
│   │   │   │   └───page.tsx
│   │   │   └───signup\
│   │   │       └───page.tsx
│   │   ├───(shop)\
│   │   │   ├───layout.tsx
│   │   │   ├───page.tsx
│   │   │   ├───cart\
│   │   │   │   └───page.tsx
│   │   │   ├───checkout\
│   │   │   │   └───page.tsx
│   │   │   └───products\
│   │   │       ├───client-page.tsx
│   │   │       ├───page.tsx
│   │   │       └───[slug]\
│   │   │           ├───client-page.tsx
│   │   │           └───page.tsx
│   │   └───admin\
│   │       ├───layout.tsx
│   │       ├───components-test\
│   │       │   └───page.tsx
│   │       └───products\
│   │           └───new\
│   ├───components\
│   │   ├───charts\
│   │   │   └───sales-chart.tsx
│   │   ├───common\
│   │   │   ├───auth-form.tsx
│   │   │   ├───cart-item.tsx
│   │   │   ├───checkout-stepper.tsx
│   │   │   ├───data-table.tsx
│   │   │   ├───filter-chips.tsx
│   │   │   ├───filter-sidebar.tsx
│   │   │   ├───hero-banner.tsx
│   │   │   ├───icon.tsx
│   │   │   ├───image-gallery.tsx
│   │   │   ├───image-uploader.tsx
│   │   │   ├───mini-cart.tsx
│   │   │   ├───product-card.tsx
│   │   │   ├───product-grid.tsx
│   │   │   ├───search-bar.tsx
│   │   │   ├───stat-card.tsx
│   │   │   ├───typography.tsx
│   │   │   └───variant-selector.tsx
│   │   ├───layout\
│   │   │   ├───admin-sidebar.tsx
│   │   │   ├───footer.tsx
│   │   │   ├───header.tsx
│   │   │   └───logout-button.tsx
│   │   ├───providers\
│   │   │   └───theme-provider.tsx
│   │   └───ui\
│   │       ├───accordion.tsx
│   │       ├───badge.tsx
│   │       ├───button.tsx
│   │       ├───card.tsx
│   │       ├───carousel.tsx
│   │       ├───checkbox.tsx
│   │       ├───form.tsx
│   │       ├───input.tsx
│   │       ├───label.tsx
│   │       ├───progress.tsx
│   │       ├───radio-group.tsx
│   │       ├───select.tsx
│   │       ├───sheet.tsx
│   │       ├───slider.tsx
│   │       ├───sonner.tsx
│   │       ├───table.tsx
│   │       └───textarea.tsx
│   ├───lib\
│   │   ├───utils.ts
│   │   └───state\
│   │       ├───auth-store.ts
│   │       ├───cart-store.ts
│   │       └───ui-store.ts
│   ├───node_modules\...
│   ├───playwright-report\
│   │   └───index.html
│   ├───public\
│   │   ├───file.svg
│   │   ├───globe.svg
│   │   ├───logo.png
│   │   ├───next.svg
│   │   ├───placeholder-hero.jpg
│   │   ├───placeholder-product.jpg
│   │   ├───Product1.jpg
│   │   ├───Product2.jpg
│   │   ├───Product4.jpg
│   │   ├───Product5.jpg
│   │   ├───vercel.svg
│   │   └───window.svg
│   ├───test-results\
│   │   └───.last-run.json
│   └───tests\
│       └───visual\
│           └───components.spec.ts
├───history\
│   └───prompts\
│       ├───001-ecommerce-frontend-spec\
│       │   ├───1-create-ecommerce-frontend-spec.spec.prompt.md
│       │   ├───2-create-frontend-implementation-plan.plan.prompt.md
│       │   ├───3-generate-development-tasks-from-plan.tasks.prompt.md
│       │   ├───4-add-shadcn-ui-filtering-components.tasks.prompt.md
│       │   └───5-execute-implementation-plan.implement.prompt.md
│       ├───constitution\
│       │   └───1-establish-project-constitution-v1.0.0.constitution.prompt.md
│       └───general\
│           ├───1-create-agent-definition-files.general.prompt.md
│           ├───2-create-skill-definition-files.general.prompt.md
│           └───3-clarify-todo-website.general.prompt.md
├───skills\
│   ├───api-endpoint-skill.md
│   ├───jwt-verification-skill.md
│   ├───neon-connection-skill.md
│   ├───nextjs-component-skill.md
│   └───sqlmodel-model-skill.md
└───specs\
    └───001-ecommerce-frontend-spec\
        ├───data-model.md
        ├───plan.md
        ├───quickstart.md
        ├───research.md
        ├───spec.md
        ├───tasks.md
        ├───checklists\
        │   └───requirements.md
        └───contracts\
            └───types.d.ts

Reminder: Do not return an empty response when a tool call is required.

My setup is complete. I will provide my first command in the next turn.You are an expert Frontend Architect + UI/UX Designer working in a Spec-Kit Plus monorepo.

IMPORTANT:
The existing frontend specs are WRONG.
They describe an E-COMMERCE application.
This project is NOT an e-commerce app.

Your task is to REPLACE the existing frontend specs with NEW, CORRECT specs
for a TODO APPLICATION FRONTEND ONLY.

❌ DO NOT touch backend specs
❌ DO NOT modify authentication logic
❌ DO NOT reference products, cart, checkout, admin, orders, or e-commerce entities

━━━━━━━━━━━━━━━━━━━
🧠 CONTEXT
━━━━━━━━━━━━━━━━━━━

Project: Phase II – Todo Full-Stack Web Application  
Current problem:
- Login & Signup pages are already correct and implemented
- ALL OTHER FRONTEND SPECS AND UI ARE WRONG
- Existing frontend spec file is e-commerce based and must be discarded

Goal:
Create NEW frontend specs for a TODO Dashboard UI,
inspired by the attached dashboard image (FlowTask-style),
but using the SAME COLOR THEME as the existing Login / Signup pages.

━━━━━━━━━━━━━━━━━━━
🎨 DESIGN REQUIREMENTS
━━━━━━━━━━━━━━━━━━━

Dashboard Layout (must match image structure):

- Top header with:
  - App name/logo (left)
  - Logged-in user name (right)
  - Logout button

- Welcome section:
  - “Welcome back, {UserName}”
  - Short subtitle (task productivity message)
  - Primary CTA button: “New Task”

- Stats cards (exact structure like image):
  - Total Tasks
  - Completed
  - Pending
  - Each as a card with icon and count

- Main Tasks Panel:
  - Title: “Your Tasks”
  - Empty state (icon + text + Create Task button)
  - When tasks exist:
    - Task list
    - Checkbox to mark complete
    - Edit & Delete actions
    - Completed tasks visually distinct

- Filters:
  - All
  - Pending
  - Completed

Color Theme Rules:
- Use SAME color palette as existing Login / Signup pages
- Dark dashboard style like image
- No e-commerce visuals
- Professional, clean, modern UI

━━━━━━━━━━━━━━━━━━━
📄 SPEC-KIT TASK (VERY IMPORTANT)
━━━━━━━━━━━━━━━━━━━

You MUST create / update ONLY frontend specs inside:

/specs/ui/pages.md  
/specs/ui/components.md  

And REMOVE / REPLACE all e-commerce related content.

━━━━━━━━━━━━━━━━━━━
📘 REQUIRED SPEC CONTENT
━━━━━━━━━━━━━━━━━━━

1️⃣ /specs/ui/pages.md must define:

- /login (already correct – just document it)
- /signup (already correct – just document it)
- /tasks (MAIN DASHBOARD)
  - Layout sections
  - Empty state behavior
  - Task list behavior
  - Filters behavior

2️⃣ /specs/ui/components.md must define:

Reusable UI components:
- Header
- Sidebar (if used)
- TaskCard
- TaskStatsCard
- TaskList
- FilterTabs
- EmptyState
- Buttons, Inputs (shadcn/ui based)

━━━━━━━━━━━━━━━━━━━
🧩 FRONTEND TECH RULES
━━━━━━━━━━━━━━━━━━━

- Next.js 16+ App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- No inline styles
- Responsive & mobile-friendly
- Follow frontend/CLAUDE.md rules
- Server components by default
- Client components only where interactivity is required

━━━━━━━━━━━━━━━━━━━
🚫 STRICTLY FORBIDDEN
━━━━━━━━━━━━━━━━━━━

❌ Products
❌ Cart
❌ Checkout
❌ Orders
❌ Admin dashboard
❌ Charts
❌ Zustand cart logic
❌ Framer Motion e-commerce animations

━━━━━━━━━━━━━━━━━━━
🎯 FINAL OUTPUT EXPECTATION
━━━━━━━━━━━━━━━━━━━

- Old e-commerce frontend spec must be COMPLETELY REPLACED
- New specs must describe ONLY a TODO dashboard frontend
- Specs must be clear enough that another AI can build UI from them
- Design must visually resemble the provided dashboard image
- Color theme must match existing login/signup pages

Start by:
1. Discarding the existing e-commerce frontend spec
2. Writing clean, correct TODO frontend specs in /specs/ui/*

## Response snapshot

I have successfully replaced the outdated e-commerce frontend specs with the new, correct specs for the TODO application. The old files have been removed and the new `pages.md` and `components.md` have been created in `/specs/ui/` as requested.

## Outcome

- ✅ Impact: Replaced incorrect e-commerce frontend specifications with new, accurate specifications for a Todo application. This unblocks UI development.
- 🧪 Tests: No tests were run as this was a documentation change.
- 📁 Files: Deleted the `specs/001-ecommerce-frontend-spec` directory and created `specs/ui/pages.md` and `specs/ui/components.md`.
- 🔁 Next prompts: Implement the UI based on the new specifications.
- 🧠 Reflection: The user's instructions were clear. The key was to understand that `specs/001-ecommerce-frontend-spec` needed to be removed entirely and replaced with a new structure under `specs/ui`. The PowerShell command for directory removal needed correction.

## Evaluation notes (flywheel)

- Failure modes observed: Initial shell command for directory removal failed due to platform differences (PowerShell `rmdir` vs. cmd `rmdir`).
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
