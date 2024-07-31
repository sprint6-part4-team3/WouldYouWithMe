import React from "react";

import { Task } from "@/types/task-list/index";

import mockData from "./_components/mock.json";
import RecurringTasksClient from "./_components/task-list-container";

const RecurringTasksPage = () => (
  <div className="container mx-auto p-4">
    <RecurringTasksClient initialTasks={mockData as Task[]} />
  </div>
);

export default RecurringTasksPage;
