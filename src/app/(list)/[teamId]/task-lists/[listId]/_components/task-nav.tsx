import Link from "next/link";
import React from "react";

import { AddListModalButton, IconButton } from "@/components/common";
import formatDate from "@/utils/format-date";

import Calendar from "./calendar";
import CalendarButton from "./calendar-button";

interface TaskNavProps {
  currentDate: Date;
}

const TaskNav = ({ currentDate }: TaskNavProps) => {
  const formattedCurrentDate = formatDate(currentDate);

  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const stringNextDate = nextDate.toISOString();

  const prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const stringPrevDate = prevDate.toISOString();

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-12">
        <time className="text-16-500 text-text-primary ">
          {formattedCurrentDate}
        </time>
        <div className="flex items-center gap-4">
          <Link href={`?date=${stringPrevDate}`} className="flex items-center">
            <IconButton variant="gray" icon="IconArrowLeft" className="p-2" />
          </Link>
          <Link href={`?date=${stringNextDate}`} className="flex items-center">
            <IconButton variant="gray" icon="IconArrowRight" className="p-2" />
          </Link>
        </div>

        <CalendarButton>
          <Calendar currentDate={currentDate} />
        </CalendarButton>
      </div>
      {/* 오류 해결을 위한 임시 값! 데이터 불러올 때 수정하시면 됩니다. */}
      <AddListModalButton groupId={171} />
    </nav>
  );
};

export default TaskNav;
