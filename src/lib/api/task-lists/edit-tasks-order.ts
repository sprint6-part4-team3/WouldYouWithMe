/* eslint-disable no-console */
import instance from "../axios-instance";

const editTasksOrder = async (
  groupId: number,
  taskListId: number,
  taskId: number,
  displayIndex: number,
) => {
  try {
    const response = await instance.patch(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
      { displayIndex },
    );
    return response.data.status === 204;
  } catch (e) {
    return console.log(e);
  }
};

export default editTasksOrder;
