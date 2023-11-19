import { DetailedTotalReport } from "@/@types/reports";
import { AssignmentType } from "@/@types/role";
import { Token } from "@/@types/token";
import { Tooltip } from "antd";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface MostUsedPaymentMethodsProps {
  mostUsedPaymentMethods?: DetailedTotalReport[];
}

function MostUsedPaymentMethods(
  mostUsedPaymentMethods: MostUsedPaymentMethodsProps
) {
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <ResponsiveContainer width="80%" height={300}>
            <PieChart>
              <text
                x="50%"
                y="20"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="bold"
              >
                Tipos de pagamentos
              </text>
              <Pie
                data={mostUsedPaymentMethods.mostUsedPaymentMethods}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={4}
                dataKey="total"
              >
                {mostUsedPaymentMethods.mostUsedPaymentMethods?.map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </>
  );
}

export default MostUsedPaymentMethods;
