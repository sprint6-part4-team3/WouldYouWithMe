import { useState } from "react";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";

import DeleteTaskListModal from "./delete-todo-list-modal";
import EditTodoListModal from "./edit-todo-list-modal";

type TodoListDropDownProps = {
  groupId: number;
  id: number;
  name: string;
};

const TodoListDropDown = ({ groupId, id, name }: TodoListDropDownProps) => {
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
        <IconButton icon="IconKebab" variant="none" />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value} className="z-50">
        <DropDown.Item>
          <div onClick={openEditModal}>수정하기</div>
        </DropDown.Item>
        <DropDown.Item>
          <div onClick={openDeleteModal}>삭제하기</div>
        </DropDown.Item>
      </DropDown.Menu>
      {isDeleteModalOpen && (
        <DeleteTaskListModal
          onClose={closeDeleteModal}
          groupId={groupId}
          id={id}
          name={name}
        />
      )}
      {isEditModalOpen && (
        <EditTodoListModal
          onClose={closeEditModal}
          groupId={groupId}
          id={id}
          name={name}
        />
      )}
    </DropDown>
  );
};

export default TodoListDropDown;
