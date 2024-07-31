import TodoListCard from "./todo-list-card";

export default function TodoList() {
  return (
    <>
      <div className="m-auto my-10 flex w-343 justify-between lg:w-696 xl:w-1200">
        <div className="flex h-21 w-110 items-center justify-between">
          <span className="text-16-500">할 일 목록</span>
          <span className="text-16-400 text-text-default">(4개)</span>
        </div>
        <span className="text-14-400 text-point-green">
          + 새로운 목록 추가하기
        </span>
      </div>
      <TodoListCard color="purple">법인 설계</TodoListCard>
      <TodoListCard color="blue">변경 동기</TodoListCard>
      <TodoListCard color="green">정기 주총</TodoListCard>
      <TodoListCard color="pink">법인 설립</TodoListCard>
    </>
  );
}
