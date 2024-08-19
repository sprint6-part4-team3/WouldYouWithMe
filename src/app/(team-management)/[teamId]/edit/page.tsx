import { cookies } from "next/headers";
import { Suspense } from "react";

import EditContainer from "./edit-container";
import EditSkeleton from "./edit-skeleton";

const EditTeamPage = async ({ params }: { params: { teamId: number } }) => {
  const { teamId } = params;
  const userId = cookies().get("userId")?.value;

  return (
    <>
      <h1 className="text-24-500 md:text-32 lg:text-40">팀 수정하기</h1>
      <p className="mb-24 mt-12 text-14-400 text-text-disabled md:my-36 md:mt-24 md:text-16-400">
        팀 이름은 스터디명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
      <Suspense fallback={<EditSkeleton />}>
        <EditContainer teamId={teamId} userId={userId} />
      </Suspense>
    </>
  );
};

export default EditTeamPage;
