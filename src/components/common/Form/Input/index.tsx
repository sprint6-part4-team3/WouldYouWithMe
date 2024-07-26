import { clsx } from "clsx";
import React, { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  /** input의 id 속성입니다. name 속성도 동일하게 적용됩니다. */
  id: string;
  /** input의 placeholder 속성입니다. */
  placeholder: string;
  /** input의 error 여부입니다. */
  isError?: boolean;
  /** input의 disabled 여부입니다. */
  isDisabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, placeholder, isError = false, isDisabled = false, ...props }, ref) => (
    <input
      className={clsx(
        "w-full rounded-xl px-16 py-15 text-text-primary outline-none ring-1",
        isError
          ? "ring-status-danger"
          : "ring-border-primary focus:ring-brand-primary",
        isDisabled
          ? "cursor-not-allowed bg-background-tertiary opacity-70"
          : "bg-background-secondary",
      )}
      id={id}
      name={id}
      placeholder={placeholder}
      ref={ref}
      disabled={isDisabled}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export default Input;
