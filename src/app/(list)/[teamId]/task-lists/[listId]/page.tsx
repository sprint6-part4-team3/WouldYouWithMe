import Link from "next/link";
import { Suspense } from "react";

import PageLoading from "@/components/loading";
import { IconPlusCurrent } from "@/public/assets/icons";

import { TaskCurrent, TaskDateNav, TaskListNav } from "./_components";

interface TaskListProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const TaskLists = ({ params, searchParams }: TaskListProps) => {
  const currentListId = Number(params.listId);
  const currentTeamId = Number(params.teamId);
  let currentDate: Date;
  if (!searchParams.date) {
    const koreaOffset = 9 * 60;
    const now = new Date();
    const koreanDate = new Date(
      now.getTime() + (koreaOffset - now.getTimezoneOffset()) * 60 * 1000,
    );
    currentDate = new Date(koreanDate.getTime() - koreaOffset * 60 * 1000);
    currentDate.setUTCHours(0, 0, 0, 0);
  } else {
    currentDate = new Date(searchParams.date);
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const showAddButton = currentDate >= today;

  return (
    <>
      <header className="mb-27">
        <h1 className="text-20-700 text-text-primary">할 일</h1>
      </header>
      <TaskDateNav currentDate={currentDate} currentTeamId={currentTeamId} />
      <TaskListNav
        currentTeamId={currentTeamId}
        currentDate={currentDate}
        currentListId={currentListId}
      />
      <Suspense
        key={`${currentListId}/${currentDate}`}
        fallback={<PageLoading />}
      >
        <TaskCurrent
          currentDate={currentDate}
          currentListId={currentListId}
          currentTeamId={currentTeamId}
        />
      </Suspense>
      {showAddButton && (
        <Link
          href={`/${currentTeamId}/task-lists/${currentListId}/add-task?date=${currentDate.toISOString()}`}
          className="group flex items-center gap-4 text-16-400 hover:text-brand-primary"
        >
          <IconPlusCurrent className="stroke-white group-hover:stroke-brand-primary" />
          할 일 추가
        </Link>
      )}
    </>
  );
};

export default TaskLists;
