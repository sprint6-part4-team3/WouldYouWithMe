"use client";

import "dayjs/locale/ko";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import {
  useComments,
  useTaskMutation,
  useTaskParams,
  useToggle,
} from "@/hooks";
import getComments from "@/lib/api/task-comments/get-comments";
import getTaskDetail from "@/lib/api/task-detail/get-task-detail";
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
  initialTask: TaskDetailData;
  initialComments: Comment[];
}

const TaskContent = ({ initialTask, initialComments }: TaskContentProps) => {
  const { groupId, taskListId, taskId } = useTaskParams();
  const dropdownUseToggle = useToggle();
  const [currentUser] = useAtom(userAtom);
  const [isTaskCompleted, setIsTaskCompleted] = useState(
    initialTask.doneAt !== null,
  );
  const router = useRouter();
  const { data: task } = useQuery<TaskDetailData, Error, TaskDetailData>({
    queryKey: ["task", taskId],
    queryFn: () => getTaskDetail(groupId, taskListId, taskId),
    initialData: initialTask,
  });

  useEffect(() => {
    if (task) {
      setIsTaskCompleted(task.doneAt !== null);
    }
  }, [task]);

  const { data: fetchedComments } = useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => getComments(taskId),
    initialData: initialComments,
  });

  const {
    comments,
    optimisticComment,
    editingCommentId,
    optimisticEditComment,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
    editCommentMutation,
  } = useComments(taskId, fetchedComments, currentUser);

  const { editTaskMutation } = useTaskMutation(
    groupId,
    taskListId,
    taskId,
    setIsTaskCompleted,
  );

  const handleToggleComplete = () => {
    if (!editTaskMutation.isPending) {
      editTaskMutation.mutate(
        { done: !isTaskCompleted },
        {
          onSuccess: () => {
            router.refresh();
          },
        },
      );
    }
  };

  const taskDate = useMemo(() => dayjs.utc(task.date), [task.date]);

  const taskInfoProps = useMemo(
    () => ({
      nickname: task.writer?.nickname ?? "닉네임",
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
