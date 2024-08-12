"use client";

import { useAtom } from "jotai";
import Image from "next/image";

import { IconProfile } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { BoardCommentResponse } from "@/types/board/comment";
import formatBoardDate from "@/utils/format-board-date";

import CommentDropDown from "./comment-drop-down";

interface CommentProps {
  commentData: BoardCommentResponse;
}

const Comment = ({ commentData }: CommentProps) => {
  const [user] = useAtom(userAtom);

  return (
    <div className="flex flex-col gap-32 rounded-8 bg-background-secondary p-16">
      <div className="flex items-center justify-between gap-12">
        <span className="text-14-400 leading-[21px]">
          {commentData.content}
        </span>
        {user.id === commentData.writer.id && (
          <CommentDropDown commentId={commentData.id} />
        )}
      </div>
      <div className="flex items-center">
        {commentData.writer.image ? (
          <Image
            src={commentData.writer.image}
            alt={`${commentData.writer.nickname}의 프로필 사진`}
            width={32}
            height={32}
            className="rounded-full object-fill"
          />
        ) : (
          <IconProfile />
        )}
        <span className="ml-6 text-14-500 md:ml-12">
          {commentData.writer.nickname}
        </span>
        <div className="mx-8 h-12 w-1 bg-background-tertiary md:mx-16" />
        <time
          className="text-disabled text-14-500"
          dateTime={formatBoardDate(commentData.createdAt)}
        >
          {formatBoardDate(commentData.createdAt)}
        </time>
      </div>
    </div>
  );
};

export default Comment;
