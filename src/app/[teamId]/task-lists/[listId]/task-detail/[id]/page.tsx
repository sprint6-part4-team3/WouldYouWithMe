import React from "react";

import { Comment, TaskDetailData } from "@/types/task-detail/index";

import commentMock from "./_components/comment-mock.json";
import CommentList from "./_components/comments-list";
import TaskContent from "./_components/task-content";
import taskMock from "./_components/task-mock.json";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const taskId = parseInt(params.id, 10);
  const taskData = taskMock.find((task: TaskDetailData) => task.id === taskId);
  const comments = commentMock.filter(
    (comment: Comment) => comment.taskId === taskId,
  );

  if (!taskData) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <TaskContent task={taskData} />
      <CommentList comments={comments} />
    </div>
  );
}
