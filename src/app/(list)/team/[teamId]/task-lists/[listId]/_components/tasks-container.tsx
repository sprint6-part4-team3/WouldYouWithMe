"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  if (tasks?.length === 0) {
    return (
      <article className="mb-16 flex w-full flex-col gap-10 rounded-lg bg-background-secondary px-14 py-12">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2>할 일을 추가해 주세요</h2>
          </div>
        </div>
      </article>
    );
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
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

    queryClient.setQueryData(
      ["tasks", currentTeamId, currentListId, stringCurrentDate],
      reorderedTasks,
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" type="tasks">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="flex flex-col gap-16"
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
                    <TaskCard
                      key={task.id}
                      id={task.id}
                      name={task.name}
                      date={task.date}
                      frequency={task.frequency}
                      initialIsCompleted={task.doneAt !== null}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TasksContainer;
