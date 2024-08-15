"use client";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useToast } from "@/hooks";
import instance from "@/lib/api/axios-instance";
import { userAtom } from "@/stores";

const KakaoAuth = () => {
  const router = useRouter();
  const { success, error } = useToast();
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const kakaoLogin = async () => {
      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      if (!code || !state) {
        return;
      }

      try {
        const response = await instance.post(`/auth/signIn/KAKAO`, {
          state,
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
        });

        const { data } = response;

        if (response.status === 200) {
          success("로그인 성공");
          setCookie("token", data.accessToken);
          setCookie("refreshToken", data.refreshToken);
          setCookie("userId", data.user.id);

          setUser({
            id: data.user.id,
            nickname: data.user.nickname,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
            image: data.user.image,
            teamId: data.user.teamId,
            email: data.user.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });

          router.push("/");
          setTimeout(() => {
            router.refresh();
          }, 50);
        } else {
          error("로그인 요청 중 오류가 발생했습니다.");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          error(err.response.data);
        } else {
          error("로그인 요청 중 오류가 발생했습니다.");
        }
      }
    };

    kakaoLogin();
  }, [router, error, success, setUser]);

  return null;
};

export default KakaoAuth;
