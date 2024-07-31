import React from "react";

import { Task } from "@/types/task-list/index";

import mockData from "./_components/mock.json";
import RecurringTasks from "./_components/task-list-container";

const RecurringTasksPage = () => (
  <div className="mx-auto p-4">
    <RecurringTasks initialTasks={mockData as Task[]} />
  </div>
);

export default RecurringTasksPage;
