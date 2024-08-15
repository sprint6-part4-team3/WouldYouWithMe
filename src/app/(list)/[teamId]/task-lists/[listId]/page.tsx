import Link from "next/link";
import { Suspense } from "react";

import Loading from "@/components/loading";
import getTaskLists from "@/lib/api/task-lists/get-task-lists";
import getTasks from "@/lib/api/task-lists/get-tasks";
import { IconPlusCurrent } from "@/public/assets/icons";

import { TaskListNav, TaskNav, TasksContainer } from "./_components";

interface TaskListProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const TaskLists = async ({ params, searchParams }: TaskListProps) => {
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

  const currentListId = Number(params.listId);
  const currentTeamId = Number(params.teamId);

  const [tasks, taskLists] = await Promise.all([
    getTasks({
      groupId: currentTeamId,
      taskListId: currentListId,
      date: currentDate.toISOString(),
    }),
    getTaskLists({
      groupId: currentTeamId,
    }),
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

const TaskListWrapper = (props: TaskListProps) => {
  const { searchParams } = props;
  const { params } = props;
  const key = `${params}/${searchParams.date}`;
  return (
    <Suspense key={key} fallback={<Loading />}>
      <TaskLists {...props} />
    </Suspense>
  );
};

export default TaskListWrapper;
