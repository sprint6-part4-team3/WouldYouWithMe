/* eslint-disable no-console */

"use client";

import { useState } from "react";

import SearchBar from "./search-bar";

const BoardListInfo = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearchItem = (data: string) => {
    setKeyword(data);
    console.log(data);
  };

  return (
    <section>
      <SearchBar onSearchItem={handleSearchItem} />
    </section>
  );
};

export default BoardListInfo;
