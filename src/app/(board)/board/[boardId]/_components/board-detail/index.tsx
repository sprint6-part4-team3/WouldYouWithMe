"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useAtom } from "jotai";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/common";
import EMPTY_IMAGE from "@/constants/image";
import FIREBASE_DB from "@/firebase";
import getBoardDetailData from "@/lib/api/board/get-board-detail-data";
import { IconComment } from "@/public/assets/icons";
import { userAtom } from "@/stores";
import formatBoardDate from "@/utils/format-board-date";

import BoardDropDown from "./board-drop-down";
import BoardLike from "./board-like";
import CopyTeamToken from "./copy-team-token";

interface BoardDetailProps {
  userId: number;
  boardId: number;
  initialViewCount: number;
}

const BoardDetail = ({
  userId,
  boardId,
  initialViewCount,
}: BoardDetailProps) => {
  const router = useRouter();
  const [previousPage, setPreviousPage] = useState<string | null>("");
  const [viewCount, setViewCount] = useState<number>(initialViewCount);

  const [user] = useAtom(userAtom);

  const isLogin = useMemo(() => user.id !== 0, [user]);

  useEffect(() => {
    const storage = globalThis?.sessionStorage;

    if (!storage) {
      return;
    }

    const previousUrl = storage.getItem("PREVIOUS_URL");

    setPreviousPage(previousUrl);
  }, []);

  useEffect(() => {
    const getViewCount = async () => {
      const docRef = doc(FIREBASE_DB, "boards", boardId.toString());

      // 조회수 가져오기 및 업데이트
      const boardDb = await getDoc(docRef);
      if (boardDb.exists()) {
        const currentViewCount = boardDb.data().viewCount + 1;
        setViewCount(currentViewCount);
        await updateDoc(docRef, { viewCount: currentViewCount });
      }
    };

    getViewCount();
  }, [boardId]);

  const { data: boardData, error } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardDetailData(boardId),
  });

  if (!boardData) {
    return redirect("/not-found");
  }

  if (error) {
    return redirect("/error");
  }

  const parsedContent = JSON.parse(boardData.content);

  const handleButtonClickBack = () => {
    if (previousPage && previousPage.startsWith("/boards")) {
      router.push(previousPage);
    } else {
      router.push("/boards");
    }
  };

  return (
    <article className="mt-56">
      <div className="flex items-center justify-between">
        <h1 className="text-20-500 text-text-secondary md:text-24-500">
          {boardData.title}
        </h1>
        {userId === boardData.writer.id && <BoardDropDown boardId={boardId} />}
      </div>

      <div className="my-16 h-1 w-full bg-border-primary/10" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 text-12-500 md:text-14-500">
          <span>{boardData.writer.nickname}</span>
          <div className="h-12 w-1 bg-background-tertiary" />
          <time
            className="text-text-disabled"
            dateTime={formatBoardDate(boardData.createdAt)}
          >
            {formatBoardDate(boardData.createdAt)}
          </time>
          {boardData.createdAt !== boardData.updatedAt && (
            <span className="text-text-default">(수정됨)</span>
          )}
          <div className="h-12 w-1 bg-background-tertiary" />
          <span>조회수</span>
          <span className="text-text-default">{viewCount}</span>
        </div>

        <div className="flex items-center gap-8 text-12-400 text-text-disabled md:text-14-400">
          <div className="flex min-w-30 items-center gap-4">
            <IconComment />
            <span>{boardData.commentCount}</span>
          </div>
          <div className="flex min-w-30 gap-4">
            <span
              className={clsx("text-18", {
                "text-brand-primary": boardData.isLiked,
              })}
            >
              ♥
            </span>
            <span>{boardData.likeCount}</span>
          </div>
        </div>
      </div>

      <CopyTeamToken isLogin={isLogin} token={parsedContent.token} />

      {boardData.image && boardData.image !== EMPTY_IMAGE && (
        <div className="mt-40 flex w-327 md:w-360">
          <Image
            alt="게시물 이미지"
            src={boardData.image}
            width={0}
            height={0}
            sizes="100vw"
            onDragStart={(e) => e.preventDefault()}
            className="h-auto min-h-200 min-w-327"
          />
        </div>
      )}

      <p className="my-40 whitespace-pre-line text-14-400 leading-[24px] text-text-secondary md:text-16-400 md:leading-[28px]">
        {parsedContent.content}
      </p>

      <div className="mb-24 flex items-center justify-center gap-24">
        <BoardLike
          isLogin={isLogin}
          isLiked={boardData.isLiked}
          boardId={boardId}
          likeCount={boardData.likeCount}
        />

        <Button
          onClick={handleButtonClickBack}
          className="h-36 w-100 text-14 md:h-48 md:w-120 md:text-16"
          variant="noFill"
        >
          목록으로
        </Button>
      </div>
    </article>
  );
};
export default BoardDetail;
