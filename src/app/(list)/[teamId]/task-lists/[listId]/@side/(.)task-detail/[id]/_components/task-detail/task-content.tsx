"use client";

import "dayjs/locale/ko";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai";
import React, { useMemo, useState } from "react";

import {
  useComments,
  useTaskMutation,
  useTaskParams,
  useToggle,
} from "@/hooks";
import { IconCheckPrimary } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { Comment } from "@/types/comments/index";
import { TaskDetailData } from "@/types/task-detail/index";
import getCommentsToDisplay from "@/utils/task-comments-util";

import CommentInput from "../comments/comment-input";
import CommentList from "../comments/comments-list";
import EmptyComment from "../comments/empty-comment";
import TaskDescription from "./task-description";
import TaskHeader from "./task-header";
import TaskInfo from "./task-info";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");

interface TaskContentProps {
  task: TaskDetailData;
  initialComments: Comment[];
}

const TaskContent = ({ task, initialComments }: TaskContentProps) => {
  const { groupId, taskListId, taskId } = useTaskParams();
  const [isTaskCompleted, setIsTaskCompleted] = useState(task.doneAt !== null);
  const taskDate = useMemo(
    () => dayjs.utc(task.recurring.startDate),
    [task.recurring.startDate],
  );
  const dropdownUseToggle = useToggle();
  const [currentUser] = useAtom(userAtom);

  const {
    comments,
    optimisticComment,
    editingCommentId,
    optimisticEditComment,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
    editCommentMutation,
  } = useComments(taskId, initialComments, currentUser);

  const { editTaskMutation } = useTaskMutation(
    groupId,
    taskListId,
    taskId,
    setIsTaskCompleted,
  );

  const handleToggleComplete = () => {
    if (!editTaskMutation.isPending) {
      editTaskMutation.mutate({ done: !isTaskCompleted });
    }
  };

  const taskInfoProps = useMemo(
    () => ({
      nickname: task.writer?.nickname ?? "Unknown",
      date: taskDate.format("YYYY년 M월 D일"),
      time: taskDate.format("A h:mm"),
      frequency: task.frequency,
      profileImage: task.writer?.image,
    }),
    [task.writer, taskDate, task.frequency],
  );

  const commentsToDisplay = getCommentsToDisplay(
    comments,
    optimisticComment,
    optimisticEditComment,
  );
  const hasComments = comments.length > 0 || optimisticComment;

  return (
    <div className="flex min-w-350 flex-col gap-16">
      {isTaskCompleted && (
        <div className="flex items-center text-14-600 text-brand-primary">
          <IconCheckPrimary />
          <span>완료</span>
        </div>
      )}
      <TaskHeader
        taskName={task.name}
        isCompleted={isTaskCompleted}
        dropdownUseToggle={dropdownUseToggle}
      />
      <TaskInfo {...taskInfoProps} />
      <TaskDescription
        description={task.description}
        isTaskCompleted={isTaskCompleted}
        onToggleComplete={handleToggleComplete}
        isPending={editTaskMutation.isPending}
      />
      <CommentInput onAddComment={handleAddComment} />
      {hasComments ? (
        <CommentList
          comments={commentsToDisplay}
          taskId={taskId}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
          optimisticCommentId={optimisticComment?.id}
          editingCommentId={editingCommentId}
          isPendingEdit={editCommentMutation.isPending}
        />
      ) : (
        <EmptyComment />
      )}
    </div>
  );
};

export default TaskContent;
