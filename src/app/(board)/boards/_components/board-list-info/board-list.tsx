"use client";

import { BoardListType } from "@/types/board-list";

import BoardCard from "./board-card";

interface BoardListProps {
  boardData: BoardListType[];
}

const BoardList = ({ boardData }: BoardListProps) => (
  <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
    {boardData.map((board) => (
      <BoardCard key={board.id} board={board} />
    ))}
  </section>
);

export default BoardList;
