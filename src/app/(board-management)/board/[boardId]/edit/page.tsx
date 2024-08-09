import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import getBoardDetailData from "@/lib/api/board/get-board-detail-data";
import { BoardAddEditInput } from "@/types/board/add-edit";

import EditBoardForm from "./edit-board-form"; // 올바른 상대 경로

const EditBoardPage = async ({ params }: { params: { boardId: number } }) => {
  const { boardId } = params;
  const userId = cookies().get("userId")?.value;

  try {
    const res = await getBoardDetailData(boardId);

    if (res.writer.id !== Number(userId)) {
      return redirect("/not-found");
    }

    const parsedContent = JSON.parse(res.content);

    const initialData: BoardAddEditInput = {
      title: res.title,
      content: {
        content: parsedContent.content,
        token: parsedContent.token,
      },
      ...(res.image && { image: res.image }),
    };

    return <EditBoardForm initialData={initialData} />;
  } catch (error) {
    return redirect("/error");
  }
};

export default EditBoardPage;
