import { TaskDetailData } from "@/types/task-detail";

import instance from "../axios-instance";

const getTaskDetail = async (
  groupId: number,
  taskListId: number,
  taskId: number,
): Promise<TaskDetailData | null> => {
  try {
    const response = await instance.get(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        authorization: true,
      },
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export default getTaskDetail;
