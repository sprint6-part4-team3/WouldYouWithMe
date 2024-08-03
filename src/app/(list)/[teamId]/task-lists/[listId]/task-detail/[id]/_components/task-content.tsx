/* eslint-disable no-console */

"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { CheckButton } from "@/components/common";
import DropDown from "@/components/common/drop-down/index";
import useToggle from "@/hooks/use-toggle";
import {
  IconCalendar,
  IconCheckPrimary,
  IconKebab,
  IconProfile,
  IconRepeat,
  IconTime,
  IconX,
} from "@/public/assets/icons";

import CommentInput from "./comment-input";

dayjs.locale("ko");
interface TaskContentProps {
  task: {
    name: string;
    date: string;
    frequency: string;
    description: string;
    user: {
      nickname: string;
    };
  };
}

const TaskContent = ({ task }: TaskContentProps) => {
  const router = useRouter();
  const taskDate = dayjs(task.date);
  const formattedDate = taskDate.format("YYYY년 M월 D일");
  const formattedTime = taskDate.format("A h:mm");
  const {
    value: isDropdownOpen,
    handleToggle: toggleDropdown,
    handleOff: closeDropdown,
  } = useToggle();

  const [isCompleted, setIsCompleted] = useState(false);

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "DAILY":
        return "매일 반복";
      case "WEEKLY":
        return "매주 반복";
      case "MONTHLY":
        return "매월 반복";
      default:
        return "반복 없음";
    }
  };

  const handleToggleComplete = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div className="flex min-w-350 flex-col gap-16 p-12">
      <IconX className="mb-16 cursor-pointer" onClick={() => router.back()} />
      {isCompleted && (
        <div className="flex items-center gap-2 text-14-600 text-brand-primary">
          <IconCheckPrimary />
          <span>완료</span>
        </div>
      )}
      <div className="flex items-center justify-between text-18-600 text-text-primary">
        <span className={isCompleted ? "line-through" : ""}>{task.name}</span>
        <DropDown handleClose={closeDropdown}>
          <DropDown.Trigger onClick={toggleDropdown}>
            <IconKebab />
          </DropDown.Trigger>
          <DropDown.Menu isOpen={isDropdownOpen}>
            <DropDown.Item onClick={() => console.log("수정")}>
              수정하기
            </DropDown.Item>
            <DropDown.Item onClick={() => console.log("삭제")}>
              삭제하기
            </DropDown.Item>
          </DropDown.Menu>
        </DropDown>
      </div>
      <div className="flex flex-[1_0_0] items-center">
        <IconProfile className="mr-12" />
        <div className="flex flex-col gap-4">
          <div className="text-12-500 text-text-secondary">작성자</div>
          <div className="text-14-600 text-text-primary">
            {task.user.nickname}
          </div>
        </div>
        <time className="ml-auto text-14-400 text-text-secondary">
          {formattedDate}
        </time>
      </div>
      <div className="flex items-center text-12-400 text-text-default">
        <IconCalendar
          width={16}
          height={16}
          className="flex content-center items-center"
        />
        <time className="ml-6 mr-10 flex items-center">{formattedDate}</time>
        <span>|</span>
        <IconTime
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <time className="ml-6 mr-10 flex items-center">{formattedTime}</time>
        <span>|</span>
        <IconRepeat
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <span className="ml-6 flex items-center">
          {getFrequencyText(task.frequency)}
        </span>
      </div>
      <article className="overflow-wrap-anywhere min-h-200 whitespace-normal break-words text-14-400">
        {task.description}
        <div className="mt-150 flex justify-end">
          <CheckButton
            variant={isCompleted ? "white" : "primary"}
            onClick={handleToggleComplete}
          >
            {isCompleted ? "완료취소하기" : "완료하기"}
          </CheckButton>
        </div>
      </article>
      <CommentInput />
    </div>
  );
};

export default TaskContent;
