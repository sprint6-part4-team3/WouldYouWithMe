"use client";

import { ComponentProps, forwardRef } from "react";

interface SelectButtonProp extends ComponentProps<"input"> {
  children: string;
  value: string | number;
  type: "radio" | "checkbox";
}

const SelectButton = forwardRef<HTMLInputElement, SelectButtonProp>(
  ({ children, value, type, id, ...rest }, ref) => (
    <div className="flex w-full items-center justify-center">
      <input
        id={id}
        className="peer hidden"
        type={type}
        value={value}
        ref={ref}
        {...rest}
      />
      <label
        className="flex size-65 cursor-pointer items-center justify-center rounded-12 bg-background-tertiary  peer-checked:bg-brand-primary"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  ),
);

SelectButton.displayName = "SelectButton";

export default SelectButton;
