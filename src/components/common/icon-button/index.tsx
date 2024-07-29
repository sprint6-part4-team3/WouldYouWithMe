import { clsx } from "clsx";
import { ComponentProps } from "react";

import * as Icons from "@/public/assets/icons";

type IconType = keyof typeof Icons;
export const IconTypes: IconType[] = Object.keys(Icons) as IconType[]; // 스토리에서 불러오기 위함

interface IconButtonProps extends ComponentProps<"button"> {
  /** 아이콘 버튼 스타일 */
  variant?: "gray" | "darkest" | "bright" | "green" | "none";
  /** 사용 할 아이콘 */
  icon: IconType;
  /** 테두리 */
  border?: boolean;
}

const IconButton = ({
  variant = "gray",
  border = false,
  icon,
  ...props
}: IconButtonProps) => {
  const SVGIcon = Icons[icon];
  return (
    <button
      type="button"
      className={clsx(
        `rounded-full px-4 py-5`,
        variant === "gray" && "bg-background-tertiary",
        variant === "darkest" && "bg-background-secondary",
        variant === "bright" && "bg-slate-500",
        variant === "green" && "bg-point-green",
        variant === "none" && "",
        border && "border-2 border-background-primary",
      )}
      {...props}
    >
      <SVGIcon className="m-auto" />
    </button>
  );
};

export default IconButton;
