import React from "react";

interface TasksProps {
  tasks: [];
}

// tasks 배열 prop으로 받아서 맵 돌려주는 컴포넌트
const TasksContainer = ({ tasks }: TasksProps) => (
  <div className="mt-16 h-500 bg-background-secondary">Tasks</div>
);

export default TasksContainer;
