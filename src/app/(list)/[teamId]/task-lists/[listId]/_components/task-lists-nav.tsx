"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import getTaskLists from "@/lib/api/task-lists/get-task-lists";

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
  const router = useRouter();
  const [current, setCurrent] = useState(currentListId);

  const {
    data: taskLists,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["task-lists", currentTeamId],
    queryFn: () => getTaskLists({ groupId: currentTeamId }),
    placeholderData: keepPreviousData,
  });

  if (error) throw new Error();
  if (isLoading) return <nav className="my-16 flex h-25 gap-12 md:mt-24" />;
  if (!taskLists) throw new Error();

  return (
    <nav className="my-16 flex h-25 gap-12 md:mt-24">
      {taskLists.map((list) => (
        <button
          key={list.id}
          type="button"
          onClick={() => {
            setCurrent(list.id);
            router.push(
              `/${currentTeamId}/task-lists/${list.id}?date=${currentDate.toISOString()}`,
            );
          }}
          className={`${
            current === list.id
              ? "border-b border-text-tertiary text-16-500 text-text-tertiary"
              : "text-16-500 text-text-default"
          }`}
        >
          {list.name}
        </button>
      ))}
    </nav>
  );
};

export default TaskListNav;
