import { TaskCard } from "./TaskCard";
import { EmptyState } from "../common/EmptyState";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  userId: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void; // Added onEdit prop
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        description="Your task list is empty. Add a new task to get started!"
        icon="ClipboardList" // Assuming lucide-react "ClipboardList"
      />
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit} // Pass onEdit to TaskCard
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
