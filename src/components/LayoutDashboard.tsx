"use client";

import React, { ReactNode, useEffect, useState } from "react";
import {
  TagsOutlined,
  ScissorOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  ShoppingOutlined,
  ScheduleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MenuProps, Skeleton } from "antd";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { HeaderWrapper } from "./Header";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { AssignmentType } from "@/@types/role";
import jwtDecode from "jwt-decode";
import { getAuthorizedRoutesByRoles } from "@/helpers/utils/getAuthorizedRoutesByRole";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: string,
  key: React.Key,
  icon?: React.ReactNode,
  items?: MenuItem[],
  type?: "group",
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    items,
    label,
    type,
    onClick,
  } as MenuItem;
}

const LayoutDashboard = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { push } = useRouter();
  const pathname = usePathname();
  const accessToken = getCookie("@hairhub");
  const router = useRouter();

  const handleLogout = () => {
    // Remove o cookie
    deleteCookie("@hairhub");

    // Redireciona para a página de login ou qualquer outra página desejada
    router.push("/");
  };

  const { role } =
    typeof window === "undefined"
      ? { role: AssignmentType.ADMIN }
      : accessToken
      ? (jwtDecode(accessToken as string) as { role: AssignmentType })
      : { role: AssignmentType.ADMIN };

  const items: MenuItem[] = [
    getItem("Home", "/dashboard", <HomeOutlined />),
    getItem("Colaboradores", "/dashboard/employees", <UsergroupAddOutlined />),
    getItem("Clientes", "/dashboard/clients", <UserOutlined />),
    getItem("Serviços", "/dashboard/services", <ScissorOutlined />),
    getItem("Categorias", "/dashboard/categories", <TagsOutlined />),
    getItem("Produtos", "/dashboard/products", <ShoppingOutlined />),
    getItem("Agendamentos", "/dashboard/schedules", <ScheduleOutlined />),
    {
      label: "Sair",
      key: "/dashboard/login",
      icon: <LogoutOutlined />,
      onClick: handleLogout, // Adicionando a função de logout aqui
    },
  ];

  const [itemsToShow, setItemsToShow] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (typeof accessToken === "string") {
      setItemsToShow(
        items.filter((item) =>
          getAuthorizedRoutesByRoles(role).includes((item?.key as string) ?? "")
        )
      );
    }
  }, [accessToken]);

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
          items={itemsToShow}
          defaultSelectedKeys={[pathname]}
          onClick={({ key }) => push(key)}
        />
      </SideBarWrapper>
      <Layout className="site-layout">
        <HeaderWrapper collapsed={collapsed} setCollapsed={setCollapsed} />
        <ContentContainer
          style={{
            width: "100%",
            height: "calc(100vh - 64px)",
            overflowY: "auto",
            padding: "32px",
            overflowX: "hidden",
          }}
        >
          {children}
        </ContentContainer>
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

  @media (max-width: 768px) {
    display: ${({ collapsed }) => (collapsed ? "none" : "block")};
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

const ContentContainer = styled(Content)`
  @media (max-width: 768px) {
    padding: 16px 8px !important;
  }
`;
