"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DropDown } from "@/components/common";
import { useToggle } from "@/hooks";
import { IconKebab } from "@/public/assets/icons";

const BoardDropDown = () => {
  const { value, handleOff, handleToggle } = useToggle();

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconKebab className="mt-6 cursor-pointer" />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        <DropDown.Item>삭제하기</DropDown.Item>
        <Link href={`${usePathname()}/edit`}>
          <DropDown.Item>수정하기</DropDown.Item>
        </Link>
      </DropDown.Menu>
    </DropDown>
  );
};

export default BoardDropDown;
