import { z } from "zod";

const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

const teamAddEditSchema = z.object({
  name: z
    .string()
    .min(1, "팀 이름은 필수 입력입니다.")
    .max(30, "팀 이름은 30자를 넘을 수 없습니다."),
  image: z.string().optional(),
});

const teamJoinSchema = z.object({
  token: z
    .string()
    .min(1, "팀 참여 링크를 입력해주세요.")
    .regex(jwtRegex, "유효한 토큰 형식이어야 합니다."),
});

export { teamAddEditSchema, teamJoinSchema };
