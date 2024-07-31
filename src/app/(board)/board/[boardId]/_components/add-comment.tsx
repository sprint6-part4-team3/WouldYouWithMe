/* eslint-disable no-console */
import { Button } from "@/components/common";
import Textarea from "@/components/common/forms/textarea";

const AddComment = () => {
  console.log("ji");
  return (
    <section>
      <h2>댓글달기</h2>
      <Textarea id="comment" placeholder="댓글을 입력해주세요." />
      <Button variant="primary">입력하기</Button>
    </section>
  );
};

export default AddComment;
