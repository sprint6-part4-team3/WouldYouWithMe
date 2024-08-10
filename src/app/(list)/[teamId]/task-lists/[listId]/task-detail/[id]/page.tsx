import { notFound } from "next/navigation";
import React from "react";

import { SidePage } from "@/components/common";
import getComments from "@/lib/api/task-comments/get-comments";
import getTaskDetail from "@/lib/api/task-detail/get-task-detail";
import { Comment } from "@/types/comments/index";

import CommentList from "./_components/comments/comments-list";
import EmptyComment from "./_components/comments/empty-comment";
import TaskContent from "./_components/task-detail/task-content";

interface PageProps {
  params: {
    groupId: string;
    taskListId: string;
    id: string;
  };
}

const TaskDetailPage = async ({ params }: PageProps) => {
  const { groupId, taskListId, id } = params;

  const taskId = Number(id);
  const groupIdNum = Number(groupId);
  const taskListIdNum = Number(taskListId);

  const [taskData, comments] = await Promise.all([
    getTaskDetail(groupIdNum, taskListIdNum, taskId),
    getComments(taskId),
  ]);

  if (!taskData) {
    notFound();
  }

  return (
    <SidePage>
      <TaskContent task={taskData} />
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <EmptyComment />
      )}
    </SidePage>
  );
};

export default TaskDetailPage;
