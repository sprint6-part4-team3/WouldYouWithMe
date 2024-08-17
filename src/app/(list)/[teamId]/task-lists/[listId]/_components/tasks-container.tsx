"use client";

import { TaskList } from "@/types/group";

import TaskCard from "./task-card";

interface TasksProps {
  initialTasks: TaskList[];
}

const TasksContainer = ({ initialTasks }: TasksProps) => (
  <div>
    {initialTasks.map((task) => (
      <TaskCard
        key={task.id}
        id={task.id}
        name={task.name}
        date={task.date}
        frequency={task.frequency}
        initialIsCompleted={task.doneAt !== null}
      />
    ))}
  </div>
);

export default TasksContainer;
