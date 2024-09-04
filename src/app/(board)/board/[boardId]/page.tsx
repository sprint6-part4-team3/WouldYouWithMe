import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Metadata } from "next";
import { cookies } from "next/headers";

import FIREBASE_DB from "@/firebase";
import getBoardDetailData from "@/lib/api/board/get-board-detail-data";
import getBoardComment from "@/lib/api/board-comment/get-comment";

import BoardDetail from "./_components/board-detail";
import CommentList from "./_components/comment-list";

export async function generateMetadata({
  params,
}: {
  params: { boardId: number };
}): Promise<Metadata> {
  const { boardId } = params;
  const boardData = await getBoardDetailData(boardId);

  let { title } = boardData;

  title = `${title} | 우주윗미`;

  return {
    title,
  };
}

const BoardPage = async ({ params }: { params: { boardId: number } }) => {
  const queryClient = new QueryClient();

  const { boardId } = params;
  const userId = cookies().get("userId")?.value;
  let viewCount = 1;

  const docRef = doc(FIREBASE_DB, "boards", boardId.toString());

  const boardDb = await getDoc(docRef);
  const boardData = boardDb.data();

  if (boardData) {
    const currentViewCount = boardData.viewCount + 1;
    viewCount = currentViewCount;
    updateDoc(docRef, { viewCount: currentViewCount });
  } else {
    await setDoc(docRef, { viewCount: 1 });
  }

  await Promise.all([
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardDetail
        viewCount={viewCount}
        userId={Number(userId)}
        boardId={boardId}
      />
      <CommentList boardId={boardId} />
    </HydrationBoundary>
  );
};

export default BoardPage;
