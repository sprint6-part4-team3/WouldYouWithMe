import clsx from "clsx";
import React, { ComponentProps, forwardRef } from "react";

interface TextareaProps extends ComponentProps<"textarea"> {
  /** textarea id 속성입니다. name 속성도 동일하게 적용됩니다. */
  id: string;
  /** textarea placeholder 속성입니다. */
  placeholder: string;
  /** textarea error 여부입니다. */
  isError?: boolean;
  /** textarea 의 줄 수입니다. */
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, placeholder, isError = false, rows = 3, ...props }, ref) => (
    <textarea
      className={clsx(
        "w-full resize-none rounded-xl bg-background-secondary px-16 py-15 text-lg-regular text-text-primary outline-none ring-1",
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
