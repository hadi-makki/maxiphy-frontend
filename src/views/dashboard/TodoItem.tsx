"use client";

import { useDeleteTodo, useUpdateTodo } from "@/lib/hooks/useTodos";
import { Todo } from "@/lib/types";
import { format } from "date-fns";
import { Edit, Pin, PinOff, Trash2 } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const priorityColors = {
  HIGH: "bg-red-100 text-red-800 border-red-200",
  MEDIUM: "bg-yellow-100 text-yellow-800 border-yellow-200",
  LOW: "bg-green-100 text-green-800 border-green-200",
};

export default function TodoItem({ todo, onEdit }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const handleComplete = async () => {
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        data: { completed: !todo.completed },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handlePin = async () => {
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        data: { pinned: !todo.pinned },
      });
    } catch (error) {
      console.error("Error pinning todo:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setIsDeleting(true);
      try {
        await deleteTodo.mutateAsync(todo.id);
      } catch (error) {
        console.error("Error deleting todo:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg bg-white shadow-sm transition-all ${
        todo.completed ? "opacity-60" : ""
      } ${todo.pinned ? "ring-2 ring-blue-200 bg-blue-50" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleComplete}
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />

          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.description}
            </p>

            <div className="mt-2 flex items-center space-x-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  priorityColors[todo.priority]
                }`}
              >
                {todo.priority}
              </span>

              <span className="text-xs text-gray-500">
                {format(new Date(todo.date), "MMM dd, yyyy")}
              </span>

              {todo.pinned && <Pin className="h-3 w-3 text-blue-600" />}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 ml-4">
          <button
            onClick={handlePin}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title={todo.pinned ? "Unpin" : "Pin"}
          >
            {todo.pinned ? (
              <PinOff className="h-4 w-4" />
            ) : (
              <Pin className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={() => onEdit(todo)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit"
          >
            <Edit className="h-4 w-4" />
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
