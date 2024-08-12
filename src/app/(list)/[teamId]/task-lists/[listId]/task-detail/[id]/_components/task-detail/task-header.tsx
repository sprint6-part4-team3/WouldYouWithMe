/* eslint-disable no-console */
import React from "react";

import DropDown from "@/components/common/drop-down/index";
import { IconKebab } from "@/public/assets/icons";

interface TaskHeaderProps {
  taskName: string;
  isCompleted: boolean;
  dropdownUseToggle: {
    value: boolean;
    handleToggle: () => void;
    handleOff: () => void;
  };
}

const TaskHeader = ({
  taskName,
  isCompleted,
  dropdownUseToggle: { value: isDropdownOpen, handleToggle, handleOff },
}: TaskHeaderProps) => (
  <div className="mt-10 flex items-center justify-between text-18-600 text-text-primary">
    <span className={isCompleted ? "line-through" : ""}>{taskName}</span>
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconKebab className="cursor-pointer" />
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
