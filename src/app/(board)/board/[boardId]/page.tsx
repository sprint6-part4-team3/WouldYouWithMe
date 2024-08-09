import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

import getBoardDetailData from "@/lib/api/board/get-board-detail-data";

import AddComment from "./_components/add-comment";
import BoardDetail from "./_components/board-detail";
import CommentList from "./_components/comment-list";
import CommentTestData from "./comment.json";

const BoardPage = async ({ params }: { params: { boardId: number } }) => {
  const queryClient = new QueryClient();

  const { boardId } = params;
  const userId = cookies().get("userId")?.value;

  await queryClient.prefetchQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardDetailData(boardId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardDetail userId={Number(userId)} boardId={boardId} />
      <AddComment />
      <CommentList commentListData={CommentTestData} />
    </HydrationBoundary>
  );
};

export default BoardPage;
