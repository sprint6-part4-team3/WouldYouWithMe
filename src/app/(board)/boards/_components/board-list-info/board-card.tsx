"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import EMPTY_IMAGE from "@/constants/image";
import { IconComment, IconHeart } from "@/public/assets/icons";
import { BoardListType } from "@/types/board-list";
import formatBoardDate from "@/utils/format-board-date";

interface BoardCardProps {
  board: BoardListType;
}

const BoardCard = ({ board }: BoardCardProps) => (
  <motion.article
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    key={board.id}
  >
    <Link
      className="group flex h-250 flex-col gap-12 rounded-2xl border border-text-disabled bg-background-secondary"
      href={`/board/${board.id}`}
    >
      <div className="relative h-150 w-full">
        <Image
          src={board.image || EMPTY_IMAGE}
          alt="게시물 이미지"
          fill
          onDragStart={(e) => e.preventDefault()}
          className="rounded-se-2xl rounded-ss-2xl border-b  border-text-disabled object-cover"
        />
      </div>
      <div className="flex flex-col gap-8 px-12">
        <span className="text-13-500 text-text-disabled">
          작성일 | {formatBoardDate(board.createdAt)}
        </span>
        <h3 className="group-hover truncate text-20-700">{board.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-14-700 text-text-secondary">
            {board.writer.nickname}
          </span>
          <div className="flex items-center gap-6 text-14-500">
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

export default BoardCard;
