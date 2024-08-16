"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useToggle } from "@/hooks";
import getUserData from "@/lib/api/nav-bar/get-user";
import { IconDropdown, IconPlusCurrent } from "@/public/assets/icons";
import { ImgPlanet } from "@/public/assets/images";
import { recentTeamAtom } from "@/stores";
import { User } from "@/types/user";

import DropDown from "../common/drop-down";

const fetchUserData = async (): Promise<User> => {
  const response = await getUserData();
  return response;
};

const TeamDropdown = () => {
  const { data: user } = useQuery<User>({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  const teamDropdown = useToggle();
  const setRecentTeam = useSetAtom(recentTeamAtom);

  const teams = user?.memberships ?? [];
  const dropdownTeamName =
    useAtomValue(recentTeamAtom) ||
    (teams.length > 0 ? teams[0].group.name : "");
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTeams = isExpanded ? teams : teams.slice(0, 4);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (teams.length === 0) {
    return null;
  }

  return (
    <div className="mt-1 cursor-pointer whitespace-nowrap text-16-500 text-text-primary">
      <DropDown handleClose={teamDropdown.handleOff}>
        <DropDown.Trigger onClick={teamDropdown.handleToggle}>
          <div className="flex items-center">
            {dropdownTeamName}
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
              onClick={() => setRecentTeam(membership.group.name)}
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
          {teams.length > 4 && (
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
