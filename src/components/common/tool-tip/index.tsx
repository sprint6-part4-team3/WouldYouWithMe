"use client";

import clsx from "clsx";
import { ReactNode, useState } from "react";

interface ToolTipProps {
  /** 툴팁 트리거할 요소 */
  children: ReactNode;
  /** 툴팁 메시지 */
  message: string;
  /** 툴팁 위치 */
  position?: "top" | "right" | "bottom" | "left";
}

const ToolTip = ({ children, message, position = "top" }: ToolTipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className={clsx(
          "absolute z-50 w-max rounded-md bg-background-tertiary px-10 py-6 text-12-500 text-text-primary opacity-0 transition-opacity duration-300 ease-in-out",
          {
            "bottom-full left-1/2 mb-8 -translate-x-1/2": position === "top",
            "top-full left-1/2 mt-8 -translate-x-1/2": position === "bottom",
            "left-full top-1/2 ml-8 -translate-y-1/2": position === "right",
            "right-full top-1/2 mr-8 -translate-y-1/2": position === "left",
            "opacity-80": isVisible,
          },
        )}
      >
        {message}
      </div>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
    </div>
  );
};

export default ToolTip;
