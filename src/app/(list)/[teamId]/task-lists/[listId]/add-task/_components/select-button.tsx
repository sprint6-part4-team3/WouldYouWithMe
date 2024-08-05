import { ComponentProps, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectButtonProp extends ComponentProps<"input"> {
  children: string;
  value: string | number;
  type: "radio" | "checkbox";
}

const SelectButton = forwardRef<HTMLInputElement, SelectButtonProp>(
  ({ children, value, type, id, ...rest }, ref) => {
    const a = 0;
    return (
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
          className="size-fit cursor-pointer rounded-12 bg-background-tertiary px-14 py-16 text-14-500 peer-checked:bg-brand-primary"
          htmlFor={id}
        >
          {children}
        </label>
      </div>
    );
  },
);

SelectButton.displayName = "SelectButton";

export default SelectButton;
