import Link from "next/link";
import { Suspense } from "react";

import { IconPlusCurrent } from "@/public/assets/icons";

import {
  TaskCurrent,
  TaskDateNav,
  TaskListNav,
  TasksSkeleton,
} from "./_components";

const getMidnightKoreanTime = () => {
  const koreaOffset = 9 * 60;
  const now = new Date();
  const koreanDate = new Date(
    now.getTime() + (koreaOffset - now.getTimezoneOffset()) * 60 * 1000,
  );
  const currentDate = new Date(koreanDate.getTime() - koreaOffset * 60 * 1000);
  currentDate.setUTCHours(0, 0, 0, 0);

  return currentDate;
};

const generateTaskAddLink = (teamId: number, listId: number, date: Date) =>
  `/team/${teamId}/task-lists/${listId}/add-task?date=${date.toISOString()}`;

interface TaskListProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const TaskLists = ({ params, searchParams }: TaskListProps) => {
  const currentListId = Number(params.listId);
  const currentTeamId = Number(params.teamId);
  const currentDate = searchParams.date
    ? new Date(searchParams.date)
    : getMidnightKoreanTime();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const isVisibleAddButton = currentDate >= today;

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
        {isVisibleAddButton && (
          <Link
            href={generateTaskAddLink(
              currentTeamId,
              currentListId,
              currentDate,
            )}
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
