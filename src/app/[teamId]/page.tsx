import Empty from "./_components/empty";
import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
import MembershipsTestData from "./memberships.json";

const TeamPage = () =>
  MembershipsTestData.length === 0 ? (
    <Empty />
  ) : (
    <>
      <ReportBox />
      <MemberBox />
    </>
  );

export default TeamPage;
