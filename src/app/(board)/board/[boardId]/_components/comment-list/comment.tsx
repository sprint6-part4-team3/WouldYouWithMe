"use client";

import { useAtom } from "jotai";
import Image from "next/image";

import { IconProfile } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { BoardCommentResponse } from "@/types/board/comment";
import formatCommentDate from "@/utils/format-comment-date";

import CommentDropDown from "./comment-drop-down";
import CommentEditMode from "./comment-edit-mode";

interface CommentProps {
  isSampleMode?: boolean;
  commentData: BoardCommentResponse;
  isEditMode: boolean;
  setEditMode: (id: number | null) => void;
}

const Comment = ({
  isSampleMode = false,
  commentData,
  isEditMode,
  setEditMode,
}: CommentProps) => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      {isEditMode ? (
        <CommentEditMode
          setIsEditMode={setEditMode}
          commentId={commentData.id}
          comment={commentData.content}
        />
      ) : (
        <div className="flex flex-col gap-32 rounded-8 bg-background-secondary p-16">
          <div className="flex justify-between gap-12">
            <span
              className={`w-full whitespace-pre-wrap break-words text-14-400 leading-[21px] ${user.id === commentData.writer.id ? "w-[96%]" : "w-full"}`}
            >
              {commentData.content}
            </span>
            {user.id === commentData.writer.id && !isSampleMode && (
              <CommentDropDown
                commentId={commentData.id}
                setIsEditMode={setEditMode}
              />
            )}
          </div>
          <div className="flex items-center">
            <div className="relative size-32">
              {commentData.writer.image &&
              commentData.writer.image !== "Invalid Date" ? (
                <Image
                  fill
                  src={commentData.writer.image}
                  alt={`${commentData.writer.nickname}프로필 사진`}
                  className="rounded-full object-cover"
                />
              ) : (
                <IconProfile />
              )}
            </div>
            <span className="ml-6 text-14-500 md:ml-12">
              {commentData.writer.nickname}
            </span>
            <div className="mx-8 h-12 w-1 bg-background-tertiary md:mx-16" />
            <time
              className="text-disabled text-14-500"
              dateTime={formatCommentDate(commentData.createdAt)}
            >
              {formatCommentDate(commentData.createdAt)}
            </time>
            {commentData.createdAt !== commentData.updatedAt && (
              <span className="ml-6 text-12-400 text-text-default">
                (수정됨)
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
