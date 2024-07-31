/* eslint-disable no-console */
import Comment from "./comment";

const CommentList = () => {
  console.log("ji");
  return (
    <section className="mb-60 flex flex-col gap-16">
      <Comment />
      <Comment />
      <Comment />
    </section>
  );
};

export default CommentList;
