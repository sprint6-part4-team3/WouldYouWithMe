import { ReactNode } from "react";

import useClickOutside from "@/hooks/useClickOutside";

import DropDownItem from "./Item";
import DropDownItemList from "./ItemList";
import DropDownTrigger from "./Trigger";

interface DropDownProps {
  /** 드롭다운 컴포넌트 안에 포함될 내용입니다. */
  children: ReactNode;
  /** 드롭다운 close 함수입니다. */
  handleClose: () => void;
}

const DropDown = ({ children, handleClose }: DropDownProps) => {
  const dropDownRef = useClickOutside(handleClose);

  return (
    <div ref={dropDownRef} className="relative">
      {children}
    </div>
  );
};

DropDown.Item = DropDownItem;
DropDown.ItemList = DropDownItemList;
DropDown.Trigger = DropDownTrigger;

export default DropDown;
