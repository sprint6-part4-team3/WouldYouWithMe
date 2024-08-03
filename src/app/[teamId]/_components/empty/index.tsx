"use client";

import Lottie from "lottie-react";
import Link from "next/link";

import { Button } from "@/components/common";
import TeamEmpty from "@/public/assets/lotties/team-empty.json";

const Empty = () => (
  <div className="flex h-screen flex-col items-center justify-center pb-50">
    <Lottie
      className="size-2/3 h-auto min-w-250 max-w-500"
      animationData={TeamEmpty}
    />

    <div className="mb-48 mt-8 flex flex-col items-center text-14-500 text-text-default md:mb-80 md:mt-24 lg:text-16-500">
      <span>아직 소속된 팀이 없습니다.</span>
      <span>팀을 생성하거나 팀에 참여해보세요</span>
    </div>

    <div className="flex flex-col gap-8 lg:gap-16">
      <Link href="/addteam">
        <Button className="h-48 w-186 text-14 lg:text-16" variant="primary">
          팀 생성하기
        </Button>
      </Link>
      {/** FIXME: 노션에 해당 페이지 주소가 없어서 일단 임시로 아무거나 했습니다. */}
      <Link href="/addteam">
        <Button className="h-48 w-186 text-14 lg:text-16" variant="noFill">
          팀 참여하기
        </Button>
      </Link>
    </div>
  </div>
);

export default Empty;
