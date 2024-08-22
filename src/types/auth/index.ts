export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export type UserSettingInput = {
  image: string | null;
  nickname?: string;
};

export type ResetPasswordInput = {
  passwordConfirmation: string;
  password: string;
  token: string;
};

export type EmailInput = {
  email: string;
};

export type ChangePasswordInput = {
  password: string;
  passwordConfirmation: string;
};

export type AccessToken = {
  accessToken: string;
};

export type SignUpResponseSuccess = {
  success: true;
  user: {
    id: number;
    nickname: string;
    createdAt: string;
    updatedAt: string;
    image: string | null;
    teamId: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type SignUpResponseFailure = {
  success: false;
  data: {
    message: string;
  };
};

export type SignUpResponse = SignUpResponseSuccess | SignUpResponseFailure;
