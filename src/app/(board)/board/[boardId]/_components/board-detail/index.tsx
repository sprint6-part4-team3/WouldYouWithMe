import Link from "next/link";

import { Button } from "@/components/common";
import { IconComment, IconHeart, IconProfile } from "@/public/assets/icons";
import { ArticleResponse } from "@/types/article";
import dateToString from "@/utils/date-to-string";

import BoardDropDown from "./board-drop-down";

interface BoardDetailProps {
  articleData: ArticleResponse;
  commentCount: number;
}

const BoardDetail = ({ articleData, commentCount }: BoardDetailProps) => (
  <article className="mt-56">
    <div className="flex items-center justify-between">
      <h1 className="text-20-500 text-text-secondary md:text-24-500">
        {articleData.title}
      </h1>
      {/** TODO: 현재 유저와 게시물 작성자 같으면 드롭다운 */}
      <BoardDropDown />
    </div>

    <div className="my-16 h-1 w-full bg-border-primary/10" />

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8 text-12-500 md:text-14-500">
        {/** FIXME: 작성자의 프로필 사진이 API에 없음 */}
        <IconProfile />
        <span>{articleData.writer.nickname}</span>
        <div className="h-12 w-1 bg-background-tertiary" />
        <time
          className="text-text-disabled"
          dateTime={dateToString(articleData.createdAt)}
        >
          {dateToString(articleData.createdAt)}
        </time>
      </div>
      <div className="flex items-center gap-8 text-12-400 text-text-disabled md:text-14-400">
        <div className="flex gap-4">
          <IconComment />
          <span>{commentCount}</span>
        </div>
        <div className="flex gap-4">
          <IconHeart />
          <span>{articleData.likeCount}</span>
        </div>
      </div>
    </div>

    <p className="mb-80 mt-48 text-14-400 leading-[24px] text-text-secondary md:text-16-400 md:leading-[28px]">
      {/** TODO: 게시물 이미지 보여주기 */}
      {articleData.content}
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
