import AddComment from "./_components/add-comment";
import BoardDetail from "./_components/board-detail";
import CommentList from "./_components/comment-list";

const BoardPage = () => (
  <>
    <BoardDetail />
    <AddComment />
    <CommentList />
  </>
);

export default BoardPage;
