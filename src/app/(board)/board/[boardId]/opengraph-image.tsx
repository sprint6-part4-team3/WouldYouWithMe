/* eslint-disable consistent-return */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import EMPTY_IMAGE from "@/constants/image";
import getBoardDetailData from "@/lib/api/board/get-board-detail-data";

export const runtime = "edge";

export const alt = "게시판 이미지";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const Image = async ({ params }: { params: { boardId: number } }) => {
  const { boardId } = params;

  try {
    const postData = await getBoardDetailData(boardId);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <img
            alt={postData.title}
            src={postData.image || EMPTY_IMAGE}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ),
    );
  } catch (error) {
    throw new Error("애러");
  }
};

export default Image;
