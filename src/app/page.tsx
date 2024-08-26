"use client";

import { useEffect, useRef, useState } from "react";

import IButtons from "@/components/landing/i-buttons";
import Sections from "@/components/landing/sections";

const pageObjArray = [
  { pageNum: 1 },
  { pageNum: 2 },
  { pageNum: 3 },
  { pageNum: 4 },
  { pageNum: 5 },
];

export default function Home() {
  const [windowObj, setWindowObj] = useState<Window>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const totalNum = pageObjArray.length;
  const pageRefs = useRef<HTMLDivElement[]>([]);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowObj(window);
    }
  }, []);

  // 페이지 변경 함수
  const handlePageChange = (event: WheelEvent) => {
    if (windowObj) {
      const scrollDirection = event.deltaY > 0 ? 1 : -1; // 스크롤 방향 감지
      let newPageNum = currentPageNum + scrollDirection;

      // 페이지 번호가 유효한 범위 내에 있는지 확인
      if (newPageNum > totalNum) newPageNum = totalNum;
      if (newPageNum < 1) newPageNum = 1;

      // 페이지가 변경되었을 때만 상태 업데이트 및 스크롤 이동
      if (newPageNum !== currentPageNum) {
        setCurrentPageNum(newPageNum);
        windowObj.scrollTo({
          top: pageRefs.current[newPageNum].offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  // 버튼 클릭
  const handlePointClick = (pageNum: number) => {
    windowObj?.scrollTo({
      top: pageRefs.current[pageNum].offsetTop,
      behavior: "smooth",
    });
    setCurrentPageNum(pageNum);
  };

  useEffect(() => {
    const onScroll = (event: WheelEvent) => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => handlePageChange(event), 100); // 약간의 지연을 두어 이벤트 최적화
    };

    windowObj?.addEventListener("wheel", onScroll);
    return () => {
      windowObj?.removeEventListener("wheel", onScroll);
    };
  }, [windowObj, currentPageNum]);

  return (
    <main className="relative">
      {pageObjArray.map((item) => (
        <Sections
          key={item.pageNum}
          pageNum={item.pageNum}
          pageRefs={pageRefs}
        />
      ))}
      <div className="fixed right-10 top-1/3 z-10 flex flex-col space-y-4">
        <IButtons
          pageObjArray={pageObjArray}
          currentPageNum={currentPageNum}
          handlePointClick={handlePointClick}
        />
      </div>
    </main>
  );
}
