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
  name: string;
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
  newPassword: string;
  newPasswordConfirmation: string;
};

export type AccessToken = {
  accessToken: string;
};
