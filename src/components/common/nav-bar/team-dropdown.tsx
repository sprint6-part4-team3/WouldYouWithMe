"use client";

import Link from "next/link";
import { useState } from "react";

import { useToggle } from "@/hooks";
import { IconDropdown, IconPlusCurrent } from "@/public/assets/icons";
import { User } from "@/types/user";

import DropDown from "../drop-down";

interface TeamDropdownProps {
  user: User;
}

const TeamDropdown = ({ user }: TeamDropdownProps) => {
  const [teamNumber, setTeamNumber] = useState(0);
  const teamDropdown = useToggle();
  const teams = user.memberships;
  const firstTeamName = teams[teamNumber].group.name;

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
          {teams.map((membership, index) => (
            <DropDown.Item
              onClick={() => {
                setTeamNumber(index);
                teamDropdown.handleOff();
              }}
              key={membership.group.id}
            >
              <div className="flex items-center">
                <div className="ml-12 size-32 rounded-md bg-point-blue" />
                <span className="ml-12">
                  <Link href={`/team${membership.group.id}`}>
                    {membership.group.name}
                  </Link>
                </span>
              </div>
            </DropDown.Item>
          ))}
          <DropDown.Item>
            <div className="flex items-center justify-center">
              <IconPlusCurrent className="mr-5 stroke-white" />팀 추가하기
            </div>
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export default TeamDropdown;
