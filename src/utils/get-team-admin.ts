import { GroupMember } from "@/types/user";

/**
 * 팀의 ADMIN 을 구하는 함수
 */
const getTeamAdmin = (memberList: GroupMember[]) => {
  const result = memberList.filter(
    (member: GroupMember) => member.role === "ADMIN",
  );

  // 팀에 관리자가 없는 경우도 있음
  return result.length > 0 ? result[0].userId : 0;
};

export default getTeamAdmin;
