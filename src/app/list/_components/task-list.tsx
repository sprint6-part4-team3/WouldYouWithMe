"use client";

import "dayjs/locale/ko";

import dayjs from "dayjs";
import React from "react";

import DropDown from "@/components/common/drop-down/index";
import useToggle from "@/hooks/use-toggle";
import {
  IconCalendar,
  IconCheckBox,
  IconCheckBoxGreen,
  IconKebab,
  IconRepeat,
  IconTime,
} from "@/public/assets/icons";

dayjs.locale("ko");

type RecurringTaskProps = {
  id: number;
  name: string;
  date: string;
  frequency: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const RecurringTask = ({
  id,
  name,
  date,
  frequency,
  onEdit,
  onDelete,
}: RecurringTaskProps) => {
  const { value: isChecked, handleToggle: toggleChecked } = useToggle();
  const {
    value: isDropdownOpen,
    handleOff: closeDropdown,
    handleToggle: toggleDropdown,
  } = useToggle();

  const taskDate = dayjs(date);
  const formattedDate = taskDate.format("YYYY년 M월 D일");
  const formattedTime = taskDate.format("A h:mm");

  const handleEditClick = () => {
    onEdit(id);
    closeDropdown();
  };

  const handleDeleteClick = () => {
    onDelete(id);
    closeDropdown();
  };

  return (
    <div className="mb-16 flex w-full flex-col gap-10 rounded-lg bg-background-secondary px-14 py-12">
      <div className="mb-2 flex items-center">
        <button type="button" onClick={toggleChecked} className="mr-8">
          {isChecked ? <IconCheckBoxGreen /> : <IconCheckBox />}
        </button>
        <h2
          className={`grow text-14-400 text-text-primary ${
            isChecked ? "line-through" : ""
          }`}
        >
          {name}
        </h2>
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
        <span className="ml-6 mr-10 flex items-center">{formattedDate}</span>
        <span>|</span>
        <IconTime
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <span className="ml-6 mr-10 flex items-center">{formattedTime}</span>
        <span>|</span>
        <IconRepeat
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <span className="ml-6 flex items-center">
          {frequency === "DAILY" ? "매일 반복" : "반복"}
        </span>
      </div>
    </div>
  );
};

export default RecurringTask;
