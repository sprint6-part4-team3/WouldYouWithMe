import { useState } from "react";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";
import { GroupTask } from "@/types/group";

import DeleteTaskListModal from "./delete-todo-list-modal";
import EditTodoListModal from "./edit-todo-list-modal";

type TodoListDropDownProps = {
  task: GroupTask;
  onEditTask: (newTask: GroupTask) => void;
  onDeleteTask: (newTask: GroupTask) => void;
};

const TodoListDropDown = ({
  task,
  onEditTask,
  onDeleteTask,
}: TodoListDropDownProps) => {
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
          task={task}
          onDeleteTask={onDeleteTask}
        />
      )}
      {isEditModalOpen && (
        <EditTodoListModal
          onClose={closeEditModal}
          task={task}
          onEditTask={onEditTask}
        />
      )}
    </DropDown>
  );
};

export default TodoListDropDown;
