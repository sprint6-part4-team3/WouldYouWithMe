"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface DropDownMenuProps {
  /** 드롭다운 메뉴 안에 포함될 내용입니다.  */
  children: ReactNode;
  /** 드롭다운 메뉴 open 여부입니다.  */
  isOpen: boolean;
  /** 드롭다운 메뉴 위치입니다. 기본값 top-30 right-0 */
  position?: string;
  className?: string;
}

const DropDownMenu = ({
  children,
  isOpen,
  position = "top-30 right-0",
  className,
}: DropDownMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={`${position} ${className} absolute z-10 w-120 overflow-hidden rounded-12 border border-border-primary bg-background-secondary text-text-primary shadow-md`}
        initial={{ opacity: 0, scale: 0.5, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -30 }}
      >
        <ul className="text-center">{children}</ul>
      </motion.div>
    )}
  </AnimatePresence>
);

export default DropDownMenu;
