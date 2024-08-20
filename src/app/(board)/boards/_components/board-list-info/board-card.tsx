"use client";

import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import EMPTY_IMAGE from "@/constants/image";
import { useToast } from "@/hooks";
import { IconComment, IconHeart } from "@/public/assets/icons";
import { userAtom } from "@/stores";
import { BoardListType } from "@/types/board-list";
import formatBoardDate from "@/utils/format-board-date";

interface BoardCardProps {
  board: BoardListType;
}

const BoardCard = ({ board }: BoardCardProps) => {
  const toast = useToast();
  const [user] = useAtom(userAtom);

  const isLogin = useMemo(() => user.id !== 0, [user]);

  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      key={board.id}
    >
      <Link
        prefetch
        className="group flex h-250 flex-col gap-12 rounded-2xl border border-text-disabled bg-background-secondary"
        href={`/board/${board.id}`}
        onClick={(e) => {
          if (!isLogin) {
            e.preventDefault();
            toast.error("로그인 후 이용해주세요");
            /** INFO: 미들웨어 있으면 굳이 로그인 페이지로 이동 안해도 될 듯 */
          }
        }}
      >
        <div className="relative h-150 w-full">
          <Image
            src={board.image || EMPTY_IMAGE}
            alt={`${board.title} 게시물 이미지`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            onDragStart={(e) => e.preventDefault()}
            className="rounded-se-2xl rounded-ss-2xl border-b  border-text-disabled object-cover"
          />
        </div>
        <div className="flex flex-col gap-8 px-12">
          <span className="text-12-500 text-text-disabled md:text-13-500">
            작성일 | {formatBoardDate(board.createdAt)}
          </span>
          <h3 className="group-hover truncate text-18-700 md:text-20-700">
            {board.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-13-500 text-text-secondary md:text-14-700">
              {board.writer.nickname}
            </span>
            <div className="flex items-center gap-6 text-13-500 md:text-14-500">
              <IconComment />
              <span>{board.commentCount}</span>
              <IconHeart />
              <span>{board.likeCount}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BoardCard;
