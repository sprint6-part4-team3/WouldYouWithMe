// 팀 생성 및 수정 input
export type TeamAddEditInput = {
  name: string;
  image?: string;
};

// 팀 참여 input
export type TeamJoinInput = {
  token: string;
};

// 팀 생성 및 수정 Response
export type CreateEditTeamResponse = {
  name: string;
  image: string | null;
  updatedAt: string;
  createdAt: string;
  id: number;
};

// 팀 참여 request
export type InvitationRequestType = {
  userEmail: string;
  token: string;
};
