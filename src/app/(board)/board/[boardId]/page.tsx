import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Head from "next/head";
import { cookies } from "next/headers";

import EMPTY_IMAGE from "@/constants/image";
import getBoardDetailData from "@/lib/api/board/get-board-detail-data";
import getBoardComment from "@/lib/api/board-comment/get-comment";

import BoardDetail from "./_components/board-detail";
import CommentList from "./_components/comment-list";

const BoardPage = async ({ params }: { params: { boardId: number } }) => {
  const queryClient = new QueryClient();

  const { boardId } = params;
  const userId = cookies().get("userId")?.value;

  const [boardData] = await Promise.all([
    queryClient.fetchQuery({
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
    <>
      <Head>
        <meta property="og:title" content={boardData?.title ?? "게시판"} />
        <meta
          property="og:description"
          content={boardData?.content ?? "게시물 내용"}
        />
        <meta property="og:image" content={boardData?.image || EMPTY_IMAGE} />
        <meta
          property="og:url"
          content={`https://example.com/boards/${boardId}`}
        />
      </Head>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <BoardDetail userId={Number(userId)} boardId={boardId} />
        <CommentList boardId={boardId} />
      </HydrationBoundary>
    </>
  );
};

export default BoardPage;
