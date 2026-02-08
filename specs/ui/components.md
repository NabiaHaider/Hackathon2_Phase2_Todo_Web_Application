# Components Specification

This document defines the reusable UI components for the Todo application frontend. All components should be built using `shadcn/ui` primitives where possible and styled with Tailwind CSS.

---

## Core Components

### `Header`
- **Description:** The main application header, displayed on the `/tasks` dashboard.
- **Props:**
  - `userName: string`
- **Content:**
  - App Logo/Name (e.g., "FlowTask")
  - User's name display.
  - Logout button.
- **Styling:** Dark background, consistent with the overall dashboard theme.

### `TaskStatsCard`
- **Description:** A card displaying a single statistic about tasks.
- **Props:**
  - `icon: React.ReactNode` (e.g., an SVG icon)
  - `count: number`
  - `title: string` (e.g., "Total Tasks")
- **Styling:** Follows the dark, modern aesthetic of the dashboard image.

### `TaskList`
- **Description:** A container that renders a list of tasks or an empty state.
- **Props:**
  - `tasks: Task[]`
  - `filter: 'all' | 'pending' | 'completed'`
- **Behavior:**
  - Filters the `tasks` array based on the `filter` prop.
  - If the filtered list is empty, it renders the `EmptyState` component.
  - Otherwise, it maps over the filtered tasks and renders a `TaskCard` for each.

### `TaskCard`
- **Description:** A single item in the task list.
- **Props:**
  - `task: Task` (contains id, title, description, completed status)
  - `onToggleComplete: (id: string) => void`
  - `onEdit: (task: Task) => void`
  - `onDelete: (id: string) => void`
- **Content:**
  - A checkbox (`@shadcn/ui/checkbox`) to toggle the completed status.
  - Task title and description.
  - Edit and Delete action buttons/icons.
- **Styling:**
  - Completed tasks are visually distinct (e.g., strikethrough text, lower opacity).

### `FilterTabs`
- **Description:** A set of tabs to filter the task list.
- **Props:**
  - `activeFilter: 'all' | 'pending' | 'completed'`
  - `onFilterChange: (filter: 'all' | 'pending' | 'completed') => void`
- **Content:**
  - Buttons or tabs for "All", "Pending", and "Completed".
- **Styling:** The active filter tab is visually highlighted.

### `EmptyState`
- **Description:** A message shown when a list (like the task list) is empty.
- **Props:**
  - `message: string`
  - `icon: React.ReactNode`
- **Content:**
  - An icon.
  - A text message (e.g., "You have no pending tasks.").
  - A "Create Task" button to encourage action.

---

## `shadcn/ui` Based Components

The following components will be styled wrappers around `shadcn/ui` primitives to ensure consistency.

- **`Button`:** Standard button component. Variants will include `primary`, `secondary`, `destructive`, `ghost`.
- **`Input`:** For text entry in forms (e.g., new/edit task).
- **`Checkbox`:** For marking tasks as complete.
- **`Card`:** The base for `TaskStatsCard` and other card-like elements.
- **`Modal` / `Dialog`:** For creating/editing tasks and for confirmation dialogs.
- **`Tabs`:** The base for `FilterTabs`.

---

## Data Structure `Task`

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO 8601 date string
  userId: string;
}
```
