import React from "react";

import { SidePage } from "@/components/common";

import AddTaskForm from "./_components/add-task-form";

interface AddTaskProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const AddTask = ({ params, searchParams }: AddTaskProps) => {
  const currentListId = Number(params.listId);
  const currentTeamId = Number(params.teamId);
  let newDate: Date;
  if (!searchParams.date) {
    newDate = new Date();
  } else {
    newDate = new Date(searchParams.date);
  }

  const timeZoneOffset = 9 * 60 * 60 * 1000;

  const kstDate = new Date(newDate.getTime() + timeZoneOffset);
  kstDate.setUTCHours(0, 0, 0, 0);

  const currentDate = new Date(kstDate.getTime() - timeZoneOffset);

  return (
    <SidePage>
      <h1 className="mt-16 text-18-500 md:text-20-700">할 일 추가</h1>
      <AddTaskForm
        currentTeamId={currentTeamId}
        initialDate={currentDate}
        currentListId={currentListId}
      />
    </SidePage>
  );
};

export default AddTask;
