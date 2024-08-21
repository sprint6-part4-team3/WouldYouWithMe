/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import EMPTY_IMAGE from "@/constants/image";
import getBoardDetailData from "@/lib/api/board/get-board-detail-data";

export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const Image = async ({ params }: { params: { boardId: number } }) => {
  const { boardId } = params;

  const postData = await getBoardDetailData(boardId);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          alt={postData.title}
          src={postData.image || EMPTY_IMAGE}
          height="100"
        />
      </div>
    ),
  );
};

export default Image;
