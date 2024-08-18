"use client";

import { useQuery } from "@tanstack/react-query";

import getTasks from "@/lib/api/task-lists/get-tasks";

import TaskCard from "./task-card";

interface TasksProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
}

const TasksContainer = ({
  currentTeamId,
  currentDate,
  currentListId,
}: TasksProps) => {
  const stringCurrentDate = currentDate.toISOString();
  const { data: tasks } = useQuery({
    queryKey: ["tasks", currentTeamId, currentListId, stringCurrentDate],
    queryFn: () =>
      getTasks({
        groupId: currentTeamId,
        taskListId: currentListId,
        date: stringCurrentDate,
      }),
  });
  if (!tasks) throw new Error();
  if (tasks?.length === 0) {
    return (
      <article className="mb-16 flex w-full flex-col gap-10 rounded-lg bg-background-secondary px-14 py-12">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2>할 일을 추가해 주세요</h2>
          </div>
        </div>
      </article>
    );
  }
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          name={task.name}
          date={task.date}
          frequency={task.frequency}
          initialIsCompleted={task.doneAt !== null}
        />
      ))}
    </div>
  );
};

export default TasksContainer;
