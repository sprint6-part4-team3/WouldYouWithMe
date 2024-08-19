"use client";

import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useClickOutside, useIsMobile } from "@/hooks";
import getUserData from "@/lib/api/nav-bar/get-user";
import { recentTeamAtom, userAtom } from "@/stores";
import groupIdListAtom from "@/stores/group-list";
import { User } from "@/types/user";
import extractGroupId from "@/utils/extract-group-id";

import IconButton from "../common/icon-button";

const getUserId = () => {
  const cookieValue = getCookie("userId");
  return typeof cookieValue === "string" ? cookieValue : "";
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const fetchUserData = async (): Promise<User> => {
  const response = await getUserData();
  return response;
};

const NavSideBar = ({ isOpen, onClose }: SidebarProps) => {
  const userId = getUserId();

  const [, setGroupIdList] = useAtom(groupIdListAtom);
  const useRecentTeamAtom = useMemo(() => recentTeamAtom(userId), [userId]);
  const [, setRecentTeam] = useAtom(useRecentTeamAtom);

  const { data: user } = useQuery<User>({
    queryKey: ["userData", userId],
    queryFn: fetchUserData,
    enabled: !!userId,
  });

  useEffect(() => {
    if (user) {
      const groupIdsFromData = extractGroupId(user.memberships);
      setGroupIdList(groupIdsFromData);
    }
  }, [setGroupIdList, user]);

  const sidebarRef = useClickOutside(onClose);
  const isMobile = useIsMobile();

  const teams = user?.memberships ?? [];
  const hasTeams = teams.length > 0;

  const handleLinkClick = (teamName: string, groupId: number) => {
    setRecentTeam({
      teamName,
      groupId,
    });
    onClose();
  };

  if (!isMobile && isOpen) {
    onClose();
  }

  return (
    <motion.div
      ref={sidebarRef}
      className="fixed left-0 top-0 z-10 h-full w-204 bg-background-secondary"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen && isMobile ? "0%" : "-100%" }}
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
        {hasTeams && (
          <ul className="space-y-24">
            {teams.map((membership) => (
              <li key={membership.group.id}>
                <Link
                  href={`/${membership.group.id}`}
                  onClick={() =>
                    handleLinkClick(membership.group.name, membership.group.id)
                  }
                >
                  {membership.group.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-24">
          <Link href="/boards" onClick={onClose}>
            자유게시판
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NavSideBar;
