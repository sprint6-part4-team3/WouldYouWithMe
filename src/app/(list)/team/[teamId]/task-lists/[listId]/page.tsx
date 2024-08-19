import Link from "next/link";
import { Suspense } from "react";

import PageLoading from "@/components/loading";
import { IconPlusCurrent } from "@/public/assets/icons";

import {
  TaskCurrent,
  TaskDateNav,
  TaskListNav,
  TasksSkeleton,
} from "./_components";

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
        fallback={<TasksSkeleton />}
      >
        <TaskCurrent
          currentDate={currentDate}
          currentListId={currentListId}
          currentTeamId={currentTeamId}
        />
        {showAddButton && (
          <Link
            href={`/team/${currentTeamId}/task-lists/${currentListId}/add-task?date=${currentDate.toISOString()}`}
          >
            <div className="group flex h-72 items-center gap-4 rounded-16 border-4 border-dotted border-background-tertiary px-16 text-16-400 hover:bg-background-secondary/50 hover:text-brand-primary">
              <IconPlusCurrent className="stroke-white group-hover:stroke-brand-primary" />
              할 일 추가
            </div>
          </Link>
        )}
      </Suspense>
    </>
  );
};

export default TaskLists;
