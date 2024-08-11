/* eslint-disable no-console */

"use client";

import "dayjs/locale/ko";

import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState } from "react";

import { useToggle } from "@/hooks";
import useToast from "@/hooks/use-toast";
import createComment from "@/lib/api/task-comments/post-comment";
import { IconCheckPrimary } from "@/public/assets/icons";
import { Comment } from "@/types/comments/index";
import { TaskDetailData } from "@/types/task-detail/index";

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
  const taskDate = dayjs.utc(task.recurring.startDate);

  const {
    value: isDropdownOpen,
    handleToggle: toggleDropdown,
    handleOff: closeDropdown,
  } = useToggle();
  const [isCompleted, setIsCompleted] = useState(task.doneAt !== null);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const toast = useToast();

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

  const handleToggleComplete = () => {
    setIsCompleted((prev) => !prev);
  };

  const handleAddComment = async (content: string): Promise<void> => {
    await addCommentMutation.mutateAsync(content);
  };

  return (
    <div className="flex min-w-350 flex-col gap-16">
      {isCompleted && (
        <div className="flex items-center gap-2 text-14-600 text-brand-primary">
          <IconCheckPrimary />
          <span>완료</span>
        </div>
      )}
      <TaskHeader
        taskName={task.name}
        isCompleted={isCompleted}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        closeDropdown={closeDropdown}
      />
      <TaskInfo
        nickname={task.user?.nickname ?? "Unknown"}
        date={taskDate.format("YYYY년 M월 D일")}
        time={taskDate.format("A h:mm")}
        frequency={task.frequency}
        profileImage={task.user?.image}
      />
      <TaskDescription
        description={task.recurring.description}
        isCompleted={isCompleted}
        onToggleComplete={handleToggleComplete}
      />
      <CommentInput onAddComment={handleAddComment} />
      {comments && comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <EmptyComment />
      )}
    </div>
  );
};

export default TaskContent;
