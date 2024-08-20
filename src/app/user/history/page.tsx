"use client";

import React, { useEffect, useState } from "react";

import NotFound from "@/app/not-found";
import PageLoading from "@/components/loading/index";
import getMyHistory from "@/lib/api/my-history/get-my-history";
import { Task } from "@/types/user-history";

import MyHistory from "./_components/my-history-list";

const MyHistoryPage = () => {
  const [myHistoryData, setMyHistoryData] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyHistory();
        setMyHistoryData(data.tasksDone);
      } catch (error) {
        console.error("히스토리를 불러오는 중 오류가 발생했습니다:", error); //eslint-disable-line
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <PageLoading message="정보 가져오는 중..." />;

  if (!myHistoryData || myHistoryData.length === 0) {
    return <NotFound />;
    /* TODO - 추후없을떄 페이지 제작예정 */
  }

  return (
    <div className="container mx-auto">
      <MyHistory data={myHistoryData} />
    </div>
  );
};

export default MyHistoryPage;
