import { GroupTask } from "@/types/group";

/**
 * 오늘 전체 할 일과 오늘 완료한 일을 리턴하는 함수입니다.
 */
const groupTaskReport = (taskLists: GroupTask[]) => {
  let totalTasks = 0;
  let completedTasks = 0;

  taskLists.forEach((taskList) => {
    taskList.tasks.forEach((task) => {
      totalTasks += 1;
      if (task.doneAt !== null) {
        completedTasks += 1;
      }
    });
  });

  return {
    totalTasks,
    completedTasks,
  };
};

export default groupTaskReport;
