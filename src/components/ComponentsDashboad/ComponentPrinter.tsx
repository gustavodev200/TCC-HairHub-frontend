import { ReportsDTO } from "@/@types/reports";
import { AssignmentType } from "@/@types/role";
import { Token } from "@/@types/token";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { Divider } from "antd";
import { getCookie } from "cookies-next";
import dayjs, { Dayjs } from "dayjs";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  data: ReportsDTO;
  selectedDates: Dayjs[];
}

const ComponentPrinter = forwardRef<HTMLDivElement, Props>(
  ({ data, selectedDates }, ref) => {
    function obterDataHoraAtual() {
      const agora = dayjs();
      const dataHoraFormatada = agora.format("DD [de] MMMM [de] YYYY, HH:mm");
      return dataHoraFormatada;
    }

    const [user, setUser] = useState<Token>();

    const accessToken = getCookie("@hairhub");

    useEffect(() => {
      if (accessToken) {
        const decodedToken: Token = jwtDecode(accessToken as string);
        setUser(decodedToken);
      }
    }, [accessToken]);

    return (
      <Container ref={ref}>
        <HeaderToPDF>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ImageLogo>
              <Image src="/images/logo.svg" width={90} height={90} alt="Logo" />
            </ImageLogo>
            <TitleLogo>
              <span>Hair Hub</span>
              <span>BarberShop</span>
            </TitleLogo>
          </div>
          <span>{obterDataHoraAtual()}</span>
        </HeaderToPDF>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h3>
            RELATÓRIO DO PERÍODO {selectedDates[0].format("DD/MM/YYYY")} À{" "}
            {selectedDates[1].format("DD/MM/YYYY")}
          </h3>
        </div>

        <div>
          <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>
            Agendamentos
          </h2>
          <span>
            Houveram <strong>{data?.totalSchedules?.total}</strong> agendamentos
            no período selecionado, com o tempo médio de serviço de
            <strong> {data?.averageServiceTime?.average} minutos</strong> e
            média de espera de{" "}
            <strong> {data?.averageWaitingTime?.average} minutos. </strong>
            {/* Validar plural */}
            Dos quais <strong>
              {data?.totalSchedulesByStatus[0].total}
            </strong>{" "}
            foram finalizados e{" "}
            <strong>{data?.totalSchedulesByStatus[1].total}</strong> foram
            cancelados.
          </span>
          {/* Validar plural */}
        </div>

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
            Serviços concluídos por barbeiro
          </h3>
          <TableContainer>
            <thead>
              <tr>
                <th>Barbeiro</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data?.executedServicesByBarber?.map((barber) => (
                <tr key={barber.id}>
                  <td>{barber.name}</td>
                  <td>{barber.total}</td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </div>

        <Divider />

        {user && user?.role === AssignmentType.ADMIN && (
          <>
            <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>
              Rentabilidade e Receitas
            </h2>

            <div>
              <p>
                <strong>Receita do período: </strong>
                {formatCurrency(data?.totalRevenue?.total ?? 0)}
              </p>
            </div>

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
                Tipos de pagamentos mais utilizados
              </h3>
              <TableContainer>
                <thead>
                  <tr>
                    <th>Tipo de pagamento</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.mostUsedPaymentMethods?.map((type) => (
                    <tr key={type.id}>
                      <td>{type.name}</td>
                      <td>{type.total}</td>
                    </tr>
                  ))}
                </tbody>
              </TableContainer>
            </div>
          </>
        )}

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
            Média de avaliação dos barbeiros
          </h3>
          <TableContainer>
            <thead>
              <tr>
                <th>Barbeiro</th>
                <th>Média</th>
              </tr>
            </thead>
            <tbody>
              {data?.averageRatingByBarber?.map((average) => (
                <tr key={average.id}>
                  <td>{average.name}</td>
                  <td>{average.average}</td>
                </tr>
              ))}
            </tbody>
          </TableContainer>
        </div>
      </Container>
    );
  }
);

const TableContainer = styled.table`
  width: 100%;
  border: 1px solid #4e4e4e;
  border-spacing: 0;
  th {
    width: 50%;
    border-bottom: 1px solid #4e4e4e;
  }

  tr:not(:last-of-type) {
    td {
      border-bottom: 1px solid #4e4e4e;
    }
  }
  th,
  td {
    border-collapse: collapse;
    padding: 10px;
    text-align: left;
  }

  th:first-of-type,
  td:first-of-type {
    border-right: 1px solid #4e4e4e;
  }
`;

const Container = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.875rem;
  margin: 8px;
  @media print {
    display: block;
  }
`;

const HeaderToPDF = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageLogo = styled.div`
  background-color: #242731;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const TitleLogo = styled.div`
  display: flex;
  flex-direction: column;

  span:nth-child(1) {
    font-size: 25px;
    margin-left: 5px;
    font-weight: bold;
  }
  span {
    font-size: 15px;
    margin-left: 5px;
  }
`;

ComponentPrinter.displayName = "ComponentPrinter";

export default ComponentPrinter;
