import { clsx } from "clsx";
import { ComponentProps, ReactNode } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  /** 버튼의 스타일 타입을 지정합니다. */
  variant: "primary" | "secondary";
  /** 버튼의 활성화 여부를 지정합니다. */
  isDisabled?: boolean;
  /** 버튼의 내용을 지정합니다. */
  children: ReactNode;
}

const Button = ({
  variant = "primary",
  isDisabled = false,
  children,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    disabled={isDisabled}
    className={clsx("max-w-[400px] rounded-2xl px-5 py-2 text-lg-semibold", {
      "bg-interaction-inactive cursor-not-allowed": isDisabled,
      "bg-brand-primary hover:bg-interaction-hover active:bg-interaction-pressed":
        variant === "primary" && !isDisabled,
      "bg-red-300 hover:bg-red-400": variant === "secondary" && !isDisabled,
    })}
    {...props}
  >
    {children}
  </button>
);

export default Button;
