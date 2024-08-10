"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { useToggle } from "@/hooks";
import getUserData from "@/lib/api/nav-bar/get-user";
import { IconDropdown, IconPlusCurrent } from "@/public/assets/icons";
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

  const teams = user?.memberships ?? [];
  // TODO - 최근 방문한 팀으로 변경 예정
  const firstTeamName = teams.length > 0 ? teams[0].group.name : "";

  if (teams.length === 0) {
    return null;
  }

  return (
    <div className="mt-1 cursor-pointer whitespace-nowrap text-16-500 text-text-primary">
      <DropDown handleClose={teamDropdown.handleOff}>
        <DropDown.Trigger onClick={teamDropdown.handleToggle}>
          <div className="flex items-center">
            {firstTeamName}
            <IconDropdown className="ml-8" />
          </div>
        </DropDown.Trigger>
        <DropDown.Menu
          isOpen={teamDropdown.value}
          position="top-50 right-0"
          className="w-140"
        >
          {teams.map((membership) => (
            <Link
              key={membership.group.id}
              href={`/team/${membership.group.id}`}
            >
              <DropDown.Item onClick={teamDropdown.handleOff}>
                {membership.group.image ? (
                  <div className="flex items-center">
                    <div className="relative ml-12 size-32">
                      <Image
                        src={membership.group.image}
                        alt={membership.group.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <span className="ml-12">{membership.group.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>{membership.group.name}</span>
                  </div>
                )}
              </DropDown.Item>
            </Link>
          ))}
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
