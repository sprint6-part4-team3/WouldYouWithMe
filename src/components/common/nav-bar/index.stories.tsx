import type { Meta, StoryObj } from "@storybook/react";

import NavBar from ".";

// 임시로 넣은 값
const loggedInUser = {
  id: 44,
  email: "test1@test1.com",
  nickname: "xxx",
  image: null,
  teamId: "6-3",
  memberships: [],
};

const loggedInTeam = {
  id: 44,
  email: "test1@test1.com",
  nickname: "xxx",
  image: null,
  teamId: "6-3",
  memberships: [
    {
      userId: 44,
      groupId: 30,
      userName: "xxx",
      userEmail: "test1@test1.com",
      userImage: null,
      role: "ADMIN",
      group: {
        id: 30,
        teamId: null,
        name: "테스트1팀",
        image: "https://example.com/...",
        createdAt: "2024-08-02T09:12:09.418Z",
        updatedAt: "2024-08-02T09:12:09.418Z",
      },
    },
  ],
};

const meta = {
  title: "Components/NavBar",
  component: NavBar,
  tags: ["autodocs"],
} as Meta<typeof NavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: loggedInTeam,
  },
  name: "로그인했을때",
};

export const LoggedOut: Story = {
  args: {
    user: null,
  },
  name: "로그인안했을때",
};

export const LoggedInNotTeam: Story = {
  args: {
    user: loggedInUser,
  },
  name: "로그인했는데팀이없을때",
};
