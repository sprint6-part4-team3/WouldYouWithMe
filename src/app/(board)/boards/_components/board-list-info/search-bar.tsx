/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { IconSearch } from "@/public/assets/icons";

interface SearchBarProps {
  keyword: string;
  onSearchItem: (keyword: string) => void;
}

const SearchBar = ({ keyword, onSearchItem }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(keyword);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearchItem(inputValue);
  };

  useEffect(() => {
    if (keyword !== inputValue) {
      setInputValue(keyword);
    }
  }, [keyword]);

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <IconSearch className="absolute left-12 top-17" />
      <input
        className="h-56 w-full rounded-xl bg-background-secondary py-3.5 pl-42 pr-5 text-16-600 outline-none transition-all duration-300 focus:ring-1 focus:ring-brand-primary"
        placeholder="검색어를 입력해주세요"
        value={inputValue}
        onChange={handleChangeInput}
        name="keyword"
      />
    </form>
  );
};

export default SearchBar;
