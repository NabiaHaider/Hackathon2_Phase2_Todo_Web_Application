---
id: 6
title: Fix Module Not Found Error for Header Component
stage: red
date_iso: 2026-02-02
surface: agent
model: gemini-1.5-pro
feature: todo-app-frontend
branch: 001-replace-ecommerce-specs
user: HP PROBOOOK 640 G2
command: |
  solve this error Build Error

  Module not found: Can't resolve './Header'
  ./components/layout/DashboardLayout.tsx (1:1)

  Module not found: Can't resolve './Header'
  > 1 | import { Header } from "./Header";
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    2 |
    3 | export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    4 |   return (

  Import trace:
    Server Component:
      ./components/layout/DashboardLayout.tsx
      ./app/tasks/layout.tsx

  https://nextjs.org/docs/messages/module-not-found                                                                    jb mene localhost300/tasks kiya to ye error araha hy kuch or mat kerne bs is error ko solve kero
labels: ["bug-fix", "frontend", "nextjs"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/components/layout/DashboardLayout.tsx
tests_yaml: null
---
## Outcome

The user reported a `Module not found` error for the `Header` component in `frontend/components/layout/DashboardLayout.tsx`. Upon inspection, it was determined that the import path `"./Header"` did not correctly match the filename `header.tsx`.

The issue was resolved by correcting the import statement in `frontend/components/layout/DashboardLayout.tsx` from `import { Header } from "./Header";` to `import { Header } from "./header";`. This change ensures that the `Header` component is correctly resolved by the module system.