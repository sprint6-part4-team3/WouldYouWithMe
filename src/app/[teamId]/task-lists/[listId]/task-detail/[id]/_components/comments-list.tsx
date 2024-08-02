import React from "react";

import { IconButton } from "@/components/common";
import { IconProfile } from "@/public/assets/icons";
import { Comment } from "@/types/comments/index";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <div className="flex flex-col gap-16 p-12">
    {comments.map((comment) => (
      <div
        key={comment.id}
        className="flex w-full flex-col items-start gap-16 border-b-[0.2px] border-text-disabled"
      >
        <div className="flex items-start justify-between self-stretch text-14-400">
          {comment.content}
          <IconButton variant="none" icon="IconKebab" />
        </div>
        <div className="mb-12 flex items-center justify-between self-stretch text-14-500 text-text-primary">
          <div className="flex items-center">
            <IconProfile className="mr-12" />
            <span className="text-14-500 text-text-primary">
              {comment.user.nickname}
            </span>
          </div>
          <span className="text-14-400 text-text-secondary">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default CommentList;
