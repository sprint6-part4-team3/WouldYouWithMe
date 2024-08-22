import Image from "next/image";
import Link from "next/link";

import GnbButton from "./gnb-button";
import TeamDropdown from "./team-dropdown";
import UserDropdown from "./user-dropdown";

const NavBar = () => (
  <header className="sticky top-0 z-10 h-60 border-b border-border-secondary bg-background-secondary">
    <div className="mx-24 flex h-full items-center justify-between lg:mx-120">
      <div className="flex items-center gap-20">
        <GnbButton />
        <Link href="/">
          <Image
            width={150}
            height={53}
            priority
            src="/assets/images/logo-wywm.png"
            alt="우주윗미 로고"
            className="object-fill"
          />
        </Link>
        <TeamDropdown />
        <Link href="/boards" className="hidden text-text-primary md:block">
          모집게시판
        </Link>
      </div>
      <UserDropdown />
    </div>
  </header>
);

export default NavBar;
