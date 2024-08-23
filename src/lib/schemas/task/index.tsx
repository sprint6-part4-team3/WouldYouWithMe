import { z } from "zod";

const repeatTypeSchema = z.enum(["ONCE", "DAILY", "WEEKLY", "MONTHLY"]);

const newTaskBaseSchema = z.object({
  name: z
    .string()
    .min(1, "할 일 제목을 입력해 주세요")
    .max(25, "할 일 이름은 25자를 넘을 수 없습니다."),
  frequencyType: repeatTypeSchema,
  description: z.string().optional(),
  displayIndex: z.number().optional(),
  startDate: z.string(),
});

const weeklyTaskSchema = newTaskBaseSchema.extend({
  frequencyType: z.literal("WEEKLY"),
  weekDays: z.array(z.string()).min(1),
});

const monthlyTaskSchema = newTaskBaseSchema.extend({
  frequencyType: z.literal("MONTHLY"),
  monthDay: z.number().min(1).max(31),
});

const otherTaskSchema = newTaskBaseSchema.extend({
  frequencyType: z.union([z.literal("ONCE"), z.literal("DAILY")]),
});

const newTaskSchema = z.union([
  weeklyTaskSchema,
  monthlyTaskSchema,
  otherTaskSchema,
]);

export default newTaskSchema;
