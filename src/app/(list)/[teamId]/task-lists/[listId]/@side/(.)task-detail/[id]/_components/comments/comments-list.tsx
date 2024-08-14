import "dayjs/locale/ko";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAtom } from "jotai";
import Image from "next/image";
import React, { useState } from "react";

import DropDown from "@/components/common/drop-down/index";
import { IconKebab, IconProfile } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { Comment } from "@/types/comments/index";

import CommentDeleteModal from "./comment-delete-modal";
import CommentEditInput from "./comment-edit";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface CommentListProps {
  comments: Comment[];
  taskId: number;
  onDeleteComment: (commentId: number) => void;
  onEditComment: (commentId: number, newContent: string) => void;
  optimisticCommentId?: number;
  editingCommentId: number | null;
  isPendingEdit: boolean;
}

const CommentItem = ({
  comment,
  taskId,
  onDelete,
  onEdit,
  isOptimistic,
  isPendingEdit,
}: {
  comment: Comment;
  taskId: number;
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, newContent: string) => void;
  isOptimistic: boolean;
  isPendingEdit: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser] = useAtom(userAtom);

  const handleEdit = () => {
    setIsDropdownOpen(false);
    setIsEditing(true);
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleClose = () => {
    setIsDropdownOpen(false);
  };

  const handleToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSaveEdit = (newContent: string) => {
    onEdit(comment.id, newContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const isCommentOwner = currentUser?.id === comment.userId;

  const getRelativeTime = (date: string) => {
    const commentDate = dayjs(date);
    const now = dayjs();
    if (now.diff(commentDate, "day") >= 7) {
      return commentDate.format("YYYY.MM.DD");
    }
    return commentDate.fromNow();
  };

  return (
    <div
      className={`flex w-full flex-col items-start gap-16 border-b-[0.2px] border-text-disabled ${
        isOptimistic || isPendingEdit ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <CommentEditInput
          initialContent={comment.content}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          isPending={isPendingEdit}
        />
      ) : (
        <>
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
        </>
      )}
      {isDeleteModalOpen && (
        <CommentDeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          commentId={comment.id}
          taskId={taskId}
          onDeleteSuccess={onDelete}
        />
      )}
    </div>
  );
};

const CommentList = ({
  comments,
  taskId,
  onDeleteComment,
  onEditComment,
  optimisticCommentId,
  editingCommentId,
  isPendingEdit,
}: CommentListProps) => {
  const sortedComments = [...comments].sort((a, b) =>
    dayjs(b.updatedAt).isAfter(dayjs(a.updatedAt)) ? 1 : -1,
  );

  return (
    <div className="flex min-w-350 flex-col gap-16 pt-5">
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          taskId={taskId}
          onDelete={onDeleteComment}
          onEdit={onEditComment}
          isOptimistic={comment.id === optimisticCommentId}
          isPendingEdit={isPendingEdit && comment.id === editingCommentId}
        />
      ))}
    </div>
  );
};

export default CommentList;
