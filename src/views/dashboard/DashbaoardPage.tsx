"use client";

import MButton from "@/components/MButton";
import AddTodoForm from "@/components/todo/AddTodoForm";
import EditTodoForm from "@/components/todo/EditTodoForm";
import TodoItem from "@/components/todo/TodoItem";
import { useTodos, useTodoStats } from "@/lib/hooks/useTodos";
import { Priority, QueryTodoParams, Todo } from "@/lib/types";
import { Plus, Search, SortAsc, SortDesc } from "lucide-react";
import React, { useMemo, useState } from "react";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<Priority | "">("");
  const [sortBy, setSortBy] = useState<"priority" | "date" | "createdAt">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900">
              {stats.total}
            </h3>
            <p className="text-sm text-gray-600">Total Todos</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-green-600">
              {stats.completed}
            </h3>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-blue-600">
              {stats.pending}
            </h3>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-red-600">
              {stats.byPriority.high}
            </h3>
            <p className="text-sm text-gray-600">High Priority</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          {showCompleted ? "Completed Todos" : "My Todos"}
        </h1>
        <MButton
          text="Add Todo"
          startIcon={<Plus className="h-4 w-4" />}
          onClick={() => setShowAddDialog(true)}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | "")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "priority" | "date" | "createdAt")
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">Created Date</option>
            <option value="date">Due Date</option>
            <option value="priority">Priority</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={toggleSortOrder}
            className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
            <span className="ml-2 text-sm">
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </span>
          </button>
        </div>

        {/* Completion Toggle */}
        <div className="mt-4 flex items-center">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              showCompleted
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
          >
            {showCompleted ? "Show Pending" : "Show Completed"}
          </button>
        </div>
      </div>

      {/* Todos List */}
      <div className="space-y-4">
        {todosData?.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onEdit={handleEditTodo} />
        ))}

        {todosData?.todos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {showCompleted ? "No completed todos yet." : "No todos found."}
            </p>
            {!showCompleted && (
              <MButton
                text="Create your first todo"
                onClick={() => setShowAddDialog(true)}
                className="mt-4"
              />
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {todosData && todosData.pagination.pages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <MButton
            text="Previous"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />

          <span className="px-4 py-2 text-sm text-gray-600">
            Page {page} of {todosData.pagination.pages}
          </span>

          <MButton
            text="Next"
            variant="outline"
            disabled={page === todosData.pagination.pages}
            onClick={() => setPage(page + 1)}
          />
        </div>
      )}

      {/* Add Todo Dialog */}
      <AddTodoForm open={showAddDialog} onOpenChange={setShowAddDialog} />

      {/* Edit Todo Dialog */}
      {editingTodo && (
        <EditTodoForm
          todo={editingTodo}
          open={!!editingTodo}
          onOpenChange={(open) => {
            if (!open) setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}
