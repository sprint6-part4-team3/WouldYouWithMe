import { IconProfile } from "@/public/assets/icons";
import { BoardCommentResponse } from "@/types/board/comment";
import formatBoardDate from "@/utils/format-board-date";

import CommentDropDown from "./comment-drop-down";

interface CommentProps {
  commentData: BoardCommentResponse;
}

const Comment = ({ commentData }: CommentProps) => (
  <div className="flex flex-col gap-32 rounded-8 bg-background-secondary p-16">
    <div className="flex items-center justify-between gap-12">
      <span className="text-14-400 leading-[21px]">{commentData.content}</span>
      {/** TODO: 댓글 작성자만 드롭다운 보이게 */}
      <CommentDropDown />
    </div>
    <div className="flex items-center">
      {/** TODO: image 있으면 프로필 사진으로 보여줌 */}
      {commentData.writer.image ? <IconProfile /> : <IconProfile />}
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

export default Comment;
