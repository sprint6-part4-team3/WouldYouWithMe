"use client";

import React, { useState } from "react";

import { Task } from "@/types/task-list/index";

import RecurringTask from "./task-list";

type RecurringTasksProps = {
  initialTasks: Task[];
};

const RecurringTasksContainer = ({ initialTasks }: RecurringTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleEdit = (id: number) => {
    // 수정 로직 구현
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      {tasks.map((task) => (
        <RecurringTask
          key={task.id}
          id={task.id}
          name={task.name}
          date={task.date}
          frequency={task.frequency}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default RecurringTasksContainer;
