import { TotalSchedulesByStatus } from "@/@types/reports";
import { Tooltip } from "antd";
import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TotalSchedulesByStatusProps {
  totalSchedulesByStatus: TotalSchedulesByStatus[];
}

function TotalSchedulesByStatus({
  totalSchedulesByStatus,
}: TotalSchedulesByStatusProps) {
  const COLORS = ["#52BE80", "#F05761"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {` ${(percent * 100).toFixed(0)}% `}
        </text>
      </>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <text
          x="50%"
          y="20"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="bold"
        >
          Total de Finalizados e Cancelados
        </text>

        <Pie
          data={totalSchedulesByStatus}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="total"
        >
          {totalSchedulesByStatus?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value, entry, index) =>
            totalSchedulesByStatus[index].status
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default TotalSchedulesByStatus;
