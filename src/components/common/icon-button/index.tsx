import { clsx } from "clsx";
import { ComponentProps } from "react";

import * as Icons from "@/public/assets/icons";

type IconType = keyof typeof Icons;
export const IconTypes: IconType[] = Object.keys(Icons) as IconType[];

interface IconButtonProps extends ComponentProps<"button"> {
  /** 아이콘 버튼 스타일 */
  variant?: "gray" | "darkest" | "bright" | "green" | "none";
  /** 사용 할 아이콘 */
  icon: IconType;
  /** 테두리 */
  isBorder?: boolean;
}

const IconButton = ({
  variant = "gray",
  isBorder = false,
  icon,
  ...props
}: IconButtonProps) => {
  const SVGIcon = Icons[icon];
  return (
    <button
      type="button"
      className={clsx(`rounded-full px-4 py-5`, {
        "bg-background-tertiary": variant === "gray",
        "bg-background-secondary": variant === "darkest",
        "bg-slate-500": variant === "bright",
        "bg-point-green": variant === "green",
        "": variant === "none",
        "border-2 border-background-primary": isBorder,
      })}
      {...props}
    >
      <SVGIcon className="m-auto" />
    </button>
  );
};

export default IconButton;
