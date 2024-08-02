"use client";

import { DropDown } from "@/components/common";
import { useToggle } from "@/hooks";
import { IconKebab } from "@/public/assets/icons";

const CommentDropDown = () => {
  const { value, handleToggle, handleOff } = useToggle();
  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconKebab />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        <DropDown.Item>삭제하기</DropDown.Item>
        <DropDown.Item>수정하기</DropDown.Item>
      </DropDown.Menu>
    </DropDown>
  );
};

export default CommentDropDown;
