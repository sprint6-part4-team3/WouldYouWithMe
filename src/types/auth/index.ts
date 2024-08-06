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

export type ResetPasswordInput = {
  password: string;
  passwordConfirmation: string;
  token: string;
};

export type EmailInput = {
  email: string;
};
