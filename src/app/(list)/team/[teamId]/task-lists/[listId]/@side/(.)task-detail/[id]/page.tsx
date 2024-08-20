import React from "react";

import { SidePage } from "@/components/common";
import getComments from "@/lib/api/task-comments/get-comments";

import TaskContent from "./_components/task-detail/task-content";

const TaskDetailPage = async ({ params }: { params: { id: string } }) => {
  const taskId = Number(params.id);
  const initialComments = await getComments(taskId);

  return (
    <SidePage>
      <TaskContent initialComments={initialComments} />
    </SidePage>
  );
};

export default TaskDetailPage;
