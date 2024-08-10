"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks";
import LogoImage from "@/public/assets/images/logo-coworkers.png";
import { getCookie } from "@/utils/next-cookie";

import IconButton from "../common/icon-button";
import NavSideBar from "./nav-sidebar";

const Logo = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const nickname = await getCookie("userNickname");
      setIsUserLoggedIn(!!nickname);
    };
    checkUser();
  }, []);

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
        isUserLoggedIn={isUserLoggedIn}
      />
    </>
  );
};

export default Logo;
