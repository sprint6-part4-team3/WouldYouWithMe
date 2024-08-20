import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";

import getBoardDetailData from "@/lib/api/board/get-board-detail-data";

import EditBoardForm from "./edit-board-form";

const EditBoardPage = async ({ params }: { params: { boardId: number } }) => {
  const queryClient = new QueryClient();

  const { boardId } = params;
  const userId = cookies().get("userId")?.value;

  await queryClient.prefetchQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardDetailData(boardId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditBoardForm boardId={boardId} userId={userId} />
    </HydrationBoundary>
  );
};

export default EditBoardPage;
