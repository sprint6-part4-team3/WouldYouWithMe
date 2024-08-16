/* eslint-disable no-console */
import React, { useState } from "react";

import DropDown from "@/components/common/drop-down/index";
import { IconKebab } from "@/public/assets/icons";

import TaskDeleteModal from "./task-delete-modal";

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
}: TaskHeaderProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    handleOff();
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between text-18-600 text-text-primary">
        <span className={isCompleted ? "line-through" : ""}>{taskName}</span>
        <DropDown handleClose={handleOff}>
          <DropDown.Trigger onClick={handleToggle}>
            <IconKebab className="cursor-pointer" />
          </DropDown.Trigger>
          <DropDown.Menu isOpen={isDropdownOpen}>
            <DropDown.Item onClick={() => console.log("수정")}>
              수정하기
            </DropDown.Item>
            <DropDown.Item onClick={handleOpenDeleteModal}>
              삭제하기
            </DropDown.Item>
          </DropDown.Menu>
        </DropDown>
      </div>
      {isDeleteModalOpen && (
        <TaskDeleteModal onClose={handleCloseDeleteModal} />
      )}
    </>
  );
};

export default TaskHeader;
