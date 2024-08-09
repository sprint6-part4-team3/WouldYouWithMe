"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useIsMobile } from "@/hooks";
import LogoImage from "@/public/assets/images/logo-coworkers.png";
import { User } from "@/types/user";

import IconButton from "../common/icon-button";
import NavSideBar from "./nav-sidebar";

interface LogoProps {
  user?: User | null;
}

const Logo = ({ user = null }: LogoProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          icon="IconGnbMenu"
          variant="none"
          onClick={toggleSidebar}
          className="shrink-0"
        />
      )}
      <div className="relative w-158 shrink-0">
        <Link href="/">
          <Image src={LogoImage} alt="코워커스 로고" className="object-fill" />
        </Link>
      </div>
      <NavSideBar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />
    </>
  );
};

export default Logo;
