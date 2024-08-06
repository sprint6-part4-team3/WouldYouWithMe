"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import Link from "next/link";
import React, { useState } from "react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const startWeek = startOfWeek(start);
  const endWeek = endOfWeek(end);

  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <div className="h-258 w-282 rounded-24 bg-background-secondary p-16 ">
      <header className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          a
        </button>
        <h1 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h1>
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          b
        </button>
      </header>
      <div className="grid grid-cols-7 gap-px">
        <div className="p-2 text-center font-semibold text-gray-700">Sun</div>
        <div className="p-2 text-center font-semibold text-gray-700">Mon</div>
        <div className="p-2 text-center font-semibold text-gray-700">Tue</div>
        <div className="p-2 text-center font-semibold text-gray-700">Wed</div>
        <div className="p-2 text-center font-semibold text-gray-700">Thu</div>
        <div className="p-2 text-center font-semibold text-gray-700">Fri</div>
        <div className="p-2 text-center font-semibold text-gray-700">Sat</div>
        {days.map((day) => (
          <Link key={day.toString()} href="/">
            <time
              className={`cursor-pointer p-2 text-center ${
                isToday(day) ? "bg-blue-200" : ""
              }`}
            >
              {format(day, "d")}
            </time>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
