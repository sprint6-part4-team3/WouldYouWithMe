import { TaskDetailData } from "@/types/task-detail";

import instance from "../axios-instance";

const getTaskDetail = async (
  groupId: number,
  taskListId: number,
  taskId: number,
): Promise<TaskDetailData | null> => {
  const token = "";

  try {
    const response = await instance.get(
      `/6-3/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export default getTaskDetail;
