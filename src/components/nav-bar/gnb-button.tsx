"use client";

import { useState } from "react";

import IconButton from "../common/icon-button";
import NavSideBar from "./nav-sidebar";

const GnbButton = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
