"use client";

import Lottie from "lottie-react";

import BoardEmptyAnimation from "@/public/assets/lotties/board-list-empty.json";

const BoardEmpty = ({ keyword }: { keyword: string }) => (
  <div className="mb-60 flex flex-col items-center justify-center gap-12">
    <Lottie className="size-400" animationData={BoardEmptyAnimation} />
    <span className="text-18-500">
      &quot;<span className="text-brand-primary">{keyword}</span>&quot; 검색
      결과가 없습니다
    </span>
  </div>
);

export default BoardEmpty;
