"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { SkeletonLoader } from "@/components/common";
import getTaskLists from "@/lib/api/task-lists/get-task-lists";

type TaskLists = {
  id: number;
  name: string;
}[];

const getPreviousTaskLists = (teamId: number): TaskLists => {
  const storedData = sessionStorage.getItem(`task-lists-${teamId}`);
  return storedData ? JSON.parse(storedData) : [{ id: 1, name: "Loading..." }];
};

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
  const currentButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (currentButtonRef.current) {
      currentButtonRef.current.scrollIntoView({
        behavior: "auto",
        inline: "center",
      });
    }
  }, [currentListId]);

  const {
    data: taskLists,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["task-lists", currentTeamId],
    queryFn: async () => {
      const data = await getTaskLists({ groupId: currentTeamId });
      sessionStorage.setItem(
        `task-lists-${currentTeamId}`,
        JSON.stringify(data),
      );
      return data;
    },
    placeholderData: () => getPreviousTaskLists(currentTeamId),
  });

  if (isLoading)
    return (
      <nav className="my-16 flex h-25 gap-12 md:mt-24">
        <SkeletonLoader className="h-full w-1/3 rounded-lg" />
        <SkeletonLoader className="h-full w-1/4 rounded-lg" />
        <SkeletonLoader className="h-full w-1/4 rounded-lg" />
        <SkeletonLoader className="h-full w-1/5 rounded-lg" />
        <SkeletonLoader className="h-full w-1/4 rounded-lg" />
      </nav>
    );

  if (error) throw new Error();
  if (!taskLists) throw new Error();

  return (
    <nav className="task-lists-nav my-16 flex h-25 w-full gap-12 overflow-x-auto md:mt-24">
      {taskLists.map((list) => (
        <button
          key={list.id}
          ref={list.id === current ? currentButtonRef : null}
          type="button"
          onClick={() => {
            setCurrent(list.id);
            router.push(
              `/team/${currentTeamId}/task-lists/${list.id}?date=${currentDate.toISOString()}`,
            );
          }}
          className={clsx(
            "h-full whitespace-nowrap text-16-500",
            current === list.id
              ? "border-b border-text-tertiary text-text-tertiary"
              : "text-text-default",
          )}
        >
          {list.name}
        </button>
      ))}
    </nav>
  );
};

export default TaskListNav;
