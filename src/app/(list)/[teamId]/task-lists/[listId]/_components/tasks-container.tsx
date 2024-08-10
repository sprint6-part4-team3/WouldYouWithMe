"use client";

import React, { useState } from "react";

import { TaskList } from "@/types/group";
import { Tasks } from "@/types/task-list/index";

import TaskCard from "./task-card";

interface TasksProps {
  initialTasks: TaskList[];
  currentListId: number;
  currentTeamId: number;
}

const TasksContainer = ({
  initialTasks,
  currentListId,
  currentTeamId,
}: TasksProps) => {
  const handleEdit = (id: number) => {
    // 수정 로직 구현
  };

  const handleDelete = (id: number) => {
    // 삭제 로직 구현
  };

  return (
    <div>
      {initialTasks.map((task) => (
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
