/* eslint-disable consistent-return */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import getGroupData from "@/lib/api/group/get-group-data";

import EditTeamForm from "../../_components/edit-team-form";

const EditTeamPage = async ({ params }: { params: { teamId: number } }) => {
  const { teamId } = params;
  const userId = cookies().get("userId")?.value;

  try {
    const res = await getGroupData(teamId);

    if (res.members[0]?.userId !== Number(userId)) {
      return redirect("/not-found");
    }

    return (
      <>
        <h1 className="text-24-500 md:text-32 lg:text-40">팀 수정하기</h1>
        <p className="mb-24 mt-12 text-14-400 text-text-disabled md:my-36 md:mt-24 md:text-16-400">
          팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
        </p>
        <EditTeamForm id={teamId} name={res.name} image={res.image} />
      </>
    );
  } catch (error) {
    return redirect("/error");
  }
};

export default EditTeamPage;
