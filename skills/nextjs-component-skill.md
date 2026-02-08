# Skill: Next.js Component Generation

## Description
This skill provides a template for creating a new React component or page within the Next.js frontend application. The template follows best practices, using TypeScript for type safety, React hooks for state management (`useState`, `useEffect`), and Tailwind CSS for styling.

It includes boilerplate for fetching data from a protected API endpoint, handling loading and error states, and conditionally rendering content. This allows the `frontend-agent` to quickly build new UI features that are consistent and integrated with the application's backend and auth system.

## Example Prompt
"As the `frontend-agent`, use the `nextjs-component-skill` to create the `TaskDashboard` page. This page should fetch the user's tasks from the `/api/tasks` endpoint upon loading. It needs to display a loading message while fetching, an error message on failure, and the list of tasks on success. Use Tailwind CSS for basic styling."

## Template
```typescript
// In a file like `app/dashboard/page.tsx`

'use client';

import { useEffect, useState } from 'react';

// Assumes a Task type is defined in `types/index.ts`
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Assume the JWT is stored and retrieved by an auth service
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('No authentication token found.');
        }

        const response = await fetch('/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks.');
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-3 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
            <input type="checkbox" checked={task.completed} readOnly className="form-checkbox h-5 w-5"/>
          </li>
        ))}
        {tasks.length === 0 && <p>You have no tasks yet.</p>}
      </ul>
    </div>
  );
}
```
