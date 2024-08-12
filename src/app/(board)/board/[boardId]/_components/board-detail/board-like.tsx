"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { useState } from "react";

import likeBoard from "@/lib/api/board/like-board";
import unlikeBoard from "@/lib/api/board/unlike-board";
import BrokeHeartAnimation from "@/public/assets/lotties/broke-heart.json";
import HeartAnimation from "@/public/assets/lotties/heart.json";
import { BoardResponse } from "@/types/board";

interface BoardLikeProps {
  isLiked: boolean;
  boardId: number;
  likeCount: number;
}

const BoardLike = ({ isLiked, boardId, likeCount }: BoardLikeProps) => {
  const [showLottie, setShowLottie] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (userAction: "UNLIKE" | "LIKE") => {
      if (userAction === "LIKE") {
        await likeBoard(boardId);
      } else {
        await unlikeBoard(boardId);
      }
    },
    onMutate: async (userAction) => {
      await queryClient.cancelQueries({ queryKey: ["board", boardId] });

      const prevData = queryClient.getQueryData(["board", boardId]);

      queryClient.setQueryData(["board", boardId], (prev: BoardResponse) => ({
        ...prev,
        likeCount:
          userAction === "LIKE" ? prev.likeCount + 1 : prev.likeCount - 1,
        isLiked: userAction === "LIKE",
      }));

      return { prevData };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["board", boardId], context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["board", boardId],
      });
    },
  });

  const handleLikeClick = (userAction: "UNLIKE" | "LIKE") => {
    setShowLottie(true);
    mutate(userAction);

    setTimeout(() => {
      setShowLottie(false);
    }, 1000);
  };

  return (
    <div className="relative flex min-w-50 items-center gap-8">
      <button
        type="submit"
        className={`cursor-pointer text-30 ${isLiked ? "text-brand-primary" : "text-text-disabled"}`}
        onClick={() => handleLikeClick(isLiked ? "UNLIKE" : "LIKE")}
      >
        ♥
      </button>
      <span className="text-16-500">{likeCount}</span>

      <AnimatePresence>
        {showLottie && (
          <motion.div
            className="fixed inset-0 m-auto size-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {isLiked ? (
              <Lottie animationData={HeartAnimation} />
            ) : (
              <Lottie animationData={BrokeHeartAnimation} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BoardLike;
