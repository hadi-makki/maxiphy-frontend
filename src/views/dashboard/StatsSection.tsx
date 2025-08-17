"use client";

import React from "react";

interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

interface StatsSectionProps {
  stats?: TodoStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900">{stats.total}</h3>
        <p className="text-sm text-gray-600">Total Todos</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-green-600">
          {stats.completed}
        </h3>
        <p className="text-sm text-gray-600">Completed</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-blue-600">{stats.pending}</h3>
        <p className="text-sm text-gray-600">Pending</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-red-600">
          {stats.byPriority.high}
        </h3>
        <p className="text-sm text-gray-600">High Priority</p>
      </div>
    </div>
  );
}
