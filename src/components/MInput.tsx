import * as React from "react";
import { cn } from "@/lib/utils";
import { FormLabel } from "./ui/form";

const sizeClasses = {
  sm: "px-2  text-sm h-[2rem]",
  md: "px-3 text-base h-[2.5rem]",
  lg: "px-4  text-base h-[3.5rem]",
};

const labelSizeClasses = {
  sm: "text-xs mb-2 ",
  md: "text-base mb-2 ",
  lg: "text-sm font-medium mb-2 ",
};

function MInput({
  className,
  type,
  inputSize = "md",
  label,
  labelClassName,
  rounded = "md",
  border = "border",
  shadow = "shadow-xs",
  button,
  labelButton,
  isRequired = false,
  description,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  inputSize?: "sm" | "md" | "lg";
  label?: string;
  labelClassName?: string;
  rounded?: string;
  border?: string;
  shadow?: string;
  button?: React.ReactNode;
  labelButton?: React.ReactNode;
  isRequired?: boolean;
  description?: string;
}) {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        {label && (
          <FormLabel
            className={cn("block", labelSizeClasses[inputSize], labelClassName)}
          >
            {label} {isRequired && <span className="text-destructive">*</span>}
          </FormLabel>
        )}
        {labelButton && labelButton}
      </div>
      {description && (
        <p className="text-light-gray-color mb-4  text-sm">{description}</p>
      )}
      <div className="relative">
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-base placeholder:text-muted-foreground placeholder:font-light selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex w-full min-w-0 bg-transparent transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium",
            `rounded-${rounded}`,
            border,
            shadow,
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            sizeClasses[inputSize],
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:text-muted-foreground disabled:bg-muted",
            className
          )}
          {...props}
        />
        {button && (
          <div className="absolute inset-y-0 right-3 top-0 bottom-0 flex items-center">
            {button}
          </div>
        )}
      </div>
    </div>
  );
}

export { MInput };
