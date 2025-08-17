"use client";

import MButton from "@/components/MButton";
import MValidatedInput from "@/components/MValidatedInput";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/lib/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser, isRegistering, registerError } = useAuth();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            {registerError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {registerError.message ||
                  "Registration failed. Please try again."}
              </div>
            )}

            <div className="space-y-4">
              <MValidatedInput
                name="name"
                type="text"
                label="Full name"
                placeholder="Enter your full name"
                isRequired
              />

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
                placeholder="Create a password (min. 6 characters)"
                isRequired
              />
            </div>

            <div>
              <MButton
                type="submit"
                text={isRegistering ? "Creating account..." : "Create account"}
                isLoading={isRegistering}
                fullWidth
                className="w-full"
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
