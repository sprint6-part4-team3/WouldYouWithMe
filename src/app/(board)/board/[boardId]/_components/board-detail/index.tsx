import Link from "next/link";

import { Button } from "@/components/common";
import { IconComment, IconHeart, IconProfile } from "@/public/assets/icons";

import BoardDropDown from "./board-drop-down";

const BoardDetail = () => (
  <article className="mt-56">
    <div className="flex items-center justify-between">
      <h1 className="text-20-500 text-text-secondary md:text-24-500">
        게시물 제목 영역입니다.
      </h1>
      <BoardDropDown />
    </div>

    <div className="my-16 h-1 w-full bg-border-primary/10" />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8 text-12-500 md:text-14-500">
        <IconProfile />
        <span>우지은</span>
        <div className="h-12 w-1 bg-background-tertiary" />
        <span className="text-text-disabled">2024. 07. 25</span>
      </div>
      <div className="flex items-center gap-8 text-12-400 text-text-disabled md:text-14-400">
        <div className="flex gap-4">
          <IconComment />
          <span>3</span>
        </div>
        <div className="flex gap-4">
          <IconHeart />
          <span>999</span>
        </div>
      </div>
    </div>

    <p className="mb-80 mt-48 text-14-400 leading-[24px] text-text-secondary md:text-16-400 md:leading-[28px]">
      본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는
      영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이
      들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는
      영역입니다. 본문이 들어가는 영역입니다.
    </p>

    <Link href="/boards" className="mb-24 flex justify-center">
      <Button
        className="h-36 w-100 text-14 md:h-48 md:w-120 md:text-16"
        variant="noFill"
      >
        목록으로
      </Button>
    </Link>
  </article>
);
export default BoardDetail;
