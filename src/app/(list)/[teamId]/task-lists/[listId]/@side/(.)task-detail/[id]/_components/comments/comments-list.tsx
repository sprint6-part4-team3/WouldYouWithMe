import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useState } from "react";

import DropDown from "@/components/common/drop-down/index";
import useToast from "@/hooks/use-toast";
import deleteComment from "@/lib/api/task-comments/delete-comments";
import { IconKebab, IconProfile } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { Comment } from "@/types/comments/index";

// dayjs에 relativeTime 플러그인 추가
dayjs.extend(relativeTime);

interface CommentListProps {
  comments: Comment[];
  taskId: number;
  onDeleteComment: (commentId: number) => void;
  optimisticCommentId?: number;
}

const CommentItem = ({
  comment,
  taskId,
  onDelete,
  isOptimistic,
}: {
  comment:
    | Comment
    | {
        id: number;
        content: string;
        createdAt: string;
        updatedAt: string;
        userId: number;
        user: { nickname: string; image: string | null };
      };
  taskId: number;
  onDelete: (commentId: number) => void;
  isOptimistic: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toast = useToast();
  const [currentUser] = useAtom(userAtom);

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(taskId, comment.id),
    onSuccess: () => {
      onDelete(comment.id);
      toast.success("댓글이 성공적으로 삭제되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(`댓글 삭제 실패: ${error.message}`);
    },
  });

  const handleEdit = () => {
    setIsDropdownOpen(false);
    // 수정 기능 구현
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
    deleteCommentMutation.mutate();
  };

  const handleClose = () => {
    setIsDropdownOpen(false);
  };

  const handleToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const isCommentOwner = currentUser?.id === comment.userId;

  // 상대적 시간 계산 함수
  const getRelativeTime = (date: string) => {
    const now = dayjs();
    const commentDate = dayjs(date);
    const diffInHours = now.diff(commentDate, "hour");
    const diffInDays = now.diff(commentDate, "day");

    if (diffInHours < 1) {
      return "방금 전";
    }
    if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    }
    if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    }
    return commentDate.format("YYYY.MM.DD");
  };

  return (
    <div
      className={`flex w-full flex-col items-start gap-16 border-b-[0.2px] border-text-disabled ${isOptimistic ? "opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between self-stretch text-14-400">
        {comment.content}
        {isCommentOwner && !isOptimistic && (
          <DropDown handleClose={handleClose}>
            <DropDown.Trigger onClick={handleToggle}>
              <IconKebab className="cursor-pointer" />
            </DropDown.Trigger>
            <DropDown.Menu isOpen={isDropdownOpen}>
              <DropDown.Item onClick={handleEdit}>수정하기</DropDown.Item>
              <DropDown.Item onClick={handleDelete}>삭제하기</DropDown.Item>
            </DropDown.Menu>
          </DropDown>
        )}
      </div>
      <div className="mb-12 flex items-center justify-between self-stretch text-14-500 text-text-primary">
        <div className="flex items-center">
          {comment.user?.image ? (
            <Image
              src={comment.user.image}
              alt={`${comment.user.nickname}'s profile`}
              width={32}
              height={32}
              className="mr-12 rounded-full"
            />
          ) : (
            <IconProfile className="mr-12" />
          )}
          <span className="text-14-500 text-text-primary">
            {comment.user?.nickname}
          </span>
        </div>
        <time className="text-14-400 text-text-secondary">
          {getRelativeTime(comment.createdAt)}
        </time>
      </div>
    </div>
  );
};

const CommentList = ({
  comments,
  taskId,
  onDeleteComment,
  optimisticCommentId,
}: CommentListProps) => {
  const sortedComments = [...comments].sort((a, b) =>
    dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1,
  );

  return (
    <div className="flex min-w-350 flex-col gap-16 pt-24">
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          taskId={taskId}
          onDelete={onDeleteComment}
          isOptimistic={comment.id === optimisticCommentId}
        />
      ))}
    </div>
  );
};

export default CommentList;
