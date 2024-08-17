"use client";

import Lottie from "lottie-react";

import TeamLoading from "@/public/assets/lotties/team-loading.json";

const PageLoading = () => (
  <div className="mt-50 flex flex-col items-center justify-center">
    <Lottie
      className="size-2/3 h-auto min-w-250 max-w-500"
      animationData={TeamLoading}
    />
    <div className="m-auto flex items-center justify-center gap-10">
      <div>Loading</div>
    </div>
  </div>
);

export default PageLoading;
