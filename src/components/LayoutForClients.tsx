import React, { ReactNode, useState } from "react";
import { Layout, Menu, Button, Drawer, Row, Col } from "antd";
import Image from "next/image";
import styled from "styled-components";

const { Header, Content } = Layout;
import {
  HomeOutlined,
  ScheduleOutlined,
  SettingOutlined,
  MenuOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const LayoutForClients = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout className="layout">
      <HeaderWrapper>
        <Row justify="space-between" align="middle">
          <Col xs={20} sm={20} md={4}>
            <LogoWrapper>
              <Image
                priority
                src="/images/logo.svg"
                width={collapsed ? 45 : 60}
                height={collapsed ? 45 : 60}
                alt="Logo Hair Hub Barbershop"
              />
            </LogoWrapper>
          </Col>
          <Col xs={0} sm={0} md={20}>
            <Menu
              style={{
                width: "100%",
                background: "#16171b",
                color: "white",
              }}
              mode="horizontal"
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<ScheduleOutlined />}>
                Agendamentos
              </Menu.Item>
              <Menu.Item key="3" icon={<HeartOutlined />}>
                Favoritos
              </Menu.Item>
              <Menu.Item key="4" icon={<SettingOutlined />}>
                Meu Perfil
              </Menu.Item>
              <Menu.Item key="5">
                <Button>Sair</Button>
              </Menu.Item>
            </Menu>
          </Col>
          <Col xs={2} sm={2} md={0}>
            <Button type="primary" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
          </Col>
        </Row>
        <Drawer
          title="Menu"
          width={300}
          placement="right"
          // onClick={onClose}
          onClose={onClose}
          visible={visible}
        >
          <Menu mode="vertical" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<ScheduleOutlined />}>
              Agendamentos
            </Menu.Item>
            <Menu.Item key="3" icon={<HeartOutlined />}>
              Favoritos
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              Meu Perfi
            </Menu.Item>
            <Menu.Item key="5">
              <Button type="primary">Sair</Button>
            </Menu.Item>
          </Menu>
        </Drawer>
      </HeaderWrapper>
      <Content>{children}</Content>
    </Layout>
  );
};

export default LayoutForClients;

const HeaderWrapper = styled(Header)`
  width: 100%;
  background: #16171b;

  .ant-menu-light.ant-menu-horizontal > .ant-menu-item-active {
    background-color: #c1820b;
    color: #16171b;
  }

  .ant-menu-light.ant-menu-horizontal > .ant-menu-item-active::after {
    display: none;
  }

  .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected {
    background-color: #fff;
  }

  .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected::after {
    display: none;
  }

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
