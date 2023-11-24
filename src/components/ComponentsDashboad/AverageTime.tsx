import React from "react";
import styled from "styled-components";
import { Card, Divider } from "antd";
import { AverageTimeReport } from "@/@types/reports";

interface AverageTimeProps {
  titleCard: string;
  averageTime: AverageTimeReport;
}

function AverageTime({ titleCard, averageTime }: AverageTimeProps) {
  return (
    <Card title={titleCard} bordered={false} style={{ width: 300 }}>
      <AverageTimeInfo>
        <Average>
          {averageTime?.average}
          <span>min</span>
        </Average>
      </AverageTimeInfo>

      <Divider />

      {/* <AverageTimeInfoPorcentage>
        <p>Porcentagem:</p>
        <span>
          {averageTime?.porcentage === null
            ? 0
            : averageTime?.porcentage.toFixed(2)}
          %
        </span>
      </AverageTimeInfoPorcentage> */}
    </Card>
  );
}

const AverageTimeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Average = styled.span`
  font-size: 4.5rem;
  color: #af601a;

  span {
    font-size: 1.7rem;
  }
`;

const AverageTimeInfoPorcentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: bold;
    font-size: 20px;
  }
`;
export default AverageTime;
