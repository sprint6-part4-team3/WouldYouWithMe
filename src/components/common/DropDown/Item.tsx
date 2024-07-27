/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { ReactNode } from "react";

interface DropDownItemProps {
  /** 드롭다운 메뉴 안 각 요소의 내용입니다.  */
  children: ReactNode;
  /** 드롭다운 메뉴 안 각 요소의 클릭 함수입니다. */
  onClick: () => void;
}

const DropDownItem = ({ children, onClick }: DropDownItemProps) => (
  <li
    className="cursor-pointer rounded-12 pb-11 pt-12 hover:bg-interaction-hover/10"
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    {children}
  </li>
);

export default DropDownItem;
