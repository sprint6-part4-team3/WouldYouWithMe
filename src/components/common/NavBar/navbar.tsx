import Image from "next/image";

import LogoImage from "@/public/assets/images/logo-coworkers.png";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 h-60 border-b border-border-primary bg-background-secondary">
      <div className="mx-16 flex h-full items-center justify-between lg:mx-200 xl:mx-360">
        <div className="relative w-102 shrink-0 xl:w-158">
          <Image src={LogoImage} alt="코워커스 로고" className="object-fill" />
        </div>
        <div className="whitespace-nowrap text-text-primary">로그인</div>
      </div>
    </header>
  );
}
