"use client";

import Lottie from "lottie-react";
import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/common";
import TeamEmpty from "@/public/assets/lotties/team-empty.json";

export const metadata: Metadata = {
  title: "팀 없음 | 우주윗미",
  description: "팀이 없을때 페이지",
};

const TeamEmptyPage = () => (
  <div className="flex h-full flex-col items-center justify-center pt-20">
    <Lottie
      className="size-2/3 h-auto min-w-250 max-w-500"
      animationData={TeamEmpty}
    />

    <div className="mb-48 mt-8 flex flex-col items-center text-14-500 text-text-default md:mb-80 md:mt-24 lg:text-16-500">
      <span>아직 소속된 팀이 없습니다.</span>
      <span>팀을 생성하거나 팀에 참여해보세요</span>
    </div>

    <div className="flex flex-col gap-8 lg:gap-16">
      <Link href="/create-team">
        <Button className="h-48 w-186 text-14 lg:text-16" variant="primary">
          팀 생성하기
        </Button>
      </Link>
      <Link href="/join-team">
        <Button className="h-48 w-186 text-14 lg:text-16" variant="noFill">
          팀 참여하기
        </Button>
      </Link>
    </div>
  </div>
);

export default TeamEmptyPage;
