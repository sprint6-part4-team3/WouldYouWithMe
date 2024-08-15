/* eslint-disable no-console */

"use client";

import { useState } from "react";

import { OrderType } from "@/constants/board-order-option";

import BoardList from "./board-list";
import SearchBar from "./search-bar";
import testData from "./test.json";
import TopTitle from "./top-title";

const BoardListInfo = () => {
  const [keyword, setKeyword] = useState("");
  const [orderBy, setOrderBy] = useState<OrderType>("recent");

  const handleSearchItem = (data: string) => {
    setKeyword(data);
    console.log(data);
  };

  return (
    <section className="flex flex-col gap-40">
      <SearchBar onSearchItem={handleSearchItem} />
      <TopTitle orderBy={orderBy} setOrderBy={setOrderBy} />
      <BoardList boardData={testData.list} />
    </section>
  );
};

export default BoardListInfo;
