"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import { useClickOutside, useIsMobile } from "@/hooks";
import getUserData from "@/lib/api/nav-bar/get-user";
import { recentTeamAtom, userAtom } from "@/stores";
import groupIdListAtom from "@/stores/group-list";
import { User } from "@/types/user";
import extractGroupId from "@/utils/extract-group-id";

import IconButton from "../common/icon-button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const fetchUserData = async (): Promise<User> => {
  const response = await getUserData();
  return response;
};

const NavSideBar = ({ isOpen, onClose }: SidebarProps) => {
  const [user] = useAtom(userAtom);
  const userId = user.id;
  const [, setGroupIdList] = useAtom(groupIdListAtom);
  const useRecentTeamAtom = useMemo(() => recentTeamAtom(userId), [userId]);
  const [, setRecentTeam] = useAtom(useRecentTeamAtom);

  const { data: userData } = useQuery<User>({
    queryKey: ["userData", userId],
    queryFn: fetchUserData,
    enabled: !!userId,
  });

  useEffect(() => {
    if (userData) {
      const groupIdsFromData = extractGroupId(userData.memberships);
      setGroupIdList(groupIdsFromData);
    }
  }, [setGroupIdList, userData]);

  const sidebarRef = useClickOutside(onClose);
  const isMobile = useIsMobile();

  const teams = userData?.memberships ?? [];
  const hasTeams = teams.length > 0;
  const isLoggedIn = userId !== 0;

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
        aria-label="사이드바 닫기 버튼"
        name="사이드바 닫기 버튼"
        icon="IconX"
        variant="none"
        isBorder={false}
        onClick={onClose}
        className="absolute right-22 top-22"
      />
      <div className="ml-16 mt-75">
        {isLoggedIn ? (
          <>
            {hasTeams && (
              <ul
                className={clsx("space-y-24", {
                  "max-h-[calc(100vh-190px)] overflow-y-auto":
                    teams.length > 10,
                })}
              >
                {teams.map((membership) => (
                  <li key={membership.group.id}>
                    <Link
                      href={`/team/${membership.group.id}`}
                      onClick={() =>
                        handleLinkClick(
                          membership.group.name,
                          membership.group.id,
                        )
                      }
                    >
                      <span className="block w-full truncate">
                        {membership.group.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-24 flex flex-col gap-24">
              <Link
                href="/create-team"
                onClick={onClose}
                className="text-brand-primary"
              >
                팀 생성하기
              </Link>
              <Link
                href="/boards"
                onClick={onClose}
                className="text-brand-primary"
              >
                모집게시판
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-24 flex flex-col gap-24">
            <Link
              href="/boards"
              onClick={onClose}
              className="text-brand-primary"
            >
              모집게시판
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NavSideBar;
