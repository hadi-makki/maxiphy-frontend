"use client";

import MButton from "@/components/MButton";
import AddTodoForm from "@/views/dashboard/AddTodoForm";
import EditTodoForm from "@/views/dashboard/EditTodoForm";
import StatsSection from "@/views/dashboard/StatsSection";
import FiltersSection from "@/views/dashboard/FiltersSection";
import TodosList from "@/views/dashboard/TodosList";
import Pagination from "@/views/dashboard/Pagination";
import { useTodos, useTodoStats } from "@/lib/hooks/useTodos";
import { QueryTodoParams } from "@/lib/types";
import { useDashboardStore } from "@/views/dashboard/store/useDashboardStore";
import { Plus } from "lucide-react";
import React, { useMemo } from "react";
import MLoader from "@/components/MLoader";

export default function DashboardPage() {
  const {
    searchTerm,
    debouncedSearchTerm,
    showCompleted,
    priorityFilter,
    sortBy,
    sortOrder,
    page,
    editingTodo,
    setDebouncedSearchTerm,
    openAddDialog,
    closeEditDialog,
  } = useDashboardStore();

  // Debounced search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, setDebouncedSearchTerm]);

  const queryParams: QueryTodoParams = useMemo(
    () => ({
      completed: showCompleted,
      priority: priorityFilter || undefined,
      search: debouncedSearchTerm || undefined,
      sortBy,
      sortOrder,
      page,
      limit: 10,
    }),
    [
      showCompleted,
      priorityFilter,
      debouncedSearchTerm,
      sortBy,
      sortOrder,
      page,
    ]
  );

  const { data: todosData, isLoading, error } = useTodos(queryParams);
  const { data: stats } = useTodoStats();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading todos</p>
          <MButton text="Retry" onClick={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          {showCompleted ? "Completed Todos" : "My Todos"}
        </h1>
        <MButton
          text="Add Todo"
          startIcon={<Plus className="h-4 w-4" />}
          onClick={openAddDialog}
        />
      </div>

      {/* Filters and Search */}
      <FiltersSection />

      {/* Todos List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <MLoader />
        </div>
      ) : (
        <TodosList todos={todosData?.todos || []} />
      )}

      {/* Pagination */}
      {todosData && <Pagination pagination={todosData.pagination} />}

      {/* Add Todo Dialog */}
      <AddTodoForm />

      {/* Edit Todo Dialog */}
      {editingTodo && (
        <EditTodoForm
          todo={editingTodo}
          open={!!editingTodo}
          onOpenChange={(open) => {
            if (!open) closeEditDialog();
          }}
        />
      )}
    </div>
  );
}
