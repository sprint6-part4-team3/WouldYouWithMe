import React from "react";

import { SidePage } from "@/components/common";

import AddTaskForm from "./_components/add-task-form";
// 나중에 패럴렐 라우팅으로 할 예정
// 그러면 패럴렐 라우팅 폴더로 옮기고 요 page 파일은 삭제 예정

interface AddTaskProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const AddTask = ({ params, searchParams }: AddTaskProps) => {
  const currentListId = Number(params.listId);
  const currentTeamId = Number(params.teamId);
  let currentDate: Date;
  if (!searchParams.date) {
    currentDate = new Date();
  } else {
    currentDate = new Date(searchParams.date);
  }
  const initialDate = currentDate.getDate();
  const initialDay = currentDate.getDay();
  return (
    <SidePage>
      <AddTaskForm
        currentTeamId={currentTeamId}
        initialDate={initialDate}
        initialDay={initialDay}
        currentListId={currentListId}
      />
    </SidePage>
  );
};

export default AddTask;
