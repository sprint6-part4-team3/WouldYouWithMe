import { useParams } from "next/navigation";

const useTaskParams = () => {
  const params = useParams();
  return {
    groupId: Number(params.groupId),
    taskListId: Number(params.taskListId),
    taskId: Number(params.id),
  };
};

export default useTaskParams;
