import { ArticleCommentListResponse } from "@/types/board/comment";

import Comment from "./comment";
import EmptyComment from "./empty-comment";

interface CommentListProps {
  commentListData: ArticleCommentListResponse;
}

const CommentList = ({ commentListData }: CommentListProps) => (
  <section className="mb-60 flex flex-col gap-16">
    {commentListData.list.length !== 0 ? (
      <>
        {commentListData.list.map((comment) => (
          <Comment key={comment.id} commentData={comment} />
        ))}
      </>
    ) : (
      <EmptyComment />
    )}
  </section>
);

export default CommentList;
