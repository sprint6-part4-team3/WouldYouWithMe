"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

import getBoardComment from "@/lib/api/board-comment/get-comment";
import { LoadingSpinner } from "@/public/assets/icons";

import Comment from "./comment";
import EmptyComment from "./empty-comment";

interface CommentListProps {
  boardId: number;
}

const CommentList = ({ boardId }: CommentListProps) => {
  const [editMode, setEditMode] = useState<number | null>(null);
  const [isVisibleScrollTop, setIsVisibleScrollTop] = useState(false);

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
      window.scrollY + window.innerHeight >= document.body.scrollHeight - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }

    if (window.innerHeight < document.body.scrollHeight) {
      setIsVisibleScrollTop(true);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      className={`flex flex-col gap-16 ${isFetchingNextPage ? "mb-20" : "mb-50"}`}
    >
      {commentListData?.pages[0].list.length ? (
        <>
          {commentListData.pages.map((page) =>
            page.list.map((comment) => (
              <Comment
                key={comment.id}
                commentData={comment}
                isEditMode={editMode === comment.id}
                setEditMode={setEditMode}
              />
            )),
          )}

          {isFetchingNextPage && (
            <div className="flex w-full items-center justify-center gap-6">
              <LoadingSpinner width={40} height={40} />
              <span>댓글 불러오는 중...</span>
            </div>
          )}

          {isVisibleScrollTop && !hasNextPage && (
            <button
              className="mx-auto mt-30 flex size-50 items-center justify-center rounded-full border-4 border-brand-primary"
              type="button"
              onClick={scrollToTop}
            >
              ▲
            </button>
          )}
        </>
      ) : (
        <EmptyComment />
      )}
    </section>
  );
};

export default CommentList;
