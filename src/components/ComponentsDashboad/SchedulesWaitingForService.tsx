import React from "react";
import { Card, Divider } from "antd";
import { TotalReports } from "@/@types/reports";
import styled from "styled-components";

interface SchedulesWaitingForServiceProps {
  schedulesWaitingForService: TotalReports;
}

function SchedulesWaitingForService({
  schedulesWaitingForService,
}: SchedulesWaitingForServiceProps) {
  return (
    <Card
      title="Aguardando Atendimento"
      bordered={false}
      style={{ width: 300 }}
    >
      <SchedulesWaitingForServiceInfo>
        <Total>{schedulesWaitingForService?.total}</Total>
      </SchedulesWaitingForServiceInfo>

      <Divider />

      <SchedulesWaitingForServiceInfoPorcentage>
        <p>Porcentagem:</p>
        <span>
          {schedulesWaitingForService?.porcentage === null
            ? 0
            : schedulesWaitingForService?.porcentage}
          %
        </span>
      </SchedulesWaitingForServiceInfoPorcentage>
    </Card>
  );
}

const SchedulesWaitingForServiceInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Total = styled.span`
  font-size: 4.5rem;
  color: #1f618d;
`;

const SchedulesWaitingForServiceInfoPorcentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: bold;
    font-size: 20px;
  }
`;

export default SchedulesWaitingForService;
