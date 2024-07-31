import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일은 필수 입력입니다.")
    .email("이메일 형식으로 작성해 주세요."),
  password: z.string().min(1, "비밀번호는 필수 입력입니다."),
});

export default loginSchema;
