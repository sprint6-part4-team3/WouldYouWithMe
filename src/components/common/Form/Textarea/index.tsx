import clsx from "clsx";
import React, { ComponentProps, forwardRef } from "react";

interface TextareaProps extends ComponentProps<"textarea"> {
  /** input의 id 속성입니다. name 속성도 동일하게 적용됩니다. */
  id: string;
  /** input의 placeholder 속성입니다. */
  placeholder: string;
  /** input의 error 여부입니다. */
  isError?: boolean;
  /** textarea 의 줄 수입니다. */
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, placeholder, isError = false, rows = 2, ...props }, ref) => (
    <textarea
      className={clsx(
        "w-full rounded-xl bg-background-secondary px-16 py-15 text-text-primary outline-none ring-1",
        isError
          ? "ring-status-danger"
          : "ring-border-primary focus:ring-brand-primary",
      )}
      id={id}
      name={id}
      placeholder={placeholder}
      rows={rows}
      ref={ref}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";

export default Textarea;
