import { ComponentProps, forwardRef } from "react";

interface SelectButtonProp extends ComponentProps<"input"> {
  children: string;
  value: string;
  type: "radio" | "checkbox";
}

const SelectButton = ({
  children,
  value,
  type,
  id,
  ...rest
}: SelectButtonProp) => {
  const a = 0;
  return (
    <div>
      <input
        id={id}
        className="peer hidden"
        type={type}
        value={value}
        {...rest}
      />
      <label
        className="size-fit cursor-pointer rounded-12 bg-background-tertiary px-14 py-16 peer-checked:bg-brand-primary"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
};

export default SelectButton;
