import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

import getBoardDetailData from "@/lib/api/board/get-board-detail-data";
import getBoardComment from "@/lib/api/board-comment/get-comment";

import BoardDetail from "./_components/board-detail";
import CommentList from "./_components/comment-list";

const BoardPage = async ({ params }: { params: { boardId: number } }) => {
  const queryClient = new QueryClient();

  const { boardId } = params;
  const userId = cookies().get("userId")?.value;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["board", boardId],
      queryFn: () => getBoardDetailData(boardId),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["board-comment", boardId],
      queryFn: ({ pageParam }) => getBoardComment(boardId, pageParam),
      initialPageParam: 0,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardDetail userId={Number(userId)} boardId={boardId} />
      <CommentList boardId={boardId} />
    </HydrationBoundary>
  );
};

export default BoardPage;
