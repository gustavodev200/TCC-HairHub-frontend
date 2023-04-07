"use client";

import { useState } from "react";
import { ConfigProvider } from "antd";
import { useServerInsertedHTML } from "next/navigation";

import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export const ClientSideAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    styledComponentsStyleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#16171B",
          colorPrimaryBg: "#fff",
          // fontFamily: "var(--font-family)",
        },
      }}
    >
      {typeof window === "undefined" ? (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
          {children as React.ReactChild}
        </StyleSheetManager>
      ) : (
        <>{children}</>
      )}
    </ConfigProvider>
  );
};
