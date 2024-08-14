/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback } from "react";

import { IconSearch } from "@/public/assets/icons";
import debounce from "@/utils/debounce";

interface SearchBarProps {
  onSearchItem: (keyword: string) => void;
}

const SearchBar = ({ onSearchItem }: SearchBarProps) => {
  const debounceOnSearchItem = useCallback(
    debounce((keyword: string) => {
      onSearchItem(keyword);
    }, 300),
    [onSearchItem],
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    debounceOnSearchItem(e.target.value);
  };

  return (
    <div className="relative">
      <IconSearch className="absolute left-12 top-17" />
      <input
        className="h-56 w-full rounded-xl bg-background-secondary py-3.5 pl-42 pr-5 text-16-600 outline-none transition-all duration-300 focus:ring-1 focus:ring-brand-primary"
        placeholder="검색어를 입력해주세요"
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default SearchBar;
