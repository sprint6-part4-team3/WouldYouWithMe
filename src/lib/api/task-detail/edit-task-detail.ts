import { TaskEditData } from "@/types/task-detail/index";
import { EditTaskType } from "@/types/task-list";

import instance from "../axios-instance";

const editTaskDetail = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: TaskEditData | EditTaskType,
) => {
  const response = await instance.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data,
  );
  return response.data;
};

export default editTaskDetail;
