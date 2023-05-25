"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { useServerInsertedHTML } from "next/navigation";
import pt_BR from "antd/locale/pt_BR";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { ToastContainer } from "react-toastify";
import { LoadingComponent } from "../LoadingComponent";
import { useProgressIndicator } from "@/stores/useProgressIndicator";

export const ClientSideAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { items } = useProgressIndicator();
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  const [queryClient] = useState(() => new QueryClient());
  queryClient.setDefaultOptions({ queries: { refetchOnWindowFocus: false } });

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    styledComponentsStyleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  return (
    <ConfigProvider
      locale={pt_BR}
      theme={{
        token: {
          fontFamily: "var(--font-family)",
          colorPrimary: "#16171B",
          colorPrimaryBg: "#fff",
        },
      }}
    >
      <ToastContainer position="top-right" limit={3} />
      <QueryClientProvider client={queryClient}>
        {typeof window === "undefined" ? (
          <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
            {children as React.ReactChild}
          </StyleSheetManager>
        ) : (
          <>{children}</>
        )}
        {items.length > 0 && <LoadingComponent />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
};
