/* eslint-disable no-nested-ternary */

"use client";

import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/common";
import Motion from "@/components/common/framer-motion/motion";
import getUserGroups from "@/lib/api/user/get-user-groups";
import { ImgPlanet } from "@/public/assets/images";
import TeamEmpty from "@/public/assets/lotties/team-empty.json";
import { Group } from "@/types/user";

const MyTeams = () => {
  const [myTeams, setMyTeams] = useState<Group[] | null>(null);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const res = await getUserGroups();
        setMyTeams(res);
      } catch (e) {
        throw new Error("참여 중인 팀 가져오다가 오류가 발생했습니다.");
      }
    };
    getGroups();
  }, []);

  return (
    <div>
      <h1 className="mb-48 text-24-600">참여 중인 팀</h1>
      {myTeams && myTeams.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center pt-20">
          <Lottie
            className="size-2/3 h-auto min-w-250 max-w-500"
            animationData={TeamEmpty}
          />

          <div className="mb-48 mt-8 flex flex-col items-center text-14-500 text-text-default md:mb-80 md:mt-24 lg:text-16-500">
            <span>아직 소속된 팀이 없습니다.</span>
            <span>팀을 생성하거나 팀에 참여해보세요</span>
          </div>
        </div>
      ) : (
        <section className="mb-48 grid min-h-100 grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          {myTeams &&
            myTeams.map((team) => (
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
                        alt="기본 팀 이미지"
                      />
                    )}
                  </div>
                  <span className="text-16-500">{team.name}</span>
                </Link>
              </Motion>
            ))}
        </section>
      )}

      <div className="flex items-center justify-center gap-8 md:flex-col lg:gap-16">
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
    </div>
  );
};

export default MyTeams;
