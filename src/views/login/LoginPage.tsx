"use client";

import MButton from "@/components/MButton";
import MValidatedInput from "@/components/MValidatedInput";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/lib/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoggingIn, loginError } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      console.error("Login failed:", error);
      // Error is handled by the hook
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {loginError.message || "Login failed. Please try again."}
              </div>
            )}

            <div className="space-y-4">
              <MValidatedInput
                name="email"
                type="email"
                label="Email address"
                placeholder="Enter your email"
                isRequired
              />

              <MValidatedInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                isRequired
              />
            </div>

            <div>
              <MButton
                type="submit"
                text={isLoggingIn ? "Signing in..." : "Sign in"}
                isLoading={isLoggingIn}
                fullWidth
                className="w-full"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
