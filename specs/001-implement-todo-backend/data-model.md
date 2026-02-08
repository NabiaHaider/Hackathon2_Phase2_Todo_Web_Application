# Data Model: Todo App

**Source**: [spec.md](spec.md)

This document outlines the data entities for the Todo App backend feature. The primary source of truth is the feature specification.

## `Task` Entity

Represents a single to-do item belonging to a user.

### Fields

| Field         | Type      | Constraints                               | Description                               |
|---------------|-----------|-------------------------------------------|-------------------------------------------|
| `id`          | Integer   | Primary Key, Auto-incrementing            | The unique identifier for the task.       |
| `user_id`     | Integer   | Required, Foreign Key (to external users) | The ID of the user who owns the task.     |
| `title`       | String    | Required, 1-200 characters                | The title or name of the task.            |
| `description` | String    | Optional, max 1000 characters             | A more detailed description of the task.  |
| `completed`   | Boolean   | Required, defaults to `false`             | The completion status of the task.        |
| `created_at`  | DateTime  | Required, auto-generated on creation      | The timestamp when the task was created.  |
| `updated_at`  | DateTime  | Required, auto-generated on update        | The timestamp when the task was last updated. |

### Relationships

-   **Belongs to**: A `User` (implicitly). The `user_id` field links a task to a user. The `User` entity itself is managed by an external authentication service.

### State Transitions

-   A `Task` is created with `completed` as `false`.
-   The `completed` status can be toggled between `true` and `false` via a dedicated API endpoint.
