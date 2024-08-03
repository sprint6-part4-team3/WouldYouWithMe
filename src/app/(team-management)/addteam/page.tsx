import Link from "next/link";

import AddTeamForm from "../_components/add-team-form";

const AddTeamPage = () => (
  <>
    <h1 className="text-24-500 md:text-32 lg:text-40">팀 생성하기</h1>
    <p className="mb-24 mt-12 text-14-400 text-text-disabled md:my-36 md:mt-24 md:text-16-400 lg:mb-48">
      팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
    </p>
    <AddTeamForm />
    <p>
      팀에 참여하고 싶으신가요?
      <Link className="ml-12 text-brand-primary underline" href="/jointeam">
        팀 참여하기
      </Link>
    </p>
  </>
);

export default AddTeamPage;
