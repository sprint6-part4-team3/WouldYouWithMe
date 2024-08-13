"use client";

import Lottie from "lottie-react";

import EmptyAnimation from "@/public/assets/lotties/empty.json";

const EmptyComment = () => (
  <div className="flex flex-col items-center gap-24">
    <Lottie
      style={{ width: "60%", height: "60%", maxWidth: "350px" }}
      animationData={EmptyAnimation}
    />
    <span className="text-16-700 text-text-disabled">
      아직 작성된 댓글이 없습니다.
    </span>
  </div>
);

export default EmptyComment;
