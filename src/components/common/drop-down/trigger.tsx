"use client";

import { ReactNode } from "react";

interface DropDownTriggerProps {
  /** 드롭다운을 트리거할 요소를 포함될 내용입니다.  */
  children: ReactNode;
  /** 드롭다운을 트리거할 요소의 클릭 함수입니다.  */
  onClick: () => void;
}

const DropDownTrigger = ({ children, onClick }: DropDownTriggerProps) => (
  <button
    type="button"
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Escape") {
        onClick();
      }
    }}
  >
    {children}
  </button>
);

export default DropDownTrigger;
