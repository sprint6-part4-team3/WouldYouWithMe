"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import getTaskLists from "@/lib/api/task-lists/get-task-lists";

type TaskLists = {
  id: number;
  name: string;
}[];

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
  const [placeholder, setPlaceholder] = useState<TaskLists>([
    { id: 0, name: "Loading" },
  ]);

  useEffect(() => {
    if (currentButtonRef.current) {
      currentButtonRef.current.scrollIntoView({
        behavior: "auto",
        inline: "center",
      });
    }
  }, []);

  useEffect(() => {
    const storedData = sessionStorage.getItem(`task-lists-${currentTeamId}`);
    const newPlaceholderData = storedData ? JSON.parse(storedData) : [];
    setPlaceholder(newPlaceholderData);
  }, [currentTeamId]);

  const { data: taskLists, error } = useQuery({
    queryKey: ["task-lists", currentTeamId],
    queryFn: async () => {
      const data = await getTaskLists({ groupId: currentTeamId });
      sessionStorage.setItem(
        `task-lists-${currentTeamId}`,
        JSON.stringify(data),
      );
      return data;
    },
    placeholderData: () => placeholder,
  });

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
