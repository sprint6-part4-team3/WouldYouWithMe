import { Button, TextArea } from "@/components/common";

const AddComment = () => (
  <section className="flex flex-col">
    <h2 className="text-16-700 md:text-20-700">댓글달기</h2>

    <form className="my-16 md:mt-24">
      <TextArea id="comment" rows={4} placeholder="댓글을 입력해주세요." />
    </form>

    <Button
      className="h-32 w-74 self-end text-14 md:h-48 md:w-184 md:text-16"
      variant="primary"
    >
      등록
    </Button>

    <div className="my-40 h-1 w-full bg-border-primary/10" />
  </section>
);

export default AddComment;
