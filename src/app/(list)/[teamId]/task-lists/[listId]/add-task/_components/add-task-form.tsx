"use client";

import React from "react";

import { CheckButton, Input, PlusButton } from "@/components/common";

import TaskDetailInputs from "./task-detail-inputs";

interface AddTaskFormProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
}

const AddTaskForm = ({
  currentTeamId,
  currentDate,
  currentListId,
}: AddTaskFormProps) => {
  const a = 0;
  return (
    <form className="mt-30">
      <div className="flex flex-col gap-45">
        <Input id="task" type="text" placeholder="할일 제목을 지어주세요" />
        <TaskDetailInputs />
      </div>

      <div className="absolute bottom-112 right-40 shadow-xl">
        <PlusButton type="submit" onClick={() => {}}>
          할 일 추가
        </PlusButton>
      </div>
    </form>
  );
};

export default AddTaskForm;
