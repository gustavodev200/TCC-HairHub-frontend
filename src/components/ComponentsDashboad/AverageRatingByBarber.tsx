import { AverageRatingReport } from "@/@types/reports";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import { ResponsiveContainer } from "recharts";

interface AverageRatingByBarberProps {
  averageRatingByBarber?: AverageRatingReport[];
}

function AverageRatingByBarber({
  averageRatingByBarber,
}: AverageRatingByBarberProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={averageRatingByBarber}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="average" fill="#A569BD" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AverageRatingByBarber;
