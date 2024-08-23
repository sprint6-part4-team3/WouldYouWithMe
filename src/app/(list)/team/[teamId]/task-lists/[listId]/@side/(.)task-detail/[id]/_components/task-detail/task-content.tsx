"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useAtom } from "jotai";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

import { useComments, useTaskMutation, useTaskParams } from "@/hooks";
import getComments from "@/lib/api/task-comments/get-comments";
import getTasks from "@/lib/api/task-lists/get-tasks";
import { IconCheckPrimary } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { Comment } from "@/types/comments/index";
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
  initialComments: Comment[];
}

const TaskContent = ({ initialComments }: TaskContentProps) => {
  const { groupId, taskListId, taskId } = useTaskParams();
  const [currentUser] = useAtom(userAtom);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const currentDate = useMemo(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      // 공백을 '+'로 변환
      return dateParam.replace(/ /g, "+");
    }
    return null;
  }, [searchParams]);

  const { data: tasks } = useQuery({
    queryKey: ["tasks", Number(groupId), Number(taskListId), currentDate],
    queryFn: () =>
      getTasks({
        groupId: Number(groupId),
        taskListId: Number(taskListId),
        date: currentDate!,
      }),
    enabled: !!currentDate,
  });

  const task = useMemo(
    () => tasks?.find((t) => t.id === Number(taskId)),
    [tasks, taskId],
  );

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
    Number(groupId),
    Number(taskListId),
    Number(taskId),
    setIsTaskCompleted,
  );

  const handleToggleComplete = () => {
    if (!editTaskMutation.isPending) {
      const newCompletedState = !isTaskCompleted;
      editTaskMutation.mutate(
        { done: newCompletedState },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["tasks", Number(groupId), Number(taskListId)],
            });
          },
        },
      );
    }
  };

  const taskDate = useMemo(() => (task ? dayjs.utc(task.date) : null), [task]);

  const taskInfoProps = useMemo(
    () => ({
      nickname: task?.writer?.nickname ?? "닉네임",
      date: taskDate ? taskDate.format("YYYY년 M월 D일") : "",
      time: taskDate ? taskDate.format("A h:mm") : "",
      frequency: task?.frequency || "",
      profileImage: task?.writer?.image,
    }),
    [task, taskDate],
  );

  const commentsToDisplay = getCommentsToDisplay(
    comments,
    optimisticComment,
    optimisticEditComment,
  );
  const hasComments = comments?.length > 0 || !!optimisticComment;

  if (!task) {
    return <div>태스크를 찾을 수 없습니다.</div>;
  }

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
        taskDescription={task.description}
        isCompleted={isTaskCompleted}
      />
      <TaskInfo {...taskInfoProps} />
      <TaskDescription
        description={task?.description}
        isTaskCompleted={isTaskCompleted}
        onToggleComplete={handleToggleComplete}
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
