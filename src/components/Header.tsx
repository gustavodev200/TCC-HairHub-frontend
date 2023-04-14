"use client";

import { Layout } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { CloseOutlined, AlignLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const HeaderWrapper = ({ collapsed, setCollapsed }: HeaderProps) => {
  return (
    <HeaderContent>
      {React.createElement(collapsed ? AlignLeftOutlined : CloseOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
    </HeaderContent>
  );
};

const HeaderContent = styled(Header)`
  display: flex;
  align-items: center;
  background-color: #0d0e12;
  .trigger {
    color: #fff;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
