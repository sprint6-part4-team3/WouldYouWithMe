import { z } from "zod";

const taskListAddEditSchema = z.object({
  name: z
    .string()
    .min(1, "할 일 목록 이름은 필수 입니다.")
    .max(15, "할 일 목록 이름은 15자를 넘을 수 없습니다."),
});

export default taskListAddEditSchema;
