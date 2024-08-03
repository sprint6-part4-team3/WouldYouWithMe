"use client";

import { clsx } from "clsx";
import { ComponentProps, forwardRef, useState } from "react";

import { useToggle } from "@/hooks";
import { IconVisibilityOff, IconVisibilityOn } from "@/public/assets/icons";

interface InputProps extends ComponentProps<"input"> {
  /** input의 id 속성입니다. name 속성도 동일하게 적용됩니다. */
  id: string;
  /** input의 placeholder 속성입니다. */
  placeholder: string;
  /** input의 error 여부입니다. */
  isError?: boolean;
  /** input의 disabled 여부입니다. */
  isDisabled?: boolean;
  /** input 의 타입입니다. text, email, password */
  type?: "text" | "email" | "password";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      placeholder,
      isError = false,
      isDisabled = false,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    const { value: isVisible, handleToggle } = useToggle();

    const handleClickVisible = () => {
      handleToggle();
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password",
      );
    };

    return (
      <div className="relative">
        <input
          className={clsx(
            "w-full rounded-xl px-16 py-15 text-16-500 text-text-primary outline-none ring-1 transition-all duration-300",
            isError
              ? "is-error ring-0.5 ring-offset-0.5 ring-status-danger ring-offset-status-danger"
              : "focus:ring-0.5 focus:ring-offset-0.5 ring-border-primary focus:shadow-lg focus:outline-none focus:ring-brand-primary focus:ring-offset-brand-primary/10",
            isDisabled
              ? "cursor-not-allowed bg-background-tertiary opacity-70"
              : "bg-background-secondary",
          )}
          id={id}
          name={id}
          placeholder={placeholder}
          ref={ref}
          disabled={isDisabled}
          type={inputType}
          {...props}
        />
        {type === "password" && (
          <div
            className="absolute right-16 top-15 cursor-pointer"
            onClick={handleClickVisible}
            role="button"
            aria-label="Toggle password visibility"
            tabIndex={0}
          >
            {isVisible ? <IconVisibilityOn /> : <IconVisibilityOff />}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
