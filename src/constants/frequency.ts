import { FrequencyType } from "@/types/task-list";

export const FREQUENCY_OPTIONS = [
  { value: "ONCE", label: "한 번" },
  { value: "DAILY", label: "매일 반복" },
  { value: "WEEKLY", label: "주 반복" },
  { value: "MONTHLY", label: "월 반복" },
];

export const FREQUENCY_LABELS: { [key: string]: string } = {
  ONCE: "한 번",
  DAILY: "매일 반복",
  WEEKLY: "주 반복",
  MONTHLY: "월 반복",
};
