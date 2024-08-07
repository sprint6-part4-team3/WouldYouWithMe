import React from "react";

import {
  IconCheckBoxPrimary,
  IconCheckPrimary,
  IconKebab,
} from "@/public/assets/icons";
import { DayTasks } from "@/types/user-history/index";

interface MyHistoryProps {
  data: DayTasks[];
}

const MyHistory = ({ data }: MyHistoryProps) => (
  <div className="bg-gray-900 text-white">
    <h1 className="mb-24 mt-40 text-20-600 font-bold">마이 히스토리</h1>
    {data.map((dayTasks) => (
      <div key={dayTasks.date} className="mb-30">
        <h2 className="mb-16 text-16-600">{dayTasks.date}</h2>
        {dayTasks.tasks.map((task) => (
          <div
            key={task.id}
            className="mb-10 flex items-center rounded-8 bg-background-secondary p-10"
          >
            <IconCheckPrimary className="mr-10 shrink-0" />
            <span className="text-14-500 line-through">{task.name}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default MyHistory;
