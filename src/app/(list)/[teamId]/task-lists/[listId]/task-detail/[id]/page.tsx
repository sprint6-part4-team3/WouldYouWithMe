import React from "react";

import { Comment, TaskDetailData } from "@/types/task-detail/index";

import commentMock from "./_components/comments/comment-mock.json";
import CommentList from "./_components/comments/comments-list";
import EmptyComment from "./_components/comments/empty-comment";
import TaskContent from "./_components/task-detail/task-content";
import taskMock from "./_components/task-detail/task-mock.json";

interface PageProps {
  params: { id: string };
}

const TaskDetailPage = ({ params }: PageProps) => {
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
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <EmptyComment />
      )}
    </div>
  );
};
export default TaskDetailPage;
