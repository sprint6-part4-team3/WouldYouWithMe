import Link from "next/link";
import React from "react";

import IconButton from "@/components/common/icon-button";
import CreateListForm from "@/components/common/modal/create-list-form";
import OpenModal from "@/components/common/modal/open-modal";
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
    <nav className="mb-16 flex items-center justify-between">
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

      <OpenModal title="할 일 목록" modalChildren={<CreateListForm />}>
        <button type="button">
          <span className="leading-0 text-brand-primary">+ </span>
          <span className="text-14-400 text-brand-primary">
            새로운 목록 추가하기
          </span>
        </button>
      </OpenModal>
    </nav>
  );
};

export default TaskNav;
