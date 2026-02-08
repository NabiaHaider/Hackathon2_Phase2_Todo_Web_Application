'use client';

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditTaskForm } from "./EditTaskForm"; // Import the EditTaskForm

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, title: string, description?: string) => void; // Modified onEdit signature
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    onDelete(task.id);
    setShowConfirmDelete(false);
  };

  const handleEditClick = () => {
    setShowEditDialog(true);
  };

  const handleEditSubmit = (id: string, title: string, description?: string) => {
    onEdit(id, title, description);
    setShowEditDialog(false);
  };

  return (
    <Card className={`group flex items-center justify-between p-4 mb-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
      task.completed ? "opacity-70 bg-gray-50" : ""
    }`}>
      <div className="flex items-center space-x-3">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
        />
        <label
          htmlFor={`task-${task.id}`}
          className={`text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            task.completed ? "line-through text-gray-600" : ""
          }`}
        >
          {task.title}
        </label>
      </div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
        <Button variant="ghost" size="icon" onClick={handleEditClick}>
          <PencilIcon className="h-4 w-4 text-primary-700" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDeleteClick}>
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </Button>

        {/* Edit Task Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <EditTaskForm
              task={task}
              onSubmit={handleEditSubmit}
              onCancel={() => setShowEditDialog(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showConfirmDelete} onOpenChange={setShowConfirmDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete &quot;{task.title}&quot;? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirmDelete(false)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};
