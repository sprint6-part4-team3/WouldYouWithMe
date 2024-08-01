import Link from "next/link";
import React from "react";

import { AddListModalButton, IconButton } from "@/components/common";
import formatDate from "@/utils/format-date";

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

        <IconButton variant="gray" icon="IconCalendar" className="p-6" />
      </div>

      <AddListModalButton />
    </nav>
  );
};

export default TaskNav;
