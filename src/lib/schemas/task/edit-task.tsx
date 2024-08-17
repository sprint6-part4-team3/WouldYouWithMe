import { z } from "zod";

const editTaskSchema = z.object({
  name: z
    .string()
    .min(1, "할 일 목록 이름은 필수 입니다.")
    .max(30, "할 일 목록 이름은 30자를 넘을 수 없습니다."),
  description: z.string().optional(),
});

export default editTaskSchema;
