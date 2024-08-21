"use client";

import { useQuery } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useToggle } from "@/hooks";
import getUserData from "@/lib/api/nav-bar/get-user";
import { IconDropdown, IconPlusCurrent } from "@/public/assets/icons";
import { ImgPlanet } from "@/public/assets/images";
import { recentTeamAtom, userAtom } from "@/stores";
import { User } from "@/types/user";

import DropDown from "../common/drop-down";

const fetchUserData = async (): Promise<User> => {
  const response = await getUserData();
  return response;
};

const TeamDropdown = () => {
  const [user] = useAtom(userAtom);
  const userId = user.id;
  const useRecentTeamAtom = useMemo(() => recentTeamAtom(userId), [userId]);
  const [recentTeam, setRecentTeam] = useAtom(useRecentTeamAtom);

  const { data: userData, isLoading } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    enabled: !!userId,
    staleTime: 60000,
    gcTime: 300000,
  });

  const teamDropdown = useToggle();
  const [dropdownTeamName, setDropdownTeamName] = useState<string>("");

  useEffect(() => {
    if (!isLoading && userData) {
      if (userData.memberships.length > 0) {
        const firstTeam = userData.memberships[0].group;
        setCookie("firstTeamName", firstTeam.name);
      }
      if (recentTeam) {
        setDropdownTeamName(recentTeam.teamName);
      } else {
        setDropdownTeamName(userData.memberships[0].group.name);
        setRecentTeam({
          teamName: userData.memberships[0].group.name,
          groupId: userData.memberships[0].groupId,
        });
      }
    }
  }, [isLoading, userData, recentTeam, setRecentTeam]);

  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTeams = isExpanded
    ? (userData?.memberships ?? [])
    : (userData?.memberships ?? []).slice(0, 4);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading || !userId) {
    return null;
  }

  if (!userData?.memberships.length) {
    return (
      <Link href="/create-team" className="hidden text-text-primary md:flex">
        팀 생성
      </Link>
    );
  }

  return (
    <div className="mt-1 cursor-pointer whitespace-nowrap text-16-500 text-text-primary">
      <DropDown handleClose={teamDropdown.handleOff}>
        <DropDown.Trigger onClick={teamDropdown.handleToggle}>
          <div className="hidden items-center md:flex">
            {recentTeam?.teamName ? dropdownTeamName : "팀선택"}
            <IconDropdown className="ml-8" />
          </div>
        </DropDown.Trigger>
        <DropDown.Menu
          isOpen={teamDropdown.value}
          position="top-50 right-0"
          className="w-140"
        >
          {visibleTeams.map((membership) => (
            <Link
              key={membership.group.id}
              href={`/team/${membership.group.id}`}
              onClick={() =>
                setRecentTeam({
                  teamName: membership.group.name,
                  groupId: membership.groupId,
                })
              }
            >
              <DropDown.Item onClick={teamDropdown.handleOff}>
                <div className="flex items-center">
                  <div className="relative ml-12 size-32">
                    {membership.group.image ? (
                      <Image
                        src={membership.group.image}
                        alt={membership.group.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    ) : (
                      <Image
                        src={ImgPlanet}
                        alt="팀 기본이미지"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    )}
                  </div>
                  <span className="ml-12">{membership.group.name}</span>
                </div>
              </DropDown.Item>
            </Link>
          ))}
          {userData?.memberships.length > 4 && (
            <DropDown.Item onClick={toggleExpand}>
              <div className="flex items-center justify-center">
                {isExpanded ? "접기" : "팀 더보기"}
              </div>
            </DropDown.Item>
          )}
          <div className="rounded-12 border-t-2 border-border-primary" />
          <Link href="/create-team">
            <DropDown.Item onClick={teamDropdown.handleOff}>
              <div className="flex items-center justify-center">
                <IconPlusCurrent className="mr-5 stroke-white" />팀 생성하기
              </div>
            </DropDown.Item>
          </Link>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export default TeamDropdown;
