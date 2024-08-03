"use client";

import AddTodoListModal from "./add-todo-list-modal";
import TodoListCard from "./todo-list-card";

const TodoListBox = () => (
  <article className="m-auto my-10 w-full">
    <div className="flex justify-between">
      <div className="flex h-21 items-center gap-8">
        <h3 className="text-16-500">할 일 목록</h3>
        <span className="text-16-400 text-text-default">(4개)</span>
      </div>
      <AddTodoListModal />
    </div>
    <section>
      {/* TODO: 이후에 수정 할 예정으로 임시 경로입니다. */}
      <TodoListCard
        color="purple"
        link="/some-path1"
        totalItems={5}
        completedItems={3}
      >
        법인 설계
      </TodoListCard>
      <TodoListCard
        color="blue"
        link="/some-path2"
        totalItems={5}
        completedItems={5}
      >
        변경 동기
      </TodoListCard>
      <TodoListCard
        color="green"
        link="/some-path3"
        totalItems={5}
        completedItems={4}
      >
        정기 주총
      </TodoListCard>
      <TodoListCard
        color="pink"
        link="/some-path4"
        totalItems={5}
        completedItems={1}
      >
        법인 설립
      </TodoListCard>
    </section>
  </article>
);

export default TodoListBox;
