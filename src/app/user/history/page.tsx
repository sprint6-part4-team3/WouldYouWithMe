import { MyHistoryData } from "@/types/user-history/index";

import mockData from "./_components/mock.json";
import MyHistory from "./_components/my-history-list";

const MyHistoryPage = () => {
  const MyMockData = mockData as MyHistoryData;

  return (
    <div className="container mx-auto">
      <MyHistory data={MyMockData.myHistory} />
    </div>
  );
};
export default MyHistoryPage;
