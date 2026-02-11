'use client';

import { useState, useEffect } from 'react';
import { TaskStatsCard } from '@/components/task/TaskStatsCard';
import { FilterTabs } from '@/components/task/FilterTabs';
import { TaskList } from '@/components/task/TaskList';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { Gauge, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';
import { AddTaskForm } from '@/components/task/AddTaskForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner'; // Import toast

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const getAuthToken = () => {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    toast.error('Please login first');
    return null;
  }
  return token;
};

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  userId: string;
}

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      const token = getAuthToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Task[] = await response.json();
        setTasks(data);
      } catch (err: any) {
        setError(err.message);
        toast.error(`Failed to load tasks: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleFilterChange = (newFilter: 'all' | 'pending' | 'completed') => {
    setFilter(newFilter);
  };

  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const handleAddTask = async (title: string, description?: string) => {
    const token = getAuthToken();
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTask: Task = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setIsAddTaskModalOpen(false);
      toast.success('Task added successfully!');
    } catch (err: any) {
      setError(err.message);
      toast.error(`Failed to add task: ${err.message}`);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const token = getAuthToken();
    if (!token) {
      return;
    }

    // Optimistic UI update
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

    try {
      const taskToToggle = tasks.find(task => task.id === id);
      if (!taskToToggle) throw new Error("Task not found");

      const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !taskToToggle.completed }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Task status updated!');
    } catch (err: any) {
      setError(err.message);
      // Revert optimistic update on error
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      toast.error(`Failed to update task status: ${err.message}`);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const token = getAuthToken();
    if (!token) {
      return;
    }

    // Optimistic UI update
    const originalTasks = tasks;
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Task deleted successfully!');
    } catch (err: any) {
      setError(err.message);
      // Revert optimistic update on error
      setTasks(originalTasks);
      toast.error(`Failed to delete task: ${err.message}`);
    }
  };

  const handleEditTask = async (id: string, title: string, description?: string) => {
    const token = getAuthToken();
    if (!token) {
      return;
    }

    // Optimistic UI update
    const originalTasks = tasks;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );

    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Task updated successfully!');
    } catch (err: any) {
      setError(err.message);
      // Revert optimistic update on error
      setTasks(originalTasks);
      toast.error(`Failed to update task: ${err.message}`);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="mx-auto my-8 w-full max-w-6xl rounded-2xl bg-white p-8 shadow-lg">
      <div className="flex flex-col gap-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            {isLoading ? (
              <>
                <Skeleton className="mb-2 h-9 w-64" />
                <Skeleton className="h-6 w-48" />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-primary">Welcome back, User!</h2>
                <p className="text-gray-700">You've got this!</p>
              </>
            )}
          </div>
          <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
            <DialogTrigger asChild>
              <PrimaryButton className="flex items-center gap-2 shadow-md h-10">
                <PlusCircle className="h-4 w-4" /> Add Task
              </PrimaryButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <AddTaskForm onSubmit={handleAddTask} />
            </DialogContent>
          </Dialog>
        </div>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
          {isLoading ? (
            <>
              <Skeleton className="h-[96px]" />
              <Skeleton className="h-[96px]" />
              <Skeleton className="h-[96px]" />
            </>
          ) : (
            <>
              <TaskStatsCard icon={<Gauge className="h-6 w-6" />} count={tasks.length} title="Total Tasks" />
              <TaskStatsCard icon={<CheckCircle className="h-6 w-6" />} count={completedTasks} title="Tasks Completed" />
              <TaskStatsCard icon={<Clock className="h-6 w-6" />} count={pendingTasks} title="Tasks Pending" />
            </>
          )}
        </section>

        {/* Tasks Panel */}
        <div className="bg-card p-4 rounded-lg shadow-xl mt-6">
          <h3 className="mb-6 text-2xl font-bold text-primary">Your Tasks</h3>
          {isLoading ? (
            <Skeleton className="mb-6 h-10 w-full" />
          ) : (
            <FilterTabs activeFilter={filter} onFilterChange={handleFilterChange} />
          )}
          <div className="mt-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : filteredTasks.length > 0 ? (
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ) : (
              <EmptyState
                title={`No ${filter !== 'all' ? filter : ''} tasks found`}
                description="Looks like you're all caught up or haven't added any yet!"
                icon="inbox"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
