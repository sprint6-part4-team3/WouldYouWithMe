"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useToast } from "@/hooks";
import editTaskListIndex from "@/lib/api/task-list/change-task-list";
import { GroupResponse, GroupTask } from "@/types/group";
import { TaskListEditIndex } from "@/types/task-list";

import TodoListCard from "./todo-list-card";

interface DragAndDropProps {
  todoListIndex: GroupTask[];
  teamId: number;
  response: GroupResponse;
}

const DragAndDrop = ({ todoListIndex, teamId, response }: DragAndDropProps) => {
  // 색상 타입 및 배열 정의
  const colorProps: Array<
    "purple" | "blue" | "green" | "pink" | "rose" | "orange" | "yellow"
  > = ["purple", "blue", "green", "pink", "rose", "orange", "yellow"];

  const [enabled, setEnabled] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

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

  const loadDataAfterEdit = async (
    data: TaskListEditIndex,
    groupId: number,
    id: number,
  ): Promise<boolean> => {
    try {
      await editTaskListIndex(data, groupId, id);
      return true;
    } catch (error) {
      toast.error("목록 이동에 실패했습니다.");
      return false;
    }
  };

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return; // 드롭 위치가 없다면 아무 작업도 하지 않음

    const previousTasks = Array.from(todoListIndex); // 드래그 시작 시점의 상태 저장
    const updatedTasks = Array.from(todoListIndex);
    const [movedTask] = updatedTasks.splice(source.index, 1); // 드래그한 요소를 배열에서 제거
    updatedTasks.splice(destination.index, 0, movedTask); // 드롭한 위치에 요소를 추가

    queryClient.setQueryData(["team", teamId], {
      ...response,
      taskLists: updatedTasks,
    });
    const data: TaskListEditIndex = {
      displayIndex: destination.index,
    };

    const groupId = teamId;
    const { id } = movedTask;

    loadDataAfterEdit(data, groupId, id).then((success) => {
      if (!success) {
        // 서버 요청이 실패한 경우 이전 상태로 복원
        router.refresh();
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tackList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todoListIndex.map((item, index) => {
              const colorIndex = item.id % colorProps.length;
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
                        link={`/team/${[teamId]}/task-lists/${item.id}`}
                        tasks={item.tasks}
                        task={item}
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
