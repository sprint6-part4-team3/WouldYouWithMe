import Link from "next/link";
import React from "react";

import TaskListNav from "./_components/task-lists-nav";
import TaskNav from "./_components/task-nav";
import TasksContainer from "./_components/tasks-container";

interface TaskListProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const TaskLists = ({ params, searchParams }: TaskListProps) => {
  let currentDate: Date;
  if (!searchParams.date) {
    currentDate = new Date();
  } else {
    currentDate = new Date(searchParams.date);
  }
  const currentListId = Number(params.listId);
  const currentTeamId = Number(params.teamId);

  return (
    <>
      <TaskNav currentDate={currentDate} />
      <TaskListNav
        currentTeamId={currentTeamId}
        currentDate={currentDate}
        currentListId={currentListId}
      />
      <TasksContainer tasks={[]} />
      <Link
        href={`/${currentTeamId}/task-lists/${currentListId}/create-task?date=${searchParams.date}`}
        className="text-16-400 hover:text-brand-primary"
      >
        <span className="leading-0">+ </span>
        <span className="">할 일 추가</span>
      </Link>
    </>
  );
};

export default TaskLists;
