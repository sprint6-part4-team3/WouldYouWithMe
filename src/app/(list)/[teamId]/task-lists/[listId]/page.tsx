import Link from "next/link";
import React from "react";

import { IconPlusCurrent } from "@/public/assets/icons";
import { Task } from "@/types/task-list/index";

import { TaskListNav, TaskNav, TasksContainer } from "./_components";
import Calendar from "./_components/calendar";
import mockData from "./_components/mock.json";

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
      <TasksContainer
        currentTeamId={currentTeamId}
        currentListId={currentListId}
        initialTasks={mockData as Task[]}
      />
      <Link
        href={`/${currentTeamId}/task-lists/${currentListId}/add-task?date=${currentDate.toISOString()}`}
        className="group flex items-center gap-4 text-16-400 hover:text-brand-primary"
      >
        <IconPlusCurrent className="stroke-white group-hover:stroke-brand-primary" />
        할 일 추가
      </Link>
    </>
  );
};

export default TaskLists;
