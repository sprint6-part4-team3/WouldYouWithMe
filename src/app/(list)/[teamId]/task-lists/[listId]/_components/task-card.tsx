"use client";

import "dayjs/locale/ko";

import { clsx } from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useState } from "react";

import { DropDown } from "@/components/common";
import { FREQUENCY_LABELS } from "@/constants/frequency";
import { useTaskParams, useToggle } from "@/hooks";
import {
  IconCalendar,
  IconCheckBox,
  IconCheckBoxPrimary,
  IconKebab,
  IconRepeat,
} from "@/public/assets/icons";

import EditTaskModal from "./edit-task-modal";

dayjs.locale("ko");

interface TaskCardProps {
  id: number;
  name: string;
  date: string;
  frequency: string;
}

const TaskCard = ({ id, name, date, frequency }: TaskCardProps) => {
  const { value: isChecked, handleToggle: toggleChecked } = useToggle();
  const {
    value: isDropdownOpen,
    handleOff: closeDropdown,
    handleToggle: toggleDropdown,
  } = useToggle();
  const { groupId: currentGroupId, taskListId: currentListId } =
    useTaskParams();

  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const closeEditTask = useCallback(() => {
    setIsEditTaskOpen(false);
  }, []);

  const taskDate = dayjs(date);
  const formattedDate = taskDate.format("YYYY년 M월 D일");

  const handleEditClick = () => {
    closeDropdown();
    setIsEditTaskOpen(true);
  };

  const handleDeleteClick = () => {
    closeDropdown();
  };

  return (
    <article className="mb-16 flex w-full flex-col gap-10 rounded-lg bg-background-secondary px-14 py-12">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <button type="button" onClick={toggleChecked} className="mr-8">
            {isChecked ? <IconCheckBoxPrimary /> : <IconCheckBox />}
          </button>
          <Link
            href={`/${currentGroupId}/task-lists/${currentListId}/task-detail/${id}`}
          >
            <h2
              className={clsx(
                `text-14-400 text-text-primary hover:text-brand-primary`,
                {
                  "line-through": isChecked,
                },
              )}
            >
              {name}
            </h2>
          </Link>
        </div>
        <DropDown handleClose={closeDropdown}>
          <DropDown.Trigger onClick={toggleDropdown}>
            <IconKebab />
          </DropDown.Trigger>
          <DropDown.Menu isOpen={isDropdownOpen}>
            <DropDown.Item onClick={handleEditClick}>수정하기</DropDown.Item>
            <DropDown.Item onClick={handleDeleteClick}>삭제하기</DropDown.Item>
          </DropDown.Menu>
        </DropDown>
      </div>
      <div className="flex items-center text-12-400 text-text-default">
        <IconCalendar
          width={16}
          height={16}
          className="flex content-center items-center"
        />
        <time className="ml-6 mr-10 flex items-center">{formattedDate}</time>
        <span>|</span>
        <IconRepeat
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <span className="ml-6 flex items-center">
          {FREQUENCY_LABELS[frequency]}
        </span>
      </div>
      {isEditTaskOpen && (
        <EditTaskModal id={id} name={name} closeEditTask={closeEditTask} />
      )}
    </article>
  );
};

export default TaskCard;
