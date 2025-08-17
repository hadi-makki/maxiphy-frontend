import { cn } from "@/lib/utils";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import BBLoader from "./MLoader";

type Props = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    fullWidth?: boolean;
  } & {
    text: string;
    className?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    isGradient?: boolean;
    noBg?: boolean;
    isLoading?: boolean;
    isRounded?: boolean;
  };

function MButton({
  fullWidth,
  text,
  className,
  startIcon,
  endIcon,
  noBg,
  isLoading,
  isRounded,

  ...props
}: Props) {
  return (
    <Button
      className={cn(
        className,
        fullWidth ? "flex items-center justify-center gap-3" : "",
        noBg ? "bg-transparent" : "",
        isLoading ? "relative" : "",
        isRounded ? "rounded-full" : "",
        "transition-transform duration-100 active:scale-95"
      )}
      fullWidth={fullWidth}
      {...props}
    >
      <div
        className={cn(
          isLoading ? "opacity-0" : "opacity-100",
          "flex items-center justify-center gap-2 text-sm"
        )}
      >
        {startIcon && startIcon}
        {text}
        {endIcon && endIcon}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BBLoader />
        </div>
      )}
    </Button>
  );
}

export default MButton;
