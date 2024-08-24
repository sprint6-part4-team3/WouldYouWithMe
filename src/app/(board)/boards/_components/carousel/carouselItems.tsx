"use client";

import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/components/common";
import { useToast } from "@/hooks";
import {
  IconBannerWord,
  IconBannerWYWM,
  IconCodeit,
} from "@/public/assets/icons";
import { userAtom } from "@/stores";

import Carousel from ".";

const CarouselItems = () => {
  const toast = useToast();
  const [user] = useAtom(userAtom);
  const router = useRouter();

  const isLogin = useMemo(() => user.id !== 0, [user]);

  const carouselItem = [
    {
      tag: "Info",
      title: "코드잇 스프린트",
      description: "프론트엔드 개발자로 취업하는 가장 빠른 부트캠프",
      icon: (
        <IconCodeit
          width={40}
          height={40}
          className="h-40 w-100 md:h-60 md:w-150 lg:h-80 lg:w-200"
        />
      ),
      background: "bg-purple-500",
      children: (
        <a
          href="https://sprint.codeit.kr/admissions/21/detail"
          className="h-40 w-100"
          target="_blank"
        >
          <Button className="h-40 w-100" variant="primary">
            바로가기
          </Button>
        </a>
      ),
    },
    {
      tag: "QnA",
      title: "팀을 만들고 싶어요!",
      description: "투두리스트를 관리하기 위해서는 팀이 필요해요",
      icon: (
        <IconBannerWYWM
          width={40}
          height={40}
          className="h-40 w-100 md:h-100 md:w-190 lg:h-100 lg:w-250"
        />
      ),
      background: "bg-pink-500",
      children: (
        <Link
          href="/create-team"
          className="w-100"
          onClick={(e) => {
            if (!isLogin) {
              e.preventDefault();
              toast.error("로그인 후 이용해주세요");
              router.push("/login");
            }
          }}
        >
          <Button className="h-40 w-100" variant="primary">
            바로가기
          </Button>
        </Link>
      ),
    },
    {
      tag: "QnA",
      title: "팀에 참여하고 싶어요!",
      description: "아래 모집 게시글을 보고 팀에 참여해보세요",
      icon: (
        <IconBannerWYWM
          width={40}
          height={40}
          className="h-40 w-100 md:h-100 md:w-190 lg:h-100 lg:w-250"
        />
      ),
      background: "bg-amber-600",
    },
    {
      tag: "Info",
      title: "영감이 되는 명언",
      description: "명언",
      icon: (
        <IconBannerWord
          width={40}
          height={40}
          className="h-40 w-100 md:h-110 md:w-150 lg:h-150 lg:w-180"
        />
      ),
      background: "bg-indigo-600",
    },
  ];

  return <Carousel items={carouselItem} />;
};

export default CarouselItems;
