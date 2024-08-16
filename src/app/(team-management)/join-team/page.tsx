import Link from "next/link";

import JoinTeamForm from "./_components/join-team-form";

const JoinTeamPage = () => (
  <>
    <h1 className="text-24-500 md:text-32 lg:text-40">팀 참여하기</h1>
    <p className="mt-12 text-14-400 text-text-disabled md:mt-24 md:text-16-400">
      공유받은 팀 참여 토큰을 입력해 참여할 수 있어요.
    </p>
    <p className="mb-24 mt-8 text-14-400 text-text-default md:mb-36">
      (생성한지 <span className="text-brand-primary">3일 </span>
      지난 토큰은 참여할 수 없어요)
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
