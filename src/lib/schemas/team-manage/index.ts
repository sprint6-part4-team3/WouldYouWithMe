import { z } from "zod";

const teamAddSchema = z.object({
  name: z.string().min(1, "팀 이름은 필수 입력입니다."),
  image: z.string().optional(),
});

const teamEditSchema = z.object({
  name: z.string().min(1, "팀 이름은 필수 입력입니다."),
  image: z.string().optional(),
});

export { teamAddSchema, teamEditSchema };
