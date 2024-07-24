import React, { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  /** 버튼의 스타일 타입을 지정합니다. */
  variant: "primary" | "secondary";
  /** 버튼의 활성화 여부를 지정합니다. */
  isDisabled?: boolean;
  /** 버튼의 내용을 지정합니다. */
  children: React.ReactNode;
}

const Button = ({
  variant = "primary",
  isDisabled = false,
  children,
  ...props
}: ButtonProps) => {
  const baseStyle = "max-w-[400px] rounded-lg px-5 py-2";

  const variantStyles =
    variant === "secondary"
      ? "bg-red-300 hover:bg-red-400"
      : "bg-blue-300 hover:bg-blue-400";

  const disabledStyles = "bg-gray-300 cursor-not-allowed";

  const buttonClassName = isDisabled
    ? `${baseStyle} ${disabledStyles}`
    : `${baseStyle} ${variantStyles} cursor-pointer`;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  isDisabled: false,
};

export default Button;
