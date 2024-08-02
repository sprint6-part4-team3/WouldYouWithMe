import AddComment from "./_components/add-comment";
import BoardDetail from "./_components/board-detail";
import CommentList from "./_components/comment-list";
import ArticleTestData from "./article.json";
import CommentTestData from "./comment.json";

const BoardPage = () => (
  <>
    <BoardDetail
      articleData={ArticleTestData}
      commentCount={CommentTestData.list.length}
    />
    <AddComment />
    <CommentList commentListData={CommentTestData} />
  </>
);

export default BoardPage;
