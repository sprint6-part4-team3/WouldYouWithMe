"use client";

import { useState } from "react";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";
import { GroupTask } from "@/types/group";

import DeleteTaskListModal from "./delete-todo-list-modal";
import EditTodoListModal from "./edit-todo-list-modal";

type TodoListDropDownProps = {
  task: GroupTask;
};

const TodoListDropDown = ({ task }: TodoListDropDownProps) => {
  const { value, handleOff, handleToggle } = useToggle();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    handleOff();
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const openEditModal = () => {
    setIsEditModalOpen(true);
    handleOff();
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconButton
          name="할 일 목록 드롭다운 버튼"
          aria-label="할 일 목록 드롭다운 버튼"
          icon="IconKebab"
          variant="none"
        />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value} className="z-50">
        <DropDown.Item onClick={openEditModal}>
          <span>수정하기</span>
        </DropDown.Item>
        <DropDown.Item onClick={openDeleteModal}>
          <span>삭제하기</span>
        </DropDown.Item>
      </DropDown.Menu>
      {isDeleteModalOpen && (
        <DeleteTaskListModal onClose={closeDeleteModal} task={task} />
      )}
      {isEditModalOpen && (
        <EditTodoListModal onClose={closeEditModal} task={task} />
      )}
    </DropDown>
  );
};

export default TodoListDropDown;
