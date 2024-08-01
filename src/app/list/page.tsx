import React from "react";

import { Task } from "@/types/task-list/index";

import mockData from "./_components/mock.json";
import TasksContainer from "./_components/tasks-container";

const TasksContainerPage = () => (
  <div className="mx-auto min-w-430 p-4">
    <TasksContainer initialTasks={mockData as Task[]} />
  </div>
);

export default TasksContainerPage;
