"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { OrderType } from "@/constants/board-order-option";
import getBoardList from "@/lib/api/board/get-board-list";
import { BoardListResponse } from "@/types/board-list";
import scrollToTop from "@/utils/scroll-to-top";

import BoardList from "./board-list";
import Pagination from "./pagination";
import SearchBar from "./search-bar";
import BoardCardSkeleton from "./skeleton";
import TopTitle from "./top-title";

const BoardListInfo = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || "",
  );
  const [orderBy, setOrderBy] = useState<OrderType>("recent");
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );

  const {
    data: boardListData,
    isLoading,
    isError,
  } = useQuery<BoardListResponse>({
    queryKey: ["boardList", page, orderBy, keyword],
    queryFn: () => getBoardList({ page, orderBy, keyword }),
  });

  useEffect(() => {
    const queryPage = searchParams.get("page");
    const queryOrderBy = searchParams.get("orderBy");
    const queryKeyword = searchParams.get("keyword");

    if (queryPage) {
      setPage(Number(queryPage));
    }
    if (queryOrderBy) {
      setOrderBy(queryOrderBy as OrderType);
    }
    if (queryKeyword) {
      setKeyword(queryKeyword);
    }
  }, [searchParams]);

  const handleCurrentPage = (
    newPage: number,
    newOrderBy: OrderType,
    newKeyword: string,
  ) => {
    const orderParam = newOrderBy || orderBy;
    const keywordParam = newKeyword || "";

    router.push(
      `/boards?page=${newPage}&orderBy=${orderParam}&keyword=${keywordParam}`,
      {
        scroll: true,
      },
    );
  };

  const handleSearchItem = (value: string) => {
    setKeyword(value);
    handleCurrentPage(1, orderBy, value);
  };

  if (isError) {
    throw new Error("게시물 목록을 가져오지 못했습니다.");
  }

  return (
    <Suspense fallback="로딩중">
      <section className="flex flex-col gap-40">
        <SearchBar keyword={keyword} onSearchItem={handleSearchItem} />
        <TopTitle
          orderBy={orderBy}
          setOrderBy={(value: OrderType) =>
            handleCurrentPage(1, value, keyword)
          }
        />
        {isLoading && (
          <div className="mb-40 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
            {Array.from({ length: 4 }, (_, index) => (
              <BoardCardSkeleton key={index} />
            ))}
          </div>
        )}
        {boardListData && (
          <>
            <BoardList boardData={boardListData.list} />
            <Pagination
              totalCount={boardListData.totalCount}
              currentPage={page}
              handleCurrentPage={(newPage) =>
                handleCurrentPage(newPage, orderBy, keyword)
              }
            />
          </>
        )}
      </section>
    </Suspense>
  );
};

export default BoardListInfo;
