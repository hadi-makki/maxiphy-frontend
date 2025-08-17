import { create } from "zustand";
import { Priority, Todo } from "@/lib/types";

interface DashboardState {
  // Filter and search state
  searchTerm: string;
  debouncedSearchTerm: string;
  showCompleted: boolean;
  priorityFilter: Priority | "";
  sortBy: "priority" | "date" | "createdAt";
  sortOrder: "asc" | "desc";
  page: number;

  // Dialog state
  showAddDialog: boolean;
  editingTodo: Todo | null;

  // Actions
  setSearchTerm: (term: string) => void;
  setDebouncedSearchTerm: (term: string) => void;
  setShowCompleted: (show: boolean) => void;
  setPriorityFilter: (priority: Priority | "") => void;
  setSortBy: (sortBy: "priority" | "date" | "createdAt") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  toggleSortOrder: () => void;
  setPage: (page: number) => void;
  resetPage: () => void;

  // Dialog actions
  setShowAddDialog: (show: boolean) => void;
  setEditingTodo: (todo: Todo | null) => void;
  openAddDialog: () => void;
  closeAddDialog: () => void;
  openEditDialog: (todo: Todo) => void;
  closeEditDialog: () => void;

  // Combined actions
  toggleShowCompleted: () => void;
  resetFilters: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  searchTerm: "",
  debouncedSearchTerm: "",
  showCompleted: false,
  priorityFilter: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  showAddDialog: false,
  editingTodo: null,

  // Filter and search actions
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    // Reset page when search changes
    get().resetPage();
  },

  setDebouncedSearchTerm: (term) => set({ debouncedSearchTerm: term }),

  setShowCompleted: (show) => {
    set({ showCompleted: show });
    get().resetPage();
  },

  setPriorityFilter: (priority) => {
    set({ priorityFilter: priority });
    get().resetPage();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().resetPage();
  },

  setSortOrder: (order) => set({ sortOrder: order }),

  toggleSortOrder: () => {
    const currentOrder = get().sortOrder;
    set({ sortOrder: currentOrder === "asc" ? "desc" : "asc" });
  },

  setPage: (page) => set({ page }),

  resetPage: () => set({ page: 1 }),

  // Dialog actions
  setShowAddDialog: (show) => set({ showAddDialog: show }),

  setEditingTodo: (todo) => set({ editingTodo: todo }),

  openAddDialog: () => set({ showAddDialog: true }),

  closeAddDialog: () => set({ showAddDialog: false }),

  openEditDialog: (todo) => set({ editingTodo: todo }),

  closeEditDialog: () => set({ editingTodo: null }),

  // Combined actions
  toggleShowCompleted: () => {
    const currentShow = get().showCompleted;
    set({ showCompleted: !currentShow });
    get().resetPage();
  },

  resetFilters: () => {
    set({
      searchTerm: "",
      debouncedSearchTerm: "",
      priorityFilter: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      page: 1,
    });
  },
}));
