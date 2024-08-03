export type User = {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  teamId: string;
  memberships: {
    userId: number;
    groupId: number;
    userName: string;
    userEmail: string;
    userImage: string | null;
    role: string;
    group: {
      id: number;
      teamId: string | null;
      name: string;
      image: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};

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
