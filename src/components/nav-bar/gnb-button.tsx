"use client";

import { useState } from "react";

import { IconButton } from "../common";
import NavSideBar from "./nav-sidebar";

const GnbButton = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <IconButton
        aria-label="사이드바 햄버거 버튼"
        name="사이드바 햄버거 버튼"
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
