"use client";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import styled from "styled-components";

export default function DashboardPage() {
  return (
    <Container>
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Dia"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>

          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Col span={12}>
        <Statistic title="Active Users" value={112893} />
      </Col>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
