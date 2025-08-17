import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "../api";
import { QueryTodoParams, UpdateTodoData } from "../types";

export const useTodos = (params?: QueryTodoParams) => {
  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => todosApi.getTodos(params),
  });
};

export const useTodo = (id: string) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => todosApi.getTodo(id),
    enabled: !!id,
  });
};

export const useTodoStats = () => {
  return useQuery({
    queryKey: ["todos", "stats"],
    queryFn: () => todosApi.getStats(),
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoData }) =>
      todosApi.updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todosApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
