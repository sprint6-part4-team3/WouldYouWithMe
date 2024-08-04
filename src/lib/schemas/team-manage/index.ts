import { z } from "zod";

const teamJoinSchema = z.object({
  token: z.string().min(1, "팀 참여 링크를 입력해주세요."),
});

export default teamJoinSchema;
