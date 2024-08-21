"use client";

/* eslint-disable no-console */
import { useParams } from "next/navigation";
import React, { useCallback, useState } from "react";

import { TaskDeleteModal } from "@/app/(list)/team/[teamId]/task-lists/[listId]/_components";
import DropDown from "@/components/common/drop-down/index";
import { useToggle } from "@/hooks";
import { IconKebab } from "@/public/assets/icons";

import TaskEditModal from "./task-edit";

interface TaskHeaderProps {
  taskName: string;
  taskDescription?: string;
  isCompleted: boolean;
}

const TaskHeader = ({
  taskName,
  taskDescription,
  isCompleted,
}: TaskHeaderProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const param = useParams();

  const {
    value: isDropdownOpen,
    handleOff: closeDropdown,
    handleToggle: toggleDropdown,
  } = useToggle();

  const closeEditTask = useCallback(() => {
    setIsEditTaskOpen(false);
  }, []);

  const handleEditClick = () => {
    closeDropdown();
    setIsEditTaskOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    closeDropdown();
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between text-18-600 text-text-primary">
        <span className={isCompleted ? "line-through" : ""}>{taskName}</span>
        <DropDown handleClose={closeDropdown}>
          <DropDown.Trigger onClick={toggleDropdown}>
            <IconKebab className="cursor-pointer" />
          </DropDown.Trigger>
          <DropDown.Menu isOpen={isDropdownOpen}>
            <DropDown.Item onClick={handleEditClick}>수정하기</DropDown.Item>
            <DropDown.Item onClick={handleOpenDeleteModal}>
              삭제하기
            </DropDown.Item>
          </DropDown.Menu>
        </DropDown>
      </div>
      {isDeleteModalOpen && (
        <TaskDeleteModal
          id={Number(param.id)}
          onClose={handleCloseDeleteModal}
        />
      )}
      {isEditTaskOpen && (
        <TaskEditModal
          name={taskName}
          description={taskDescription}
          done={isCompleted}
          closeEditTask={closeEditTask}
        />
      )}
    </>
  );
};

export default TaskHeader;
