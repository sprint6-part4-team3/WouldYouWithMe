"use client";

import "dayjs/locale/ko";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useCallback, useMemo, useState } from "react";

import { useToggle } from "@/hooks";
import useToast from "@/hooks/use-toast";
import createComment from "@/lib/api/task-comments/post-comment";
import editTaskDetail from "@/lib/api/task-detail/edit-task-detail";
import { IconCheckPrimary } from "@/public/assets/icons";
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

  const toast = useToast();
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(task.id, content),
    onSuccess: (newComment) => {
      setComments((prevComments) => [newComment, ...prevComments]);
      toast.success("댓글이 성공적으로 추가되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`댓글 추가 실패: ${error.message}`);
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: (data: TaskEditData) =>
      editTaskDetail(groupId, taskListId, task.id, data),
    onMutate: async (newTaskData) => {
      await queryClient.cancelQueries({ queryKey: ["task", task.id] });
      const previousTask = queryClient.getQueryData<TaskDetailData>([
        "task",
        task.id,
      ]);

      queryClient.setQueryData<TaskDetailData>(["task", task.id], (old) => ({
        ...old!,
        ...newTaskData,
        doneAt: newTaskData.done ? new Date().toISOString() : null,
      }));

      setIsCompleted(newTaskData.done);
      toast.success(
        newTaskData.done
          ? "작업이 완료되었습니다."
          : "작업이 미완료 상태로 변경되었습니다.",
      );

      return { previousTask };
    },
    onError: (err, newTaskData, context) => {
      queryClient.setQueryData(["task", task.id], context?.previousTask);
      setIsCompleted(context?.previousTask?.doneAt !== null);
      toast.error(`작업 상태 업데이트 실패: ${err.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["task", task.id] });
    },
  });

  const handleToggleComplete = useCallback(() => {
    editTaskMutation.mutate({ done: !isCompleted });
  }, [isCompleted, editTaskMutation]);

  const handleAddComment = useCallback(
    async (content: string): Promise<void> => {
      await addCommentMutation.mutateAsync(content);
    },
    [addCommentMutation],
  );

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
      />
      <CommentInput onAddComment={handleAddComment} />
      {comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <EmptyComment />
      )}
    </div>
  );
};

export default TaskContent;
