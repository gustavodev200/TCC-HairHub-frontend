import { AssignmentType } from "@/@types/role";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { Token } from "@/@types/token";

import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { Divider } from "antd";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

import Image from "next/image";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";

interface Props {
  data: ScheduleOutputDTO;
  clearData: () => void;
}

const ComponentPrinterSchedules = forwardRef<HTMLDivElement, Props>(
  ({ data, clearData }, ref) => {
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

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      onAfterPrint: () => {
        clearData();
      },
    });

    useEffect(() => {
      handlePrint();
    }, [handlePrint]);
    return (
      <Container ref={componentRef}>
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
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>AGENDAMENTO</h2>
          <p>{data?.client?.name}</p>
          <p>{dayjs(data?.start_date_time).format("DD/MM/YYYY")}</p>
        </div>

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>
            Serviços realizados
          </h3>
          <TableContainer>
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {data?.services?.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{formatCurrency(service.price)}</td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight: "bold" }}>Total</td>
                <td style={{ fontWeight: "bold" }}>
                  {formatCurrency(
                    data.services.reduce((a, b) => a + b.price, 0)
                  )}
                </td>
              </tr>
            </tbody>
          </TableContainer>
        </div>

        <Divider />

        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>Consumos</h3>
          <TableContainer>
            <thead>
              <tr>
                <th>Itens</th>
                <th>Quantidade</th>
                <th>Preço(Unitário)</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {data?.consumption?.products_consumption?.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{formatCurrency(product.price * product.quantity)}</td>
                </tr>
              ))}

              <tr>
                <td colSpan={3} style={{ fontWeight: "bold" }}>
                  Total
                </td>

                <td
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {formatCurrency(
                    data?.consumption?.products_consumption?.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </TableContainer>
        </div>

        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: "1.5rem",
            }}
          >
            Total
          </h3>
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            {formatCurrency(data?.consumption?.total_amount)}
          </span>
        </div>
        <Divider />
      </Container>
    );
  }
);

const TableContainer = styled.table`
  width: 100%;
  border: 1px solid #4e4e4e;
  border-spacing: 0;

  th,
  td {
    border-collapse: collapse;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #4e4e4e;
  }

  th,
  td:not(:first-of-type) {
    border-left: 1px solid #4e4e4e;
  }

  th:first-of-type,
  td:first-of-type {
    border-left: none;
  }

  th:last-child,
  td:last-child {
    border-right: none;
  }

  th {
    font-weight: bold;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const Container = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.875rem;
  margin: 40px;
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

ComponentPrinterSchedules.displayName = "ComponentPrinterSchedules";

export default ComponentPrinterSchedules;
