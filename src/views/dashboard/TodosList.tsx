"use client";

import React from "react";
import { Todo } from "@/lib/types";
import TodoItem from "./TodoItem";
import MButton from "@/components/MButton";
import { useDashboardStore } from "@/views/dashboard/store/useDashboardStore";

interface TodosListProps {
  todos: Todo[];
}

export default function TodosList({ todos }: TodosListProps) {
  const { showCompleted, openAddDialog, openEditDialog } = useDashboardStore();

  const handleEdit = (todo: Todo) => {
    openEditDialog(todo);
  };
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {showCompleted ? "No completed todos yet." : "No todos found."}
        </p>
        {!showCompleted && (
          <MButton
            text="Create your first todo"
            onClick={openAddDialog}
            className="mt-4"
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
      ))}
    </div>
  );
}
