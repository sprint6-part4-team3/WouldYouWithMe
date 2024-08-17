"use client";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";

import { useToast } from "@/hooks";
import instance from "@/lib/api/axios-instance";
import { userAtom } from "@/stores";
import redirectTo from "@/utils/next-redirect";

const KakaoAuth = () => {
  const { success, error } = useToast();
  const [, setUser] = useAtom(userAtom);
  const isProcessing = useRef(false);

  useEffect(() => {
    const kakaoLogin = async () => {
      if (typeof window === "undefined" || isProcessing.current) return;

      isProcessing.current = true;

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");

      if (!code || !state) {
        isProcessing.current = false;
        return;
      }

      try {
        const response = await instance.post(`/auth/signIn/KAKAO`, {
          state,
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
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
            loginType: "KAKAO",
          });

          redirectTo("/");
        } else {
          error("로그인 요청 중 오류가 발생했습니다.");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          error(err.response.data.message);
        } else {
          error("로그인 요청 중 오류가 발생했습니다.");
        }
      } finally {
        isProcessing.current = false;
      }
    };

    kakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default KakaoAuth;
