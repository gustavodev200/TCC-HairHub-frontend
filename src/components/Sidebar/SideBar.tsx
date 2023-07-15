"use client";

import { useMenuController } from "@/stores/useMenuController";
import { Drawer, theme } from "antd";
import { useEffect } from "react";
import styled from "styled-components";

const Aside = styled.aside`
  position: fixed;
  top: 0;
  width: 260px;
  height: 100vh;
  background-color: ${(props) => props.bgcolor};
  z-index: 101;
  ul {
    background-color: ${(props) => props.bgcolor};
    border: none;
    color: white;
    li:not(.ant-menu-item-selected):hover {
      color: white !important;
      background-color: rgb(255 255 255 / 10%) !important;
    }
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    background-color: ${(props) => props.bgcolor};
    padding: 0;
    ul {
      background-color: ${(props) => props.bgcolor};
      border: none;
      color: white;
      li:not(.ant-menu-item-selected):hover {
        color: white !important;
        background-color: rgb(255 255 255 / 10%) !important;
      }
    }
  }
  @media (min-width: 900px) {
    display: none;
  }
`;

export const SideBar: React.FC = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { isOpen, handleClose } = useMenuController();

  useEffect(() => {
    const handleAutoClose = () => {
      if (window.innerWidth > 900 && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("resize", handleAutoClose);

    return () => {
      window.removeEventListener("resize", handleAutoClose);
    };
  });

  return (
    <>
      <StyledDrawer
        width={260}
        bgcolor={token.colorPrimary}
        closable={false}
        placement="left"
        open={isOpen}
        onClose={handleClose}
      >
        {/* <SideBarContent /> */}
      </StyledDrawer>

      <Aside bgcolor={token.colorPrimary}>{/* <SideBarContent /> */}</Aside>
    </>
  );
};
