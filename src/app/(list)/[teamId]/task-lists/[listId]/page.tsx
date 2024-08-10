import Link from "next/link";
import React from "react";

import getTasks from "@/lib/api/task-detail/get-tasks";
import getTaskLists from "@/lib/api/task-lists/get-task-lists";
import { IconPlusCurrent } from "@/public/assets/icons";

import { TaskListNav, TaskNav, TasksContainer } from "./_components";

interface TaskListProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const TaskLists = async ({ params, searchParams }: TaskListProps) => {
  let currentDate: Date;
  if (!searchParams.date) {
    currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
  } else {
    currentDate = new Date(searchParams.date);
    currentDate.setUTCHours(0, 0, 0, 0);
  }
  const currentListId = Number(params.listId);
  const currentTeamId = Number(params.teamId);

  // 투두 리스트 받아오기
  const tasksPromise = getTasks({
    groupId: currentTeamId,
    taskListId: currentListId,
    date: currentDate.toISOString(),
  });

  // 투두 종류 받아오기
  const taskListsPromise = getTaskLists({
    groupId: currentTeamId,
  });
  const [tasks, taskLists] = await Promise.all([
    tasksPromise,
    taskListsPromise,
  ]);

  return (
    <>
      <header className="mb-27">
        <h1 className="text-20-700 text-text-primary">할 일</h1>
      </header>
      <TaskNav currentDate={currentDate} />
      <TaskListNav
        currentTeamId={currentTeamId}
        currentDate={currentDate}
        currentListId={currentListId}
        taskLists={taskLists}
      />
      <TasksContainer
        currentTeamId={currentTeamId}
        currentListId={currentListId}
        initialTasks={tasks}
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
