"use client";

import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

import PageLoading from "@/components/loading/index";
import getMyHistory from "@/lib/api/my-history/get-my-history";
import TeamEmpty from "@/public/assets/lotties/team-empty.json";
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

  if (isLoading) return <PageLoading />;

  if (!myHistoryData || myHistoryData.length === 0) {
    return (
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center py-20">
        <div className="text-center">
          <Lottie
            className="mx-auto h-auto w-full max-w-[500px]"
            animationData={TeamEmpty}
          />
          <h2 className="text-2xl mt-8 font-semibold">
            아직 완료한 일이 없습니다.
          </h2>
          <p className="mt-4">새로운 작업을 시작하고 완료해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <MyHistory data={myHistoryData} />
    </div>
  );
};

export default MyHistoryPage;
