"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useClickOutside } from "@/hooks";
import { User } from "@/types/user";

import IconButton from "../common/icon-button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const NavSideBar = ({ isOpen, onClose, user }: SidebarProps) => {
  const sidebarRef = useClickOutside(onClose);
  const teams = user?.memberships ?? [];
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <motion.div
      ref={sidebarRef}
      className="fixed left-0 top-0 h-full w-1/2 bg-background-secondary"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <IconButton
        icon="IconX"
        variant="none"
        isBorder={false}
        onClick={onClose}
        className="absolute right-22 top-22"
      />
      <div className="ml-16 mt-75">
        {user ? (
          <>
            <ul className="space-y-24">
              {teams.map((membership) => (
                <li key={membership.group.id}>
                  <Link
                    href={`/team${membership.group.id}`}
                    onClick={handleLinkClick}
                  >
                    {membership.group.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-24">
              <Link href="/" onClick={handleLinkClick}>
                자유게시판
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-24">
            <Link href="/" onClick={handleLinkClick}>
              자유게시판
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavSideBar;
