import type { Meta, StoryObj } from "@storybook/react";

import NavBar from ".";

// 임시로 넣었습니다.
const loggedInUser = {
  id: 43,
  email: "test@test.com",
  nickname: "너구리",
};

const loggedInTeam = {
  id: 43,
  name: "코워커스",
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
    user: loggedInUser,
    team: loggedInTeam,
  },
  name: "로그인했을때",
};

export const LoggedOut: Story = {
  args: {
    user: null,
    team: null,
  },
  name: "로그인안했을때",
};
