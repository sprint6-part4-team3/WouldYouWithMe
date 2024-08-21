"use client";

import Lottie from "lottie-react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

import { Button } from "@/components/common";
import notfound from "@/public/assets/lotties/500.json";

export const metadata: Metadata = {
  title: "500에러 | 우주윗미",
  description: "500 서버에러 페이지 입니다",
};

const Error = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="px-4 text-center">
        <h1 className="mb-20 font-[PyeongChangPeace-Bold] text-48-600">500</h1>
        <h2 className="mb-10 font-[PyeongChangPeace-Bold] text-18-400">
          서버 오류가 발생했습니다
        </h2>
        <div className="mx-auto mb-8 size-250">
          <Lottie animationData={notfound} loop autoplay />
        </div>
        <p className="font-body mb-20 font-[PyeongChangPeace-Bold] text-18-400 ">
          죄송합니다. 현재 서버에 문제가 발생했습니다. <br />
          잠시 후 다시 시도해 주세요.
        </p>
        <div className="flex justify-center">
          <Button
            variant="primary"
            className="h-45 w-200 "
            onClick={() => router.push("/")}
          >
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
