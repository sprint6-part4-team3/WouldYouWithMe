import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/common";
import Motion from "@/components/common/framer-motion/motion";
import getGroups from "@/lib/api/user/get-groups";
import { ImgPlanet } from "@/public/assets/images";

const MyTeams = async () => {
  const myTeams = await getGroups();
  return (
    <>
      <h1 className="text-24-600">참여 중인 팀</h1>
      <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
        {myTeams.map((team) => (
          <Motion
            key={team.id}
            animation="fade-in"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 1.5 }}
            className="w-full"
          >
            <Link
              className="mb-12 flex w-full flex-col items-center justify-center gap-15 rounded-12 bg-background-secondary px-14 py-30 hover:bg-background-tertiary"
              href={`/team/${team.id}`}
            >
              <div className="relative size-52">
                {team.image ? (
                  <Image
                    src={team.image}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                    alt="팀 이미지"
                  />
                ) : (
                  <Image
                    src={ImgPlanet}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                    alt="팀 기본 이미지"
                  />
                )}
              </div>
              <span className="text-16-500">{team.name}</span>
            </Link>
          </Motion>
        ))}
      </section>
      <div className="flex justify-center gap-8 lg:gap-16">
        <Link href="/create-team">
          <Button className="h-48 w-186 text-14 lg:text-16" variant="primary">
            팀 생성하기
          </Button>
        </Link>
        <Link href="/join-team">
          <Button className="h-48 w-186 text-14 lg:text-16" variant="noFill">
            팀 참여하기
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MyTeams;
