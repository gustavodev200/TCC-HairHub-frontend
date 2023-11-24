import React from "react";
import { Card, Divider } from "antd";
import { TotalReports } from "@/@types/reports";
import styled from "styled-components";

interface TotalSchedulesProps {
  totalSchedules: TotalReports;
}

function TotalSchedules({ totalSchedules }: TotalSchedulesProps) {
  return (
    <Card title="Total de Agendamentos" bordered={false} style={{ width: 300 }}>
      <TotalSchedulesInfo>
        <Total>{totalSchedules?.total}</Total>
      </TotalSchedulesInfo>

      <Divider />

      {/* <TotalSchedulesInfoPorcentage>
        <p>Porcentagem:</p>
        <span>
          {totalSchedules?.porcentage === null ? 0 : totalSchedules?.porcentage}
          %
        </span>
      </TotalSchedulesInfoPorcentage> */}
    </Card>
  );
}

const TotalSchedulesInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Total = styled.span`
  font-size: 4.5rem;
  color: #1f618d;
`;

const TotalSchedulesInfoPorcentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: bold;
    font-size: 20px;
  }
`;

export default TotalSchedules;
