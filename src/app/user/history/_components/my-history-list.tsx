"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useCallback, useMemo, useState } from "react";

import Button from "@/components/common/buttons/button/index";
import { IconCheckPrimary } from "@/public/assets/icons";
import { DayTasks, Task } from "@/types/user-history/index";

dayjs.extend(utc);
dayjs.extend(timezone);

interface MyHistoryProps {
  data: Task[];
}

const formatDate = (date: string): string =>
  dayjs(date).format("YYYY년 M월 D일");

const ITEMS_PER_PAGE = 8;

const MyHistory = ({ data }: MyHistoryProps) => {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const groupedTasks = useMemo(() => {
    const grouped = data.reduce<Record<string, Task[]>>((acc, task) => {
      const taskDate = dayjs(task.date).tz("Asia/Seoul").format("YYYY-MM-DD");
      if (!acc[taskDate]) {
        acc[taskDate] = [];
      }
      acc[taskDate].push(task);
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, taskList]) => ({
        date: formatDate(date),
        tasks: taskList,
      }));
  }, [data]);

  const handleLoadMore = useCallback(() => {
    setVisibleItems((prevItems) => prevItems + ITEMS_PER_PAGE);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const visibleTasks = useMemo(() => {
    let count = 0;
    return groupedTasks.reduce((acc, dayTasks) => {
      if (count < visibleItems) {
        const tasksToAdd = dayTasks.tasks.slice(0, visibleItems - count);
        count += tasksToAdd.length;
        acc.push({ ...dayTasks, tasks: tasksToAdd });
      }
      return acc;
    }, [] as DayTasks[]);
  }, [groupedTasks, visibleItems]);

  const totalTaskCount = useMemo(
    () =>
      groupedTasks.reduce((sum, dayTasks) => sum + dayTasks.tasks.length, 0),
    [groupedTasks],
  );

  const showLoadMore = visibleItems < totalTaskCount;

  return (
    <div className="text-white">
      <h1 className="mb-24 mt-40 text-20-600 font-bold">마이 히스토리</h1>
      {visibleTasks.map((dayTasks) => (
        <div key={dayTasks.date} className="mb-30">
          <h2 className="mb-16 text-16-600">{dayTasks.date}</h2>
          {dayTasks.tasks.map((task) => (
            <div
              key={task.id}
              className="mb-10 flex items-center rounded-8 bg-background-secondary px-14 py-10"
            >
              <IconCheckPrimary className="mr-10 shrink-0" />
              <span className="text-16-500 text-text-disabled line-through">
                {task.name}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className="mt-16 flex justify-center">
        {showLoadMore ? (
          <Button
            variant="noFill"
            onClick={handleLoadMore}
            className="hover:bg-background-tertiary-hover flex h-50 w-150 items-center justify-center rounded-6 border-0 bg-background-tertiary px-6 py-3 text-16-600 text-text-primary shadow-sm transition-colors duration-300"
          >
            ▼ 더보기
          </Button>
        ) : (
          <Button
            variant="noFill"
            onClick={scrollToTop}
            className="marker:hover:bg-background-tertiary-hover flex h-50 w-150 items-center justify-center rounded-6 border-0 bg-background-tertiary px-6 py-3 text-16-600 text-text-primary shadow-sm transition-colors duration-300"
          >
            ▲ 맨 위로
          </Button>
        )}
      </div>
    </div>
  );
};

export default MyHistory;
