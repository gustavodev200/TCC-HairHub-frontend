"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Col, Divider, Row } from "antd";
import { PageHeaderDashboard } from "@/components/PageHeader";
import {
  AverageTime,
  TotalSchedules,
  TotalSchedulesByStatus,
} from "@/components/ComponentsDashboad";

import { reportService } from "@/services/reports";
import dayjs, { Dayjs } from "dayjs";
import { AverageTimeReport, TotalReports } from "@/@types/reports";
import { ClientComponentLoader } from "@/components/ClientComponentLoader/ClientComponentLoader";

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

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);

  return (
    <Container>
      <PageHeaderDashboard
        pageTitle="Dashboard"
        handleDateChange={handleDateChange}
        selectedDates={selectedDates}
      />

      {data && (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={5}>
            <TotalSchedules
              totalSchedules={data?.totalSchedules as TotalReports}
            />
          </Col>
          <Col className="gutter-row" span={5}>
            <AverageTime
              titleCard="Tempo médio de serviço"
              averageTime={data?.averageServiceTime as AverageTimeReport}
            />
          </Col>
          <Col className="gutter-row" span={5}>
            <AverageTime
              titleCard="Tempo médio de espera"
              averageTime={data?.averageWaitingTime as AverageTimeReport}
            />
          </Col>
          <Col className="gutter-row" span={5}></Col>
          <Divider />
          <TotalSchedulesByStatus
            totalSchedulesByStatus={data?.totalSchedulesByStatus}
          />
        </Row>
      )}

      <p>Nenhum dado encontrado</p>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
