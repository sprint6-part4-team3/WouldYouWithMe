import { TaskList } from "@/types/group";

const groupTaskTodoList = (tasks: TaskList[]) => {
  let totalItems = 0;
  let completedItems = 0;

  tasks.forEach((task) => {
    totalItems += 1;
    if (task.doneAt !== null) {
      completedItems += 1;
    }
  });

  // TODO: 완료 개수에 따라 변경
  const CHECKED_ITEMS: number =
    totalItems === 0 ? 0 : (completedItems / totalItems) * 100;

  return {
    totalItems,
    completedItems,
    CHECKED_ITEMS,
  };
};

export default groupTaskTodoList;
