"use client";

import Link from "next/link";

import { DropDown } from "@/components/common";
import { useToggle } from "@/hooks";
import { IconKebab } from "@/public/assets/icons";

import BoardDeleteModal from "./board-delete-modal";

const BoardDropDown = ({ boardId }: { boardId: number }) => {
  const { value, handleOff, handleToggle } = useToggle();
  const {
    value: modalIsOpen,
    handleOn: modalOn,
    handleOff: modalOff,
  } = useToggle();

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconKebab className="mt-6 cursor-pointer" />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        <Link href={`${boardId}/edit`} prefetch>
          <DropDown.Item>수정하기</DropDown.Item>
        </Link>
        <DropDown.Item
          onClick={() => {
            modalOn();
            handleOff();
          }}
        >
          삭제하기
        </DropDown.Item>
      </DropDown.Menu>
      {modalIsOpen && <BoardDeleteModal boardId={boardId} onClose={modalOff} />}
    </DropDown>
  );
};

export default BoardDropDown;
