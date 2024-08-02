import React from "react";

import { TaskDetailData } from "@/types/task-detail/index";

import taskDetailMock from "./_components/mock.json";
import TaskContent from "./_components/task-content";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const taskId = parseInt(params.id, 10);
  const taskData = taskDetailMock.find(
    (task: TaskDetailData) => task.id === taskId,
  );

  if (!taskData) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <TaskContent task={taskData} />
    </div>
  );
}
