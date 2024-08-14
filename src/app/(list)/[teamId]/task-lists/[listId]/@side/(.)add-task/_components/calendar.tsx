"use client";

import clsx from "clsx";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useSearchParams } from "next/navigation";
import { MouseEvent, useState } from "react";

import { IconButton } from "@/components/common";
import DAYS_OF_WEEK from "@/constants/weeks";
import isSameMonth from "@/utils/is-same-month";

interface CalendarProps {
  setValue: (value: string) => void;
  initialDate: Date;
}

const Calendar = ({ setValue, initialDate }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const startWeek = startOfWeek(start);
  const endWeek = endOfWeek(end);

  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  const handleDayClick = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedDate = new Date(e.currentTarget.value);
    setCurrentDate(selectedDate);
    setValue(e.currentTarget.value);
  };

  return (
    <section className="h-fit w-full rounded-24 border bg-background-secondary p-16">
      <header className="mb-4 flex items-center justify-between">
        <IconButton
          variant="none"
          icon="IconCalendarArrowLeft"
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
        />
        <h3 className="text-14-500 text-text-inverse">
          {format(currentDate, "MMMM yyyy")}
        </h3>
        <IconButton
          variant="none"
          icon="IconCalendarArrowRight"
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
        />
      </header>
      <div className="grid grid-cols-7">
        {DAYS_OF_WEEK.map((day) => (
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
              `flex h-32 w-full items-center justify-center rounded-8`,
              {
                "bg-brand-primary": isSameDay(day, currentDate),
              },
              { " text-gray-400": !isSameMonth(day, currentDate) },
            )}
          >
            {isSameMonth(day, currentDate) ? (
              <button
                type="button"
                onClick={handleDayClick}
                value={day.toISOString()}
              >
                <time>{format(day, "d")}</time>
              </button>
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
