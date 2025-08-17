export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
}

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Todo {
  id: string;
  description: string;
  priority: Priority;
  date: string;
  completed: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTodoData {
  description: string;
  priority: Priority;
  date: string;
  pinned?: boolean;
}

export interface UpdateTodoData {
  description?: string;
  priority?: Priority;
  date?: string;
  completed?: boolean;
  pinned?: boolean;
}

export interface TodosResponse {
  todos: Todo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface QueryTodoParams {
  priority?: Priority;
  completed?: boolean;
  search?: string;
  sortBy?: "priority" | "date" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}
