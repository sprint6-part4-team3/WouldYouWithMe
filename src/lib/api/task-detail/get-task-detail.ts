import { TaskDetailData } from "@/types/task-detail";

import instance from "../axios-instance";

const getTaskDetail = async (
  teamId: string,
  taskId: number,
  groupId: number,
  taskListId: number,
): Promise<TaskDetailData> => {
  const { data } = await instance.get(
    `/${teamId}/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
  return data;
};

export default getTaskDetail;
