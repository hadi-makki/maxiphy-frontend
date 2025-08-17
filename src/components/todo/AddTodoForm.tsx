"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateTodo } from "@/lib/hooks/useTodos";
import { Priority } from "@/lib/types";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import MValidatedInput from "@/components/MValidatedInput";
import MButton from "@/components/MButton";

interface AddTodoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const createTodoSchema = z.object({
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  date: z.string().min(1, "Date is required"),
  pinned: z.boolean().optional(),
});

type CreateTodoFormData = z.infer<typeof createTodoSchema>;

export default function AddTodoForm({ open, onOpenChange }: AddTodoFormProps) {
  const createTodo = useCreateTodo();

  const form = useForm<CreateTodoFormData>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      description: "",
      priority: "MEDIUM" as Priority,
      date: new Date().toISOString().split("T")[0],
      pinned: false,
    },
  });

  const onSubmit = async (data: CreateTodoFormData) => {
    try {
      await createTodo.mutateAsync({
        ...data,
        date: new Date(data.date).toISOString(),
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
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
                onClick={handleClose}
              />
              <MButton
                type="submit"
                text={createTodo.isPending ? "Creating..." : "Create Todo"}
                isLoading={createTodo.isPending}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
