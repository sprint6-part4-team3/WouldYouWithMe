"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

interface PaginationProps {
  /** 총 게시물 개수 */
  totalCount: number;
  /** 현재 페이지 */
  currentPage: number;
  handleCurrentPage: (value: number) => void;
}

const PER_PAGE_COUNT = 6;
const PAGE_COUNT = 5;

const Pagination = ({
  totalCount,
  currentPage,
  handleCurrentPage,
}: PaginationProps) => {
  const totalPage = Math.ceil(totalCount / PER_PAGE_COUNT);
  const pageArray = [...Array(totalPage)].map((_, index) => index + 1);

  const [startPage, setStartPage] = useState(currentPage);
  const lastPage = Math.min(startPage + PAGE_COUNT - 1, totalPage);

  useEffect(() => {
    const newStartPage = Math.max(
      1,
      Math.floor((currentPage - 1) / PAGE_COUNT) * PAGE_COUNT + 1,
    );
    setStartPage(newStartPage);
  }, [currentPage]);

  // 페이지 이동
  const handlePageClick = (pageNumber: number) => {
    handleCurrentPage(pageNumber);
  };

  // 이전 페이지 그룹으로 이동
  const handlePrevGroup = () => {
    if (startPage > 1) {
      setStartPage((prev) => prev - PAGE_COUNT);
      handleCurrentPage(startPage - PAGE_COUNT);
    }
  };

  // 이후 페이지 그룹으로 이동
  const handleNextGroup = () => {
    if (startPage + PAGE_COUNT <= totalPage) {
      setStartPage((prev) => prev + PAGE_COUNT);
      handleCurrentPage(startPage + PAGE_COUNT);
    }
  };

  return (
    <div className="mb-40 flex w-full items-center justify-center gap-10 py-20 text-20-500 md:gap-15">
      {startPage > 1 && (
        <button
          className="text-30 hover:text-text-secondary md:text-40"
          onClick={handlePrevGroup}
          type="button"
        >
          &#8249;
        </button>
      )}
      {pageArray.slice(startPage - 1, lastPage).map((pageNumber) => (
        <button
          className={clsx(`size-35 rounded-full md:size-40`, {
            "bg-brand-primary": currentPage === pageNumber,
            "bg-brand-primary/10 hover:bg-brand-primary/30":
              currentPage !== pageNumber,
          })}
          type="button"
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {lastPage < totalPage && (
        <button
          className="text-30 hover:text-text-secondary md:text-40"
          onClick={handleNextGroup}
          type="button"
        >
          &#8250;
        </button>
      )}
    </div>
  );
};

export default Pagination;
