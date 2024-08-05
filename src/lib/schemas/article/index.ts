import { z } from "zod";

const boardContentTypeSchema = z.object({
  //  link: z.string().url("유효한 URL이어야 합니다."),
  token: z.string().min(1, "참여 토큰은 필수 입력입니다."),
  content: z.string().min(1, "콘텐츠는 필수 입력입니다."),
});

const boardAddEditSchema = z.object({
  title: z.string().min(1, "팀 이름은 필수 입력입니다."),
  content: boardContentTypeSchema,
  image: z.string().optional(),
});

export default boardAddEditSchema;
