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
