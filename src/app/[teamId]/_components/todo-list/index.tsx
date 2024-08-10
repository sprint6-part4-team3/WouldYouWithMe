"use client";

import { AddListModalButton } from "@/components/common";
import { GroupTask } from "@/types/group";

import TodoListCard from "./todo-list-card";

interface TodoLostBoxProps {
  taskList: GroupTask[];
  teamId: number;
}

const TodoListBox = ({ taskList, teamId }: TodoLostBoxProps) => {
  // 색상 타입 및 배열 정의
  const colorProps: Array<
    "purple" | "blue" | "green" | "pink" | "rose" | "orange" | "yellow"
  > = ["purple", "blue", "green", "pink", "rose", "orange", "yellow"];

  return (
    <article className="m-auto my-10 w-full">
      <div className="flex justify-between">
        <div className="flex h-21 items-center gap-8">
          <h3 className="text-16-500">할 일 목록</h3>
          <span className="text-16-400 text-text-default">
            ({taskList.length}개)
          </span>
        </div>
        <AddListModalButton groupId={teamId} />
      </div>
      <section>
        {taskList.length === 0 ? (
          <div className="py-64 text-center text-14-500 text-text-default">
            아직 할 일 목록이 없습니다.
          </div>
        ) : (
          taskList.map((item, index) => {
            const colorIndex = index % colorProps.length;
            const selectedColor = colorProps[colorIndex];

            return (
              <TodoListCard
                key={item.id}
                color={selectedColor}
                link={`/${[teamId]}/task-lists/${item.id}`}
                tasks={item.tasks}
              >
                {item.name}
              </TodoListCard>
            );
          })
        )}
      </section>
    </article>
  );
};

export default TodoListBox;
