"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          // FIXME: 수정해도 되고 삭제해도 되고 추가해도 됨
          retry: false, // 실패하면 재시도 X
          refetchOnWindowFocus: false, // 창이 다시 포커스될 때 refetch X
          refetchOnReconnect: false, // 네트워크 연결이 복구되었을 때 refetch X
          staleTime: 60000, // 캐시 유지 시간 1분
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
