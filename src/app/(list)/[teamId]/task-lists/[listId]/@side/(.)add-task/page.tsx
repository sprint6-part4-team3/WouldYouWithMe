import React from "react";

import { SidePage } from "@/components/common";

import AddTaskForm from "./_components/add-task-form";

const AddTask = () => (
  <SidePage>
    <h1 className="mt-16 text-18-500 md:text-20-700">할 일 추가</h1>
    <AddTaskForm />
  </SidePage>
);

export default AddTask;
