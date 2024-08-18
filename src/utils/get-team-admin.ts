import { GroupMember } from "@/types/user";

/**
 * 팀의 ADMIN 을 구하는 함수
 */
const getTeamAdmin = (memberList: GroupMember[]) => {
  const result = memberList.filter(
    (member: GroupMember) => member.role === "ADMIN",
  );

  return result[0].userId;
};

export default getTeamAdmin;
