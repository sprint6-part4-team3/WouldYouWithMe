"use client";

import clsx from "clsx";
import {
  addHours,
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
import { ko } from "date-fns/locale";
import Link from "next/link";
import { useState } from "react";

import { IconButton } from "@/components/common";
import DAYS_OF_WEEK from "@/constants/weeks";
import isSameMonth from "@/utils/is-same-month";

interface CalendarProps {
  currentDate: Date;
}

const Calendar = ({ currentDate }: CalendarProps) => {
  const [newDate, setNewDate] = useState(currentDate);

  const start = startOfMonth(newDate);
  const end = endOfMonth(newDate);
  const startWeek = startOfWeek(start);
  const endWeek = endOfWeek(end);

  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  return (
    <section className="z-50 h-fit w-full rounded-24 bg-background-tertiary p-16">
      <header className="mb-4 flex items-center justify-between">
        <IconButton
          variant="none"
          icon="IconCalendarArrowLeft"
          onClick={() => setNewDate(subMonths(newDate, 1))}
        />
        <h3 className="text-16-500 text-text-inverse">
          {format(newDate, "MM월 yyyy", { locale: ko })}
        </h3>
        <IconButton
          variant="none"
          icon="IconCalendarArrowRight"
          onClick={() => setNewDate(addMonths(newDate, 1))}
        />
      </header>
      <div className="grid grid-cols-7">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="px-3 py-7 text-center text-16-600 text-text-inverse"
          >
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={clsx(
              `flex h-32 w-35 items-center justify-center rounded-8`,
              {
                "bg-brand-primary": isSameDay(day, currentDate),
              },
              { " text-gray-400": !isSameMonth(day, newDate) },
            )}
          >
            {isSameMonth(day, newDate) ? (
              <Link href={`?date=${addHours(day, 9).toISOString()}`}>
                <time
                  className={clsx({
                    "text-brand-primary": isToday(day),
                    "text-text-inverse":
                      isToday(day) && isSameDay(day, currentDate),
                  })}
                >
                  {format(day, "d")}
                </time>
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
