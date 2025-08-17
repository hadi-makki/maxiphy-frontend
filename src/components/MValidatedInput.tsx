import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { MInput } from "./MInput";

interface ValidatedInputProps extends React.ComponentPropsWithoutRef<"input"> {
  disabled?: boolean;
  name: string;
  label?: string;
  labelClassName?: string;
  renderInput?: React.ReactElement | null;
  icon?: React.ReactElement;
  inputSize?: "sm" | "md" | "lg";
  rounded?: string;
  border?: string;
  shadow?: string;
  button?: React.ReactNode;
  isRequired?: boolean;
  description?: string;
  fullRounded?: boolean;
  variant?: "default" | "floating";
}

function MValidatedInput({
  disabled,
  name,
  label,
  renderInput,
  icon,
  fullRounded = false,
  ...rest
}: ValidatedInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        if (renderInput) {
          return renderInput;
        }
        return (
          <FormItem>
            <FormControl>
              <div className="relative w-full">
                {/* Wrapper for input and icon */}
                <MInput
                  placeholder={
                    rest.placeholder || `Enter ${label?.toLowerCase()}...`
                  }
                  label={label}
                  disabled={disabled}
                  className={cn(
                    "pr-10 ",
                    fullRounded ? "rounded-full" : "rounded-md",
                    rest.className
                  )}
                  {...rest}
                  {...field}
                  value={field.value || ""}
                />
                {icon && (
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    {icon}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default MValidatedInput;
