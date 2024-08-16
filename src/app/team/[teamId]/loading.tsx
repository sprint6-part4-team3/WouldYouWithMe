"use client";

import Lottie from "lottie-react";

import TeamLoading from "@/public/assets/lotties/team-loading.json";

const PageLoading = () => (
  <div className="mt-50 flex flex-col items-center justify-center gap-10">
    <Lottie
      className="size-2/3 h-auto min-w-250 max-w-500"
      animationData={TeamLoading}
    />
    <div className="m-auto flex items-center justify-center">
      <span className="text-20-700">팀 정보 가져오는 중...</span>
    </div>
  </div>
);

export default PageLoading;
