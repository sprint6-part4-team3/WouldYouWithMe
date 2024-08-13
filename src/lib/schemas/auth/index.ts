import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일은 필수 입력입니다.")
    .email("이메일 형식으로 작성해 주세요."),
  password: z.string().min(1, "비밀번호는 필수 입력입니다."),
});

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일은 필수 입력입니다.")
      .email("이메일 형식으로 작성해 주세요."),
    nickname: z
      .string()
      .min(1, "닉네임은 필수 입력입니다.")
      .max(20, "닉네임은 최대 20자까지 가능합니다."),
    password: z
      .string()
      .min(1, "비밀번호는 필수 입력입니다.")
      .min(8, "비밀번호는 최소 8자 이상입니다.")
      .regex(
        /^[a-zA-Z0-9!@#$%^&*]+$/,
        "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
      ),
    passwordConfirmation: z.string().min(1, "비밀번호 확인을 입력해 주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .regex(
        /^[a-zA-Z0-9!@#$%^&*]+$/,
        "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
      ),
    passwordConfirmation: z.string().min(1, "비밀번호를 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

const emailSchema = z.object({
  email: z.string().email("이메일 형식으로 작성해 주세요."),
});

const userSettingSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1, "이름은 필수 입력입니다."),
});

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .regex(
        /^[a-zA-Z0-9!@#$%^&*]+$/,
        "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
      ),
    newPasswordConfirmation: z.string().min(1, "비밀번호를 입력해주세요."),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["newPasswordConfirmation"],
  });

export {
  changePasswordSchema,
  emailSchema,
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
  userSettingSchema,
};
