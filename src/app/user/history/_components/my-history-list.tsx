import React from "react";

import { IconCheckPrimary } from "@/public/assets/icons";
import { DayTasks, Task } from "@/types/user-history/index";

interface MyHistoryProps {
  data: Task[];
}

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const MyHistory = ({ data }: MyHistoryProps) => {
  const groupTasksByDate = (tasks: Task[]): DayTasks[] => {
    const grouped = tasks.reduce<Record<string, Task[]>>((acc, task) => {
      const taskDate = new Date(task.date);
      taskDate.setHours(taskDate.getHours() + 9);

      const date = taskDate.toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, taskList]) => ({
        date: formatDate(date),
        tasks: taskList,
      }));
  };

  const groupedTasks = groupTasksByDate(data);

  return (
    <div className="text-white">
      <h1 className="mb-24 mt-40 text-20-600 font-bold">마이 히스토리</h1>
      {groupedTasks.map((dayTasks) => (
        <div key={dayTasks.date} className="mb-30">
          <h2 className="mb-16 text-16-600">{dayTasks.date}</h2>
          {dayTasks.tasks.map((task) => (
            <div
              key={task.id}
              className="mb-10 flex items-center rounded-8 bg-background-secondary px-14 py-10"
            >
              <IconCheckPrimary className="mr-10 shrink-0" />
              <span className="text-16-500 line-through">{task.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyHistory;
