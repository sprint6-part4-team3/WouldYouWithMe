export type Group = {
  updatedAt: string | Date;
  createdAt: string | Date;
  image: string | null;
  name: string;
  teamId: string;
  id: number;
};

export type GroupMember = {
  role: "ADMIN" | "MEMBER";
  userImage: string | null;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
};

export type UserGroupsResponse = Group[];

export type Memberships = Group & GroupMember;

export type UserMembershipsResponse = Memberships[];
