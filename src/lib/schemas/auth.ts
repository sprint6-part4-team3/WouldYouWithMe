import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("유효한 이메일이 아닙니다."),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

export default loginSchema;
