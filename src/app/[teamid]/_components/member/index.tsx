import AddMemberModal from "./add-member-modal";
import AddMemberModal2 from "./add-member-modal-2";
import Card from "./card";

const MemberBox = () => (
  <article className="flex flex-col gap-24">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h2 className="text-18-500">멤버</h2>
        <span className="text-16-400 text-text-default">(6명)</span>
      </div>
      <AddMemberModal />
    </div>
    <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-24">
      <Card />
      <Card />
      <Card />
      <AddMemberModal2 />
    </section>
  </article>
);

export default MemberBox;
