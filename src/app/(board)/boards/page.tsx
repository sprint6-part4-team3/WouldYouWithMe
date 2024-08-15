import Link from "next/link";

import { Button } from "@/components/common";
import { IconCodeit } from "@/public/assets/icons";

import BoardListInfo from "./_components/board-list-info";
import Carousel from "./_components/carousel";

const carouselItem = [
  {
    tag: "Info",
    title: "코드잇 스프린트",
    description: "프론트엔드 개발자로 취업하는 가장 빠른 부트캠프",
    icon: (
      <IconCodeit className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200" />
    ),
    background: "bg-point-purple",
  },
  {
    tag: "Info",
    title: "팀원 모집은 우주윗미!",
    description: "같이 스터디 일정관리 할 팀원을 구하고 싶어요",
    icon: (
      <IconCodeit className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200" />
    ),
    background: "bg-point-orange",
  },
  {
    tag: "Info",
    title: "팀 생성은 우주윗미!",
    description: "새로운 팀을 만들고 싶어요",
    icon: (
      <IconCodeit className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200" />
    ),
    background: "bg-point-pink",
  },
  {
    tag: "Info",
    title: "오늘의 명언",
    description: "“ 외국어 보다 코딩을 먼저 배워라. ”",
    icon: (
      <IconCodeit className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200" />
    ),
    background: "bg-point-blue",
  },
];

const BoardPage = () => (
  <div className="mt-40 flex flex-col gap-40">
    <div className="flex items-center justify-between">
      <div className="flex gap-16 sm:flex-col md:items-center">
        <h1 className="text-24-700">자유게시판</h1>
        <p className="text-14-500 text-text-disabled">
          같이 일정관리 할 팀원들을 모집해봐요
        </p>
      </div>
      <Link href="create-board">
        <Button
          className="h-40 w-90 md:w-110 lg:h-45 lg:w-130"
          variant="noFill"
        >
          게시글 작성
        </Button>
      </Link>
    </div>

    <Carousel items={carouselItem} />

    <BoardListInfo />
  </div>
);

export default BoardPage;
