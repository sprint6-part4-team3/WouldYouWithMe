import { clsx } from "clsx";
import { ComponentProps } from "react";

import * as Icons from "@/public/assets/icons";

type IconType = keyof typeof Icons;
export const iconTypes: IconType[] = Object.keys(Icons) as IconType[]; // 스토리에서 불러오기 위함

interface IconButtonProps extends ComponentProps<"button"> {
  /** 아이콘 버튼의 스타일 타입. */
  variant?: "gray" | "darkest" | "bright" | "green" | "none";
  /** 사용 할 아이콘 타입 */
  icon: IconType;
  /** 테두리 */
  border?: boolean;
  /** 테두리 색상 */
  borderColorName?: string;
}

const IconButton = ({
  variant = "gray",
  border = false,
  icon,
  borderColorName,
  ...props
}: IconButtonProps) => {
  const SVGIcon = Icons[icon];
  return (
    <button
      type="button"
      className={clsx(
        `rounded-full px-3 py-4`,
        variant === "gray" && "bg-background-tertiary",
        variant === "darkest" && "bg-background-secondary",
        variant === "bright" && "bg-background-primary",
        variant === "green" && "bg-point-green",
        variant === "none" && "",
        border && `border-[${borderColorName}] border-2`,
      )}
      {...props}
    >
      <SVGIcon />
    </button>
  );
};

export default IconButton;
