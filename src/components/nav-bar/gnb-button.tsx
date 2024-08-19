"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import { IconButton } from "../common";
import NavSideBar from "./nav-sidebar";

const GnbButton = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const cookieValue = getCookie("userId");
    setUserId(typeof cookieValue === "string" ? cookieValue : null);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!userId) {
    return null;
  }

  return (
    <>
      <IconButton
        icon="IconGnbMenu"
        variant="none"
        onClick={toggleSidebar}
        className="shrink-0 md:hidden"
      />

      <NavSideBar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
};

export default GnbButton;
