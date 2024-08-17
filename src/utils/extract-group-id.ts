/* eslint-disable @typescript-eslint/no-explicit-any */
const extractGroupId = (memberships: any[]) =>
  memberships.map((membership) => membership.groupId);

export default extractGroupId;
