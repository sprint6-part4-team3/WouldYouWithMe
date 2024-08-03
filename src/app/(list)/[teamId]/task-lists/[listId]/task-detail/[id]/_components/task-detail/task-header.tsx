/* eslint-disable no-console */

import React from "react";

import DropDown from "@/components/common/drop-down/index";
import { IconKebab } from "@/public/assets/icons";

interface TaskHeaderProps {
  taskName: string;
  isCompleted: boolean;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
}

const TaskHeader = ({
  taskName,
  isCompleted,
  isDropdownOpen,
  toggleDropdown,
  closeDropdown,
}: TaskHeaderProps) => (
  <div className="flex items-center justify-between text-18-600 text-text-primary">
    <span className={isCompleted ? "line-through" : ""}>{taskName}</span>
    <DropDown handleClose={closeDropdown}>
      <DropDown.Trigger onClick={toggleDropdown}>
        <IconKebab />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={isDropdownOpen}>
        <DropDown.Item onClick={() => console.log("수정")}>
          수정하기
        </DropDown.Item>
        <DropDown.Item onClick={() => console.log("삭제")}>
          삭제하기
        </DropDown.Item>
      </DropDown.Menu>
    </DropDown>
  </div>
);

export default TaskHeader;
