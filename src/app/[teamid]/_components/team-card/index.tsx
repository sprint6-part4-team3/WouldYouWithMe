export default function TeamCard() {
  return (
    <div className="m-auto my-24 flex h-64 w-343 items-center justify-between rounded-12 border border-border-primary/10 bg-slate-50/10 px-24 lg:w-696 xl:w-1200">
      <div className="text-20-700">경영관리팀</div>
      <div className="flex gap-20">
        <div>이미지</div>
        <img src="@/public/assets/icons/icon-plus.svg" alt="icon" />
      </div>
    </div>
  );
}
