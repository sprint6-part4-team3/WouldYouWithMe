import { cookies } from "next/headers";

import getBoardDetailData from "@/lib/api/board/get-board-detail-data";

import AddComment from "./_components/add-comment";
import BoardDetail from "./_components/board-detail";
import CommentList from "./_components/comment-list";
import CommentTestData from "./comment.json";

const BoardPage = async ({ params }: { params: { boardId: number } }) => {
  const { boardId } = params;
  const userId = cookies().get("userId")?.value;

  try {
    const res = await getBoardDetailData(boardId);

    return (
      <>
        <BoardDetail
          boardData={res}
          userId={Number(userId)}
          boardId={boardId}
        />
        <AddComment />
        <CommentList commentListData={CommentTestData} />
      </>
    );
  } catch (error) {
    return {
      notFound: true, // error 페이지로 감
    };
  }
};

export default BoardPage;
