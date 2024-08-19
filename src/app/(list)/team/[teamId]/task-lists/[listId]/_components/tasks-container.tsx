"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";

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

  const onDragEnd = ({ source, destination }: DropResult) => {
    // 로직 추가
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
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TasksContainer;
