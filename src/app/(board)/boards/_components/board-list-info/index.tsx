"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { OrderType } from "@/constants/board-order-option";

import BoardList from "./board-list";
import Pagination from "./pagination";
import SearchBar from "./search-bar";
import testData from "./test.json";
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

  const handleCurrentPage = (newPage: number, newOrderBy?: OrderType) => {
    const orderParam = newOrderBy || orderBy;
    const queryKeyword = keyword ? `&keyword=${keyword}` : "";

    setPage(newPage);
    setOrderBy(orderParam);
    router.push(
      `/boards?page=${newPage}&orderBy=${orderParam}${queryKeyword}`,
      {
        scroll: false,
      },
    );
  };

  const handleSearchItem = (data: string) => {
    setKeyword(data);
    handleCurrentPage(1, orderBy);
  };

  return (
    <section className="flex flex-col gap-40">
      <SearchBar keyword={keyword} onSearchItem={handleSearchItem} />
      <TopTitle
        orderBy={orderBy}
        setOrderBy={(value: OrderType) => handleCurrentPage(1, value)}
      />
      <BoardList boardData={testData.list} />
      <Pagination
        totalCount={24}
        currentPage={page}
        handleCurrentPage={(newPage) => handleCurrentPage(newPage)}
      />
    </section>
  );
};

export default BoardListInfo;
