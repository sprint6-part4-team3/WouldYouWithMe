import { IconProfile } from "@/public/assets/icons";

import CommentDropDown from "./drop-down";

const Comment = () => (
  <div className="flex flex-col gap-32 rounded-8 bg-background-secondary p-16">
    <div className="flex items-center justify-between gap-12">
      <span className="text-14-400 leading-[21px]">
        본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는
        영역입니다. 본문이 들어가는 영역입니다. 본문이 들어가는 영역입니다.
        본문이 들어가는 영역입니다.
      </span>
      <CommentDropDown />
    </div>
    <div className="flex items-center">
      <IconProfile />
      <span className="ml-6 text-14-500 md:ml-12">우지은</span>
      <div className="mx-8 h-12 w-1 bg-background-tertiary md:mx-16" />
      <span className="text-disabled text-14-500">2024.07.25</span>
    </div>
  </div>
);

export default Comment;
