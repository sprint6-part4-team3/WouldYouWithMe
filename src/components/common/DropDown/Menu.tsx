import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface DropDownMenuProps {
  /** 드롭다운 메뉴 안에 포함될 내용입니다.  */
  children: ReactNode;
  /** 드롭다운 메뉴 open 여부입니다.  */
  isOpen: boolean;
  /** 드롭다운 메뉴 위치입니다. 기본값 top-30 right-0 */
  position?: string;
}

const DropDownMenu = ({
  children,
  isOpen,
  position = "top-30 right-0",
}: DropDownMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className={`${position} absolute z-10 w-120 flex-col overflow-hidden rounded-12 border border-border-primary bg-background-secondary text-text-primary shadow-md`}
        initial={{ opacity: 0, scale: 0.5, x: 20, y: -50 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, x: 20, y: -50 }}
      >
        <ul className="text-center">{children}</ul>
      </motion.div>
    )}
  </AnimatePresence>
);

export default DropDownMenu;
