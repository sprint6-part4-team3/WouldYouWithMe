/* eslint-disable no-underscore-dangle */
import axios, { AxiosInstance } from "axios";
import { deleteCookie, setCookie } from "cookies-next";

import { getCookie } from "@/utils/next-cookie";
import redirectTo from "@/utils/next-redirect";

// authorization이라는 커스텀 속성 추가
declare module "axios" {
  export interface AxiosRequestConfig {
    authorization?: boolean;
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
  authorization: true, // 기본은 토큰을 담아서 보냅니다.
});

instance.interceptors.request.use(
  async (config) => {
    const hasConfig =
      !config.authorization || !config.headers || config.headers.Authorization;
    if (hasConfig) {
      return config;
    }
    const accessToken = await getCookie("token");

    if (!accessToken) return config;
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 (Unauthorized) 체크 and refresh token 이미 시도했는지 체크
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh token 시도
        const refreshToken = await getCookie("refreshToken");
        const { data } = await instance.post("/auth/refresh-token", {
          refreshToken,
        });
        const newAccessToken = data.accessToken;

        // 토큰 갱신
        setCookie("token", newAccessToken);

        // 갱신된 토큰으로 재시도
        instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return await instance(originalRequest);
      } catch (refreshError) {
        deleteCookie("refreshToken");
        deleteCookie("token");
        await redirectTo("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
