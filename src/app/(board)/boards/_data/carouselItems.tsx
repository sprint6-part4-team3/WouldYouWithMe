import { IconCodeit } from "@/public/assets/icons";

const carouselItem = [
  {
    tag: "Info",
    title: "코드잇 스프린트",
    description: "프론트엔드 개발자로 취업하는 가장 빠른 부트캠프",
    icon: (
      <IconCodeit
        width={40}
        height={40}
        className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200"
      />
    ),
    background: "bg-point-purple",
  },
  {
    tag: "Info",
    title: "팀원 모집은 우주윗미!",
    description: "같이 스터디 일정관리 할 팀원을 구하고 싶어요",
    icon: (
      <IconCodeit
        width={40}
        height={40}
        className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200"
      />
    ),
    background: "bg-point-orange",
  },
  {
    tag: "Info",
    title: "팀 생성은 우주윗미!",
    description: "새로운 팀을 만들고 싶어요",
    icon: (
      <IconCodeit
        width={40}
        height={40}
        className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200"
      />
    ),
    background: "bg-point-pink",
  },
  {
    tag: "Info",
    title: "오늘의 명언",
    description: "“ 외국어 보다 코딩을 먼저 배워라. ”",
    icon: (
      <IconCodeit
        width={40}
        height={40}
        className="h-40 w-100 opacity-50 md:h-60 md:w-150 lg:h-80 lg:w-200"
      />
    ),
    background: "bg-point-blue",
  },
];

export default carouselItem;
