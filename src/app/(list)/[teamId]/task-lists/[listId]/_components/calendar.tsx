"use client";

import clsx from "clsx";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import Link from "next/link";
import React, { useState } from "react";

import { IconButton } from "@/components/common";

// 날짜가 현재 달에 속한 날짜인지 검사하는 함수
const isCurrentMonth = (day: Date, currentMonth: Date) =>
  isSameDay(startOfMonth(day), startOfMonth(currentMonth)) ||
  (isAfter(day, startOfMonth(currentMonth)) &&
    isBefore(day, endOfMonth(currentMonth)));
// 요일 맴 돌릴 배열
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarProps {
  currentDate: Date;
}

// 컴포넌트 시작

const Calendar = ({ currentDate }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const startWeek = startOfWeek(start);
  const endWeek = endOfWeek(end);

  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <section className="h-258 w-282 rounded-24 bg-background-tertiary p-16">
      <header className="mb-4 flex items-center justify-between">
        <IconButton
          variant="none"
          icon="IconCalendarArrowLeft"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        />
        <h3 className="text-14-500 text-text-inverse">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <IconButton
          variant="none"
          icon="IconCalendarArrowRight"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />
      </header>
      <div className="grid grid-cols-7">
        {weekdays.map((day) => (
          <div
            key={day}
            className="px-3 py-7 text-center text-14-600 text-text-inverse"
          >
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toString()}
            className={clsx(
              `flex h-32 w-35 items-center justify-center rounded-8`,
              {
                "bg-brand-primary": isSameDay(day, currentDate),
              },
              { " text-gray-400": !isCurrentMonth(day, currentMonth) },
            )}
          >
            {isCurrentMonth(day, currentMonth) ? (
              <Link href={`?date=${day.toISOString()}`}>
                <time>{format(day, "d")}</time>
              </Link>
            ) : (
              <time>{format(day, "d")}</time>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Calendar;
