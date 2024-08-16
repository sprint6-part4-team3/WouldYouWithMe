import React from "react";

import NotFound from "@/app/not-found";
import getMyHistory from "@/lib/api/my-history/get-my-history";

import MyHistory from "./_components/my-history-list";

const MyHistoryPage = async () => {
  const data = await getMyHistory();
  const myHistoryData = data.tasksDone;

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
