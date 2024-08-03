import EditTeamForm from "../../_components/edit-team-form";

const testTeamData = {
  name: "코드잇 스프린트",
  image:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/85/585960601535448881.jpeg",
};

const EditTeamPage = () => (
  <>
    <h1 className="text-24-500 md:text-32 lg:text-40">팀 수정하기</h1>
    <p className="mb-24 mt-12 text-14-400 text-text-disabled md:my-36 md:mt-24 md:text-16-400">
      팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
    </p>
    <EditTeamForm teamData={testTeamData} />
  </>
);

export default EditTeamPage;
