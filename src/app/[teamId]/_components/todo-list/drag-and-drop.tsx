"use client";

/* eslint-disable no-console */
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

import { GroupTask } from "@/types/group";

import TodoListCard from "./todo-list-card";

interface DragAndDropProps {
  todoListIndex: GroupTask[];
  teamId: number;
  handleEditTask: (newTask: GroupTask) => void;
  handleDeleteTask: (newTask: GroupTask) => void;
  setTodoListIndex: (newTask: GroupTask[]) => void;
}

const DragAndDrop = ({
  todoListIndex,
  teamId,
  handleEditTask,
  handleDeleteTask,
  setTodoListIndex,
}: DragAndDropProps) => {
  // 색상 타입 및 배열 정의
  const colorProps: Array<
    "purple" | "blue" | "green" | "pink" | "rose" | "orange" | "yellow"
  > = ["purple", "blue", "green", "pink", "rose", "orange", "yellow"];

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return; // 드롭 위치가 없다면 아무 작업도 하지 않음

    const updatedTasks = Array.from(todoListIndex);
    const [movedTask] = updatedTasks.splice(source.index, 1); // 드래그한 요소를 배열에서 제거
    updatedTasks.splice(destination.index, 0, movedTask); // 드롭한 위치에 요소를 추가

    setTodoListIndex(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tackList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todoListIndex.map((item, index) => {
              const colorIndex = index % colorProps.length;
              const selectedColor = colorProps[colorIndex];

              return (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provides) => (
                    <div
                      ref={provides.innerRef}
                      {...provides.draggableProps}
                      {...provides.dragHandleProps}
                    >
                      <TodoListCard
                        key={item.id}
                        color={selectedColor}
                        link={`/${[teamId]}/task-lists/${item.id}`}
                        tasks={item.tasks}
                        task={item}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                      >
                        {item.name}
                      </TodoListCard>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
