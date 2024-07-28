/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DropDownItemProps {
  /** 드롭다운 메뉴 안 각 요소의 내용입니다.  */
  children: ReactNode;
  /** 드롭다운 메뉴 안 각 요소의 클릭 함수입니다. */
  onClick: () => void;
}

const DropDownItem = ({ children, onClick }: DropDownItemProps) => (
  <motion.li
    whileHover={{ backgroundColor: "rgba(30, 162, 181, 0.2)" }}
    whileTap={{ scale: 0.9, backgroundColor: "rgba(25, 140, 160, 0.2)" }}
    className="cursor-pointer rounded-12 pb-11 pt-12"
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    {children}
  </motion.li>
);

export default DropDownItem;
