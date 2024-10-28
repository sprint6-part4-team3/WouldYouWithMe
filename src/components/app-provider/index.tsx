"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useEffect, useState } from "react";

import ChannelService from "../common/channel-talk";
import SuspenseWrappedPreviousPageComponent from "./previous-page";

const AppProvider = ({ children }: PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // 실패하면 재시도 X
          staleTime: 60000, // 캐시 유지 시간 1분
        },
      },
    }),
  );

  useEffect(() => {
    ChannelService.loadScript();

    ChannelService.boot({
      pluginKey: "cc4e06f3-bd5d-4c8f-a62d-733460cb0b33",
    });
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
      <SuspenseWrappedPreviousPageComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
