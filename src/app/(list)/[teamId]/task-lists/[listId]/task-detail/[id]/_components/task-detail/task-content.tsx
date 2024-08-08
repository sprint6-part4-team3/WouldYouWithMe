"use client";

import "dayjs/locale/ko";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useToggle } from "@/hooks";
import { IconCheckPrimary, IconX } from "@/public/assets/icons";
import { TaskDetailData } from "@/types/task-detail/index";

import CommentInput from "../comments/comment-input";
import TaskDescription from "./task-description";
import TaskHeader from "./task-header";
import TaskInfo from "./task-info";

dayjs.locale("ko");

interface TaskContentProps {
  task: TaskDetailData;
}

const TaskContent = ({ task }: TaskContentProps) => {
  const taskDate = dayjs(task.date);
  const {
    value: isDropdownOpen,
    handleToggle: toggleDropdown,
    handleOff: closeDropdown,
  } = useToggle();
  const [isCompleted, setIsCompleted] = useState(task.doneAt !== null);

  const handleToggleComplete = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div className="flex min-w-350 flex-col gap-16">
      {isCompleted && (
        <div className="flex items-center gap-2 text-14-600 text-brand-primary">
          <IconCheckPrimary />
          <span>완료</span>
        </div>
      )}
      <TaskHeader
        taskName={task.name}
        isCompleted={isCompleted}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
      />
      <TaskInfo
        nickname={task.user.nickname}
        date={taskDate.format("YYYY년 M월 D일")}
        time={taskDate.format("A h:mm")}
        frequency={task.frequency}
      />
      <TaskDescription
        description={task.description}
        isCompleted={isCompleted}
        onToggleComplete={handleToggleComplete}
      />
      <CommentInput />
    </div>
  );
};

export default TaskContent;
