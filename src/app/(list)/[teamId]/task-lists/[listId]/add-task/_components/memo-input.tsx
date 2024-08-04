import React from "react";

import { TextArea } from "@/components/common";

const MemoInput = () => (
  <section>
    <TextArea id="task-memo" placeholder="메모를 입력해 주세요" rows={7} />
  </section>
);

export default MemoInput;
