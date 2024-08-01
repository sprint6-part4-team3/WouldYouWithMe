/* eslint-disable no-console */

"use client";

import Link from "next/link";

import { DropDown } from "@/components/common";
import { useToggle } from "@/hooks";

interface TodoListCardProps {
  color?: "purple" | "blue" | "green" | "pink";
  children: string;
  link: string;
}

function getColorClass(color: TodoListCardProps["color"]) {
  if (color === "purple") return "bg-point-purple";
  if (color === "blue") return "bg-point-blue";
  if (color === "green") return "bg-point-green";
  if (color === "pink") return "bg-point-pink";
  return "bg-point-purple";
}

const TodoListDropDown = () => {
  const { value, handleOff, handleToggle } = useToggle();

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <span className="cursor-pointer text-16-700 text-gray-500">
          &nbsp;⋮&nbsp;
        </span>
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value} className="z-50">
        <DropDown.Item>수정하기</DropDown.Item>
        <DropDown.Item>삭제하기</DropDown.Item>
      </DropDown.Menu>
    </DropDown>
  );
};

const TodoListCard = ({ children, color, link }: TodoListCardProps) => {
  const colorClass = getColorClass(color);

  return (
    <div className="relative my-10 flex h-40 items-center rounded-12 bg-background-secondary px-24 text-16-500">
      <div className={`absolute left-0 h-40 w-12 rounded-l-12 ${colorClass}`} />
      <Link
        href={link}
        className="z-10 flex flex-1 items-center justify-between"
      >
        <span className="text-14-500">{children}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 rounded-full bg-background-primary px-8 py-4">
            {/* 임시 아이콘 */}
            <span>◎</span>
            <span className="text-14-400 text-brand-primary">5/5</span>
          </div>
        </div>
      </Link>
      <div className="absolute right-10">
        <TodoListDropDown />
      </div>
    </div>
  );
};

export default TodoListCard;
