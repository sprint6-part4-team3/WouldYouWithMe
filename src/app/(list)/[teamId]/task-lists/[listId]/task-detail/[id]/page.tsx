/* eslint-disable no-console */

import { notFound } from "next/navigation";
import React from "react";

import { SidePage } from "@/components/common";
import getTaskDetail from "@/lib/api/task-detail/get-task-detail";
import { Comment, TaskDetailData } from "@/types/task-detail/index";

import commentMock from "./_components/comments/comment-mock.json";
import CommentList from "./_components/comments/comments-list";
import EmptyComment from "./_components/comments/empty-comment";
import TaskContent from "./_components/task-detail/task-content";

interface PageProps {
  params: {
    teamId: string;
    groupId: string;
    taskListId: string;
    id: string;
  };
}

const getTaskData = async (
  teamId: string,
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  try {
    const taskData = await getTaskDetail(teamId, taskId, groupId, taskListId);
    return taskData;
  } catch (error) {
    console.error("태스크 데이터 가져오기 실패:", error);
    return null;
  }
};

const TaskDetailPage = async ({ params }: PageProps) => {
  const { teamId, groupId, taskListId, id } = params;
  const taskId = parseInt(id, 10);
  const groupIdNum = parseInt(groupId, 10);
  const taskListIdNum = parseInt(taskListId, 10);

  const taskData = await getTaskData(teamId, groupIdNum, taskListIdNum, taskId);

  if (!taskData) {
    notFound();
  }

  // 목데이터에서 현재 태스크에 해당하는 댓글만 필터링
  const comments = commentMock.filter(
    (comment: Comment) => comment.taskId === taskId,
  );

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
