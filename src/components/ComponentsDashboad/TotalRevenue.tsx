import React from "react";
import { TotalReports } from "@/@types/reports";
import styled from "styled-components";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { Card, Divider } from "antd";

interface TotalRevenueProps {
  totalRevenue: TotalReports;
}

function TotalRevenue({ totalRevenue }: TotalRevenueProps) {
  return (
    <Card
      title="Receita Total"
      bordered={false}
      style={{
        width: 300,
        height: 265,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <TotalSchedulesInfo>
        <Total>{formatCurrency(totalRevenue?.total)}</Total>
      </TotalSchedulesInfo>

      <Divider />

      {/* <TotalSchedulesInfoPorcentage>
        <p>Porcentagem:</p>
        <span>
          {totalRevenue?.porcentage === null ? 0 : totalRevenue?.porcentage}%
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
  font-size: 3rem;
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
export default TotalRevenue;
