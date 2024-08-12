"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import getBoardComment from "@/lib/api/board-comment/get-comment";
import { LoadingSpinner } from "@/public/assets/icons";

import Comment from "./comment";
import EmptyComment from "./empty-comment";

interface CommentListProps {
  boardId: number;
}

const CommentList = ({ boardId }: CommentListProps) => {
  const {
    data: commentListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["board-comment", boardId],
    queryFn: ({ pageParam }) => getBoardComment(boardId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const handleScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const throttledScrollHandler = () => {
      handleScroll();
    };

    window.addEventListener("scroll", throttledScrollHandler);

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [handleScroll]);

  return (
    <section
      className={`flex flex-col gap-16 ${isFetchingNextPage ? "mb-20" : "mb-70"}`}
    >
      {commentListData?.pages[0].list.length ? (
        <>
          {commentListData.pages.map((page) =>
            page.list.map((comment) => (
              <Comment key={comment.id} commentData={comment} />
            )),
          )}

          {isFetchingNextPage && (
            <div className="flex w-full items-center justify-center gap-6">
              <LoadingSpinner width={40} height={40} />
              <span>댓글 불러오는 중...</span>
            </div>
          )}
        </>
      ) : (
        <EmptyComment />
      )}
    </section>
  );
};

export default CommentList;
