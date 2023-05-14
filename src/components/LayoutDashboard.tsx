"use client";

import React, { ReactNode, useState } from "react";
import {
  TagsOutlined,
  ScissorOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { HeaderWrapper } from "./Header";
import Image from "next/image";

import { useRouter } from "next/navigation";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Home", "/dashboard", <HomeOutlined />),
  getItem("Colaboradores", "/dashboard/employees", <UsergroupAddOutlined />),
  getItem("Serviços", "/dashboard/services", <ScissorOutlined />),
  getItem("Categorias", "/dashboard/categories", <TagsOutlined />),
];

const LayoutDashboard = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { push } = useRouter();

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100%", position: "fixed" }}>
      <SideBarWrapper
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <LogoWrapper>
          <Image
            priority
            src="/images/logo.svg"
            width={collapsed ? 50 : 100}
            height={collapsed ? 50 : 100}
            alt="Logo Hair Hub Barbershop"
          />
        </LogoWrapper>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => push(key)}
        />
      </SideBarWrapper>
      <Layout className="site-layout">
        <HeaderWrapper collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            padding: "32px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDashboard;

const SideBarWrapper = styled(Sider)`
  background: #0d0e12 !important;

  ul {
    background-color: inherit;

    .ant-menu-item-selected {
      background: #242731;
    }
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  img {
    margin: 10px 0 30px 0;
  }
`;
