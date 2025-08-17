"use client";

import React from "react";
import MButton from "@/components/MButton";
import { useDashboardStore } from "@/views/dashboard/store/useDashboardStore";

interface PaginationData {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

interface PaginationProps {
  pagination: PaginationData;
}

export default function Pagination({ pagination }: PaginationProps) {
  const { page, setPage } = useDashboardStore();
  if (pagination.pages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <MButton
        text="Previous"
        variant="outline"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />

      <span className="px-4 py-2 text-sm text-gray-600">
        Page {page} of {pagination.pages}
      </span>

      <MButton
        text="Next"
        variant="outline"
        disabled={page === pagination.pages}
        onClick={() => setPage(page + 1)}
      />
    </div>
  );
}
