"use client";

import React, { useState } from "react";

import { Task } from "@/types/task-list/index";

import TaskCard from "./task-card";

interface TasksProps {
  initialTasks: Task[];
  currentListId: number;
  currentTeamId: number;
}

const TasksContainer = ({
  initialTasks,
  currentListId,
  currentTeamId,
}: TasksProps) => {
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
        <TaskCard
          key={task.id}
          id={task.id}
          name={task.name}
          date={task.date}
          frequency={task.frequency}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentListId={currentListId}
          currentTeamId={currentTeamId}
        />
      ))}
    </div>
  );
};

export default TasksContainer;
