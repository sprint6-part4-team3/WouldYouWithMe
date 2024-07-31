import Link from "next/link";
import React from "react";

interface TaskListNavProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
}

const TaskListNav = ({
  currentTeamId,
  currentDate,
  currentListId,
}: TaskListNavProps) => {
  const taskLists = [
    {
      name: "법인 설립",
      id: 0,
    },
    {
      name: "법인 등기",
      id: 1,
    },
    {
      name: "정기 추종",
      id: 2,
    },
    {
      name: "기타",
      id: 3,
    },
  ];
  // @todo 여기서 api 쏴서 task list들 가져와야 함
  // 그리고 여 밑에 map 돌리기
  // 그리고 스와이퍼 넣기
  const stringCurrentDate = currentDate.toISOString();
  return (
    <nav className="flex h-25 gap-12">
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
