"use client";

import "dayjs/locale/ko";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai";
import React, { useMemo, useState } from "react";

import { useToggle } from "@/hooks";
import createComment from "@/lib/api/task-comments/post-comment";
import editTaskDetail from "@/lib/api/task-detail/edit-task-detail";
import { IconCheckPrimary } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { Comment } from "@/types/comments/index";
import { TaskDetailData, TaskEditData } from "@/types/task-detail/index";

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
  groupId: number;
  taskListId: number;
}

const TaskContent = ({
  task,
  initialComments,
  groupId,
  taskListId,
}: TaskContentProps) => {
  const taskDate = useMemo(
    () => dayjs.utc(task.recurring.startDate),
    [task.recurring.startDate],
  );
  const dropdownUseToggle = useToggle();
  const [isCompleted, setIsCompleted] = useState(task.doneAt !== null);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [currentUser] = useAtom(userAtom);
  const [optimisticComment, setOptimisticComment] = useState<Comment | null>(
    null,
  );

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(task.id, content),
    onSuccess: (newComment) => {
      const commentWithUser = {
        ...newComment,
        user: {
          nickname: currentUser.nickname,
          image: currentUser.image,
        },
      };
      setComments((prevComments) => [commentWithUser, ...prevComments]);
      setOptimisticComment(null);
      queryClient.setQueryData(
        ["comments", task.id],
        (oldData: Comment[] | undefined) =>
          oldData ? [commentWithUser, ...oldData] : [commentWithUser],
      );
    },
    onError: () => {
      setOptimisticComment(null);
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: (data: TaskEditData) =>
      editTaskDetail(groupId, taskListId, task.id, data),
    onSuccess: (data, variables) => {
      setIsCompleted(variables.done);
      queryClient.setQueryData<TaskDetailData>(["task", task.id], (old) => ({
        ...old!,
        ...variables,
        doneAt: variables.done ? new Date().toISOString() : null,
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["task", task.id] });
    },
  });

  const handleToggleComplete = () => {
    if (!editTaskMutation.isPending) {
      editTaskMutation.mutate({ done: !isCompleted });
    }
  };

  const handleAddComment = async (content: string): Promise<void> => {
    const now = new Date().toISOString();
    const tempComment = {
      id: Date.now(),
      taskId: task.id,
      content,
      createdAt: now,
      updatedAt: now,
      userId: currentUser.id,
      user: {
        nickname: currentUser.nickname,
        image: currentUser.image,
      },
    };
    setOptimisticComment(tempComment);
    await addCommentMutation.mutateAsync(content);
  };

  const handleDeleteComment = (deletedCommentId: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId),
    );
    queryClient.setQueryData(
      ["comments", task.id],
      (oldData: Comment[] | undefined) =>
        oldData
          ? oldData.filter((comment) => comment.id !== deletedCommentId)
          : [],
    );
  };

  const taskInfoProps = useMemo(
    () => ({
      nickname: task.user?.nickname ?? "Unknown",
      date: taskDate.format("YYYY년 M월 D일"),
      time: taskDate.format("A h:mm"),
      frequency: task.frequency,
      profileImage: task.user?.image,
    }),
    [task.user, taskDate, task.frequency],
  );

  return (
    <div className="flex min-w-350 flex-col gap-16">
      {isCompleted && (
        <div className="flex items-center text-14-600 text-brand-primary">
          <IconCheckPrimary />
          <span>완료</span>
        </div>
      )}
      <TaskHeader
        taskName={task.name}
        isCompleted={isCompleted}
        dropdownUseToggle={dropdownUseToggle}
      />
      <TaskInfo {...taskInfoProps} />
      <TaskDescription
        description={task.recurring.description}
        isCompleted={isCompleted}
        onToggleComplete={handleToggleComplete}
        isPending={editTaskMutation.isPending}
      />
      <CommentInput onAddComment={handleAddComment} />
      {comments.length > 0 || optimisticComment ? (
        <CommentList
          comments={
            optimisticComment ? [optimisticComment, ...comments] : comments
          }
          taskId={task.id}
          onDeleteComment={handleDeleteComment}
          optimisticCommentId={optimisticComment?.id}
        />
      ) : (
        <EmptyComment />
      )}
    </div>
  );
};

export default TaskContent;
