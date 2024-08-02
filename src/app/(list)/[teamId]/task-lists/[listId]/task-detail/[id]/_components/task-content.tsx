"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

import {
  IconCalendar,
  IconKebab,
  IconProfile,
  IconRepeat,
  IconTime,
  IconX,
} from "@/public/assets/icons";

import CommentInput from "./comment-input";

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

  return (
    <div className="flex flex-col gap-16 p-12">
      <IconX className="mb-16 cursor-pointer" onClick={() => router.back()} />
      <div className="flex items-center justify-between text-18-600 text-text-primary">
        {task.name}
        <IconKebab />
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
        <span className="ml-6 mr-10 flex items-center">{formattedTime}</span>
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
      <article className="overflow-wrap-anywhere mb-100 whitespace-normal break-words text-14-400">
        {task.description}
      </article>
      <CommentInput />
    </div>
  );
};

export default TaskContent;
