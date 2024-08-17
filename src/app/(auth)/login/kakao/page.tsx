"use client";

import PageLoading from "@/components/loading";
import KakaoAuth from "@/lib/api/oauth/kakao-auth";

const Kakao = () => (
  <div>
    <PageLoading />
    <KakaoAuth />
  </div>
);

export default Kakao;
