"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Col, Divider, Row } from "antd";
import { PageHeaderDashboard } from "@/components/PageHeader";
import {
  AverageRatingByBarber,
  AverageTime,
  ComponentPrinter,
  ExecutedServicesByBarber,
  MostUsedPaymentMethods,
  TotalRevenue,
  TotalSchedules,
  TotalSchedulesByStatus,
} from "@/components/ComponentsDashboad";

import { reportService } from "@/services/reports";
import dayjs, { Dayjs } from "dayjs";
import { AverageTimeReport, ReportsDTO, TotalReports } from "@/@types/reports";

export default function DashboardPage() {
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([
    dayjs().subtract(15, "days"),
    dayjs(),
  ]);
  const { data } = useQuery(["reports", selectedDates], {
    queryFn: () =>
      reportService.getReports(
        dayjs(selectedDates[0]).toISOString(),
        dayjs(selectedDates[1]).toISOString()
      ),
  });

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    setSelectedDates(dates);
  };

  return (
    <Container>
      <PageHeaderDashboard
        pageTitle="Dashboard"
        handleDateChange={handleDateChange}
        selectedDates={selectedDates}
        data={data as ReportsDTO}
      />

      {data && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            <TotalSchedules
              totalSchedules={data?.totalSchedules as TotalReports}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            <AverageTime
              titleCard="Tempo médio de serviço"
              averageTime={data?.averageServiceTime as AverageTimeReport}
            />
          </Col>
          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            <AverageTime
              titleCard="Tempo médio de espera"
              averageTime={data?.averageWaitingTime as AverageTimeReport}
            />
          </Col>

          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            {data?.totalRevenue ? (
              <TotalRevenue totalRevenue={data.totalRevenue} />
            ) : null}
          </Col>
          <Divider />

          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            {data?.totalRevenue ? (
              <AverageRatingByBarber
                averageRatingByBarber={data?.averageRatingByBarber}
              />
            ) : null}
          </Col>
          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            <TotalSchedulesByStatus
              totalSchedulesByStatus={data?.totalSchedulesByStatus}
            />
          </Col>

          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            {data?.executedServicesByBarber ? (
              <ExecutedServicesByBarber
                executedServicesByBarber={data.executedServicesByBarber}
              />
            ) : null}
          </Col>

          <Col
            className="gutter-row"
            xs={24}
            sm={24}
            md={12}
            lg={6}
            style={{ marginBottom: "14px" }}
          >
            {data?.totalRevenue ? (
              <MostUsedPaymentMethods
                mostUsedPaymentMethods={data?.mostUsedPaymentMethods}
              />
            ) : null}
          </Col>
        </Row>
      )}

      {!data && <p>Nenhum dado encontrado</p>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;
