"use client";

import { DropDown } from "@/components/common";
import { useToggle } from "@/hooks";
import { IconKebab } from "@/public/assets/icons";

import CommentDeleteModal from "./comment-delete-modal";

interface CommentDropDownProps {
  commentId: number;
  setIsEditMode: (id: number | null) => void;
}

const CommentDropDown = ({
  commentId,
  setIsEditMode,
}: CommentDropDownProps) => {
  const { value, handleToggle, handleOff } = useToggle();
  const {
    value: modalIsOpen,
    handleOn: modalOn,
    handleOff: modalOff,
  } = useToggle();

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconKebab className="mt-4 cursor-pointer items-center" />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        <DropDown.Item
          onClick={() => {
            modalOn();
            handleOff();
          }}
        >
          삭제하기
        </DropDown.Item>
        <DropDown.Item onClick={() => setIsEditMode(commentId)}>
          수정하기
        </DropDown.Item>
      </DropDown.Menu>
      {modalIsOpen && (
        <CommentDeleteModal commentId={commentId} onClose={modalOff} />
      )}
    </DropDown>
  );
};

export default CommentDropDown;
