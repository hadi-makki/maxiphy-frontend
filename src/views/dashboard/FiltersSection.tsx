"use client";

import React from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { useDashboardStore } from "@/views/dashboard/store/useDashboardStore";
import { Priority } from "@/lib/types";

export default function FiltersSection() {
  const {
    searchTerm,
    priorityFilter,
    sortBy,
    sortOrder,
    showCompleted,
    setSearchTerm,
    setPriorityFilter,
    setSortBy,
    toggleSortOrder,
    toggleShowCompleted,
  } = useDashboardStore();
  return (
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
          onChange={(e) => setPriorityFilter(e.target.value as Priority)}
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
          onClick={toggleShowCompleted}
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
  );
}
