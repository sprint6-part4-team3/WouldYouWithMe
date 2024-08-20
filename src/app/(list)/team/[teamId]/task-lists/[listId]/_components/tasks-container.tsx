"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import editTasksOrder from "@/lib/api/task-lists/edit-tasks-order";
import getTasks from "@/lib/api/task-lists/get-tasks";

import TaskCard from "./task-card";

interface TasksProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
}

const TasksContainer = ({
  currentTeamId,
  currentDate,
  currentListId,
}: TasksProps) => {
  const stringCurrentDate = currentDate.toISOString();
  const queryClient = useQueryClient();
  const { data: tasks } = useQuery({
    queryKey: ["tasks", currentTeamId, currentListId, stringCurrentDate],
    queryFn: () =>
      getTasks({
        groupId: currentTeamId,
        taskListId: currentListId,
        date: stringCurrentDate,
      }),
  });
  if (!tasks) throw new Error();
  if (tasks.length === 0) return null;

  const onDragEnd = async ({ source, destination }: DropResult) => {
    if (!destination) return; // 목적지가 없으면 아무 작업도 하지 않음

    // 순서 변경이 없을 때
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    // 옵티미스틱
    queryClient.setQueryData(
      ["tasks", currentTeamId, currentListId, stringCurrentDate],
      reorderedTasks,
    );
    // api 호출
    await editTasksOrder(
      currentTeamId,
      currentListId,
      movedTask.id,
      destination.index,
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" type="tasks">
        {(droppableProvided) => (
          <section
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="mb-16 flex flex-col gap-16"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <TaskCard key={task.id} id={task.id} date={task.date} />
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TasksContainer;
