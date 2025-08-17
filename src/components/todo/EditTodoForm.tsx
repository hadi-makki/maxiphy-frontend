"use client";

import MButton from "@/components/MButton";
import MValidatedInput from "@/components/MValidatedInput";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useUpdateTodo } from "@/lib/hooks/useTodos";
import { Todo } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditTodoFormProps {
  todo: Todo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const updateTodoSchema = z.object({
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  date: z.string().min(1, "Date is required"),
  pinned: z.boolean().optional(),
});

type UpdateTodoFormData = z.infer<typeof updateTodoSchema>;

export default function EditTodoForm({
  todo,
  open,
  onOpenChange,
}: EditTodoFormProps) {
  const updateTodo = useUpdateTodo();

  const form = useForm<UpdateTodoFormData>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      description: todo.description,
      priority: todo.priority,
      date: new Date(todo.date).toISOString().split("T")[0],
      pinned: todo.pinned,
    },
  });

  // Reset form when todo changes
  React.useEffect(() => {
    if (todo) {
      form.reset({
        description: todo.description,
        priority: todo.priority,
        date: new Date(todo.date).toISOString().split("T")[0],
        pinned: todo.pinned,
      });
    }
  }, [todo, form]);

  const onSubmit = async (data: UpdateTodoFormData) => {
    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        data: {
          ...data,
          date: new Date(data.date).toISOString(),
        },
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <MValidatedInput
              name="description"
              label="Description"
              placeholder="Enter todo description"
              isRequired
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                {...form.register("priority")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
              {form.formState.errors.priority && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.priority.message}
                </p>
              )}
            </div>

            <MValidatedInput name="date" type="date" label="Date" isRequired />

            <div className="flex items-center">
              <input
                type="checkbox"
                {...form.register("pinned")}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Pin this todo to the top
              </label>
            </div>

            <DialogFooter>
              <MButton
                type="button"
                text="Cancel"
                variant="outline"
                onClick={() => onOpenChange(false)}
              />
              <MButton
                type="submit"
                text={updateTodo.isPending ? "Updating..." : "Update Todo"}
                isLoading={updateTodo.isPending}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
