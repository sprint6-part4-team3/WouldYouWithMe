import Link from "next/link";
import React from "react";

interface TaskListNavProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
  taskLists: {
    id: number;
    name: string;
  }[];
}

const TaskListNav = ({
  currentTeamId,
  currentDate,
  currentListId,
  taskLists,
}: TaskListNavProps) => {
  // 그리고 여 밑에 map 돌리기
  // 그리고 스와이퍼 넣기
  const stringCurrentDate = currentDate.toISOString();
  return (
    <nav className="my-16 flex h-25 gap-12 md:mt-24">
      {taskLists.map((list) => (
        <Link
          key={list.id}
          href={`/${currentTeamId}/task-lists/${list.id}?date=${stringCurrentDate}`}
          className={`${
            currentListId === list.id
              ? "border-b border-text-tertiary text-16-500 text-text-tertiary"
              : "text-16-500 text-text-default"
          }`}
        >
          {list.name}
        </Link>
      ))}
    </nav>
  );
};

export default TaskListNav;
