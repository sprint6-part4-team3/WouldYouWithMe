import Link from "next/link";

import JoinTeamForm from "./_components/join-team-form";

const JoinTeamPage = () => (
  <>
    <h1 className="text-24-500 md:text-32 lg:text-40">팀 참여하기</h1>
    <p className="mb-24 mt-12 text-14-400 text-text-disabled md:my-36 md:mt-24 md:text-16-400">
      공유받은 팀 링크를 입력해 참여할 수 있어요.
    </p>
    <JoinTeamForm />
    <p>
      팀을 생성하고 싶으신가요?
      <Link className="ml-12 text-brand-primary underline" href="/create-team">
        팀 생성하기
      </Link>
    </p>
  </>
);

export default JoinTeamPage;
