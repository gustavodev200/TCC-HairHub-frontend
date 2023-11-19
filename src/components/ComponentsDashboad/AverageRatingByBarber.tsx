import { useEffect, useState } from "react";
import { AverageRatingReport } from "@/@types/reports";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ResponsiveContainer } from "recharts";
import { Token } from "@/@types/token";
import { AssignmentType } from "@/@types/role";
import styled from "styled-components";
import { Card, Divider, Rate } from "antd";

interface AverageRatingByBarberProps {
  averageRatingByBarber?: AverageRatingReport[];
}

function AverageRatingByBarber({
  averageRatingByBarber,
}: AverageRatingByBarberProps) {
  const [user, setUser] = useState<Token>();

  const accessToken = getCookie("@hairhub");

  useEffect(() => {
    if (accessToken) {
      const decodedToken: Token = jwtDecode(accessToken as string);
      setUser(decodedToken);
    }
  }, [accessToken]);

  return (
    <>
      {user && user?.role === AssignmentType.ADMIN ? (
        <div style={{ width: "100%" }}>
          <h6
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              fontSize: "1rem",
              marginLeft: "2rem",
            }}
          >
            Média de avaliações por barbeiros
          </h6>
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
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 20, right: 20 }}
              />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="average"
                fill="#A569BD"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <Card
          title="Média de avaliações"
          bordered={false}
          style={{ width: 300 }}
        >
          {averageRatingByBarber && averageRatingByBarber.length > 0 ? (
            <>
              <AverageTimeInfo>
                <Average>{averageRatingByBarber[0]?.average}</Average>
              </AverageTimeInfo>

              <Divider />

              <Rate
                allowHalf
                disabled
                defaultValue={averageRatingByBarber[0]?.average}
              />
            </>
          ) : (
            <p>Nenhuma avaliação disponível.</p>
          )}
        </Card>
      )}
    </>
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

export default AverageRatingByBarber;
