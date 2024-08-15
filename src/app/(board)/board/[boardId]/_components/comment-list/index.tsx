"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import getBoardComment from "@/lib/api/board-comment/get-comment";
import { LoadingSpinner } from "@/public/assets/icons";
import { BoardCommentResponse } from "@/types/board/comment";
import scrollToTop from "@/utils/scroll-to-top";

import AddComment from "./add-comment";
import Comment from "./comment";
import EmptyComment from "./empty-comment";

interface CommentListProps {
  boardId: number;
}

const CommentList = ({ boardId }: CommentListProps) => {
  const [sampleComment, setSampleComment] =
    useState<BoardCommentResponse | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [isVisibleScrollTop, setIsVisibleScrollTop] = useState(false);

  const {
    data: commentListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
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

  useEffect(() => {
    if (!isFetching) {
      setSampleComment(null);
    }
  }, [isFetching]);

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
    <>
      <AddComment boardId={boardId} setSampleComment={setSampleComment} />
      <section
        className={`flex flex-col gap-16 ${isFetchingNextPage ? "mb-20" : "mb-50"}`}
      >
        {sampleComment && (
          <div className="opacity-40">
            <Comment
              isSampleMode
              commentData={sampleComment}
              isEditMode={false}
              setEditMode={setEditMode}
            />
          </div>
        )}

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
              <div className="mx-auto mt-30 flex flex-col items-center justify-center gap-16 ">
                <Image
                  onClick={scrollToTop}
                  width={60}
                  height={60}
                  src="/assets/images/img-spaceship.png"
                  alt="맨 위로 버튼"
                  className="cursor-pointer drop-shadow-[0_0_10px_#22b8cf]"
                />
                <span className="text-18-700 text-brand-primary">맨 위로</span>
              </div>
            )}
          </>
        ) : (
          !sampleComment && <EmptyComment />
        )}
      </section>
    </>
  );
};

export default CommentList;
