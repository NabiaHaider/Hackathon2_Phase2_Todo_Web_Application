# Pages Specification

This document outlines the pages for the Todo application frontend.

---

## `/login`

**Status:** Correct and Implemented.

- **Purpose:** Allows existing users to sign in.
- **Layout:** Centered form on a clean background.
- **Components:**
  - `AuthForm` (mode: "login")
- **Authentication:** Uses existing authentication logic.

---

## `/signup`

**Status:** Correct and Implemented.

- **Purpose:** Allows new users to create an account.
- **Layout:** Centered form on a clean background.
- **Components:**
  - `AuthForm` (mode: "signup")
- **Authentication:** Uses existing authentication logic.

---

## `/tasks` (Dashboard)

**Status:** To be implemented.

**Purpose:** Main dashboard for users to manage their tasks after logging in. The design should be inspired by the FlowTask UI, using the existing application's color scheme.

### Layout Sections

1.  **Top Header:**
    - App name/logo on the left.
    - Logged-in user's name on the right.
    - Logout button.
2.  **Welcome Section:**
    - Heading: "Welcome back, {UserName}"
    - Subtitle: A short, motivational productivity message (e.g., "You've got this!").
    - Primary CTA: "New Task" button.
3.  **Stats Cards:**
    - A horizontal row of `TaskStatsCard` components.
    - Cards for:
      - **Total Tasks:** Count of all tasks.
      - **Completed:** Count of completed tasks.
      - **Pending:** Count of pending tasks.
    - Each card includes an icon, the count, and the title.
4.  **Main Tasks Panel:**
    - Title: "Your Tasks"
    - **Task Filters:** Tabs to filter the task list (`FilterTabs` component).
      - "All"
      - "Pending"
      - "Completed"
    - **Task List Area (`TaskList` component):**
      - **Empty State:** If no tasks match the current filter, display an `EmptyState` component with an icon, a message (e.g., "No tasks here. Create one!"), and a "Create Task" button.
      - **Task Items:** When tasks exist, display them as a list of `TaskCard` components.

### Behavior

- **Initial Load:** The dashboard loads, fetches the user's tasks, and displays them. The "All" filter is active by default.
- **Filtering:** Clicking a filter tab (All, Pending, Completed) updates the `TaskList` to show only the relevant tasks. The URL might be updated with a query parameter (e.g., `/tasks?filter=completed`).
- **Task Completion:** Users can click a checkbox on a `TaskCard` to mark a task as complete. The UI should update immediately (e.g., strikethrough text, move to a "Completed" section or visually fade) and persist the change.
- **Task Actions:** Each `TaskCard` has "Edit" and "Delete" actions.
  - **Edit:** Opens a modal or inline editor to change the task's title/description.
  - **Delete:** Opens a confirmation dialog before permanently removing the task.
- **New Task:** Clicking the "New Task" button opens a modal to create a new task.
