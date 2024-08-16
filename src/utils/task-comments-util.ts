import { Comment } from "@/types/comments/index";

const getCommentsToDisplay = (
  comments: Comment[],
  optimisticComment: Comment | null,
  optimisticEditComment: Comment | null,
) => {
  if (optimisticComment) {
    return [optimisticComment, ...comments];
  }
  if (optimisticEditComment) {
    return comments.map((c) =>
      c.id === optimisticEditComment.id ? optimisticEditComment : c,
    );
  }
  return comments;
};

export default getCommentsToDisplay;
