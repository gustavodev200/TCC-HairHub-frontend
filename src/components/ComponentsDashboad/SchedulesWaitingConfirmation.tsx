import React from "react";
import { Card, Divider } from "antd";
import { TotalReports } from "@/@types/reports";
import styled from "styled-components";

interface SchedulesWaitingConfirmationProps {
  schedulesWaitingConfirmation: TotalReports;
}

function SchedulesWaitingConfirmation({
  schedulesWaitingConfirmation,
}: SchedulesWaitingConfirmationProps) {
  return (
    <Card
      title="Aguardando Confirmação"
      bordered={false}
      style={{ width: 300 }}
    >
      <SchedulesWaitingConfirmationInfo>
        <Total>{schedulesWaitingConfirmation?.total}</Total>
      </SchedulesWaitingConfirmationInfo>

      <Divider />

      <SchedulesWaitingConfirmationInfoPorcentage>
        <p>Porcentagem:</p>
        <span>
          {schedulesWaitingConfirmation?.porcentage === null
            ? 0
            : schedulesWaitingConfirmation?.porcentage}
          %
        </span>
      </SchedulesWaitingConfirmationInfoPorcentage>
    </Card>
  );
}

const SchedulesWaitingConfirmationInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Total = styled.span`
  font-size: 4.5rem;
  color: #1f618d;
`;

const SchedulesWaitingConfirmationInfoPorcentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: bold;
    font-size: 20px;
  }
`;
export default SchedulesWaitingConfirmation;
