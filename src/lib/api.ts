import axios from "axios";
import {
  LoginData,
  RegisterData,
  AuthResponse,
  CreateTodoData,
  UpdateTodoData,
  TodosResponse,
  TodoStats,
  QueryTodoParams,
  Todo,
} from "./types";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

// Auth API
export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getProfile: async (): Promise<AuthResponse> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

// Todos API
export const todosApi = {
  getTodos: async (params?: QueryTodoParams): Promise<TodosResponse> => {
    const response = await api.get("/todos", { params });
    return response.data;
  },

  getTodo: async (id: string): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (data: CreateTodoData): Promise<Todo> => {
    const response = await api.post("/todos", data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoData): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  getStats: async (): Promise<TodoStats> => {
    const response = await api.get("/todos/stats");
    return response.data;
  },
};

export default api;
