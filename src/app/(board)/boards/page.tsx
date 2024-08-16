import Link from "next/link";

import { Button } from "@/components/common";

import BoardListInfo from "./_components/board-list-info";
import Carousel from "./_components/carousel";
import carouselItem from "./_data/carouselItems";

const BoardPage = () => (
  <div className="mt-40 flex flex-col gap-40">
    <div className="flex items-center justify-between">
      <div className="flex gap-16 sm:flex-col md:items-center">
        <h1 className="text-24-700">자유게시판</h1>
        <p className="text-14-500 text-text-disabled">
          같이 일정관리 할 팀원들을 모집해봐요
        </p>
      </div>
      <Link href="/create-board">
        <Button
          className="h-40 w-90 border-2 md:w-110 lg:h-45 lg:w-130"
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
