"use client";

import clsx from "clsx";
import { useState } from "react";

interface PaginationProps {
  /** 총 게시물 개수 */
  totalCount: number;
  /** 현재 페이지 */
  currentPage: number;
  handleCurrentPage: (value: number) => void;
}

const PER_PAGE_COUNT = 2; // 한 페이지당 보여줄 게시글 개수
const PAGE_COUNT = 5; // 보여줄 페이지 개수

const Pagination = ({
  totalCount,
  currentPage,
  handleCurrentPage,
}: PaginationProps) => {
  const totalPage = Math.ceil(totalCount / PER_PAGE_COUNT);
  const pageArray = [...Array(totalPage)].map((_, index) => index + 1);

  const [startPage, setStartPage] = useState(currentPage);
  const lastPage = Math.min(startPage + PAGE_COUNT - 1, totalPage);

  // 페이지 이동
  const handlePageClick = (pageNumber: number) => {
    handleCurrentPage(pageNumber);
  };

  // 이전 페이지 그룹으로 이동
  const handlePrevGroup = (pageNumber: number) => {
    if (startPage > 1) {
      setStartPage((prev) => prev - PAGE_COUNT);
      handleCurrentPage(pageNumber);
    }
  };

  // 이후 페이지 그룹으로 이동
  const handleNextGroup = (pageNumber: number) => {
    if (startPage < totalPage) {
      setStartPage((prev) => prev + PAGE_COUNT);
      handleCurrentPage(pageNumber);
    }
  };

  return (
    <div className="mx-auto mb-40 flex w-300 items-center justify-center gap-15 py-20 text-20-500">
      {startPage !== 1 && (
        <button
          className="text-40"
          onClick={() => handlePrevGroup(startPage - PAGE_COUNT)}
          type="button"
        >
          &#8249;
        </button>
      )}
      {pageArray.slice(startPage - 1, lastPage).map((pageNumber) => (
        <button
          className={clsx(`size-40 rounded-full`, {
            "bg-brand-primary": currentPage === pageNumber,
            "bg-brand-primary/10": currentPage !== pageNumber,
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
          className="text-40"
          onClick={() => handleNextGroup(startPage + PAGE_COUNT)}
          type="button"
        >
          &#8250;
        </button>
      )}
    </div>
  );
};

export default Pagination;
