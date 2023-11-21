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
  SchedulesWaitingConfirmation,
  TotalRevenue,
  TotalSchedules,
  TotalSchedulesByStatus,
} from "@/components/ComponentsDashboad";

import { reportService } from "@/services/reports";
import dayjs, { Dayjs } from "dayjs";
import { AverageTimeReport, ReportsDTO, TotalReports } from "@/@types/reports";
import { getCookie } from "cookies-next";
import { Token } from "@/@types/token";
import jwtDecode from "jwt-decode";
import { AssignmentType } from "@/@types/role";
import SchedulesWaitingForService from "@/components/ComponentsDashboad/SchedulesWaitingForService";

export default function DashboardPage() {
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([
    dayjs().subtract(15, "days"),
    dayjs(),
  ]);

  const [user, setUser] = useState<Token>();

  const accessToken = getCookie("@hairhub");

  useEffect(() => {
    if (accessToken) {
      const decodedToken: Token = jwtDecode(accessToken as string);
      setUser(decodedToken);
    }
  }, [accessToken]);

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

          {user && user.role === AssignmentType.ATTENDANT ? (
            <>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={12}
                lg={6}
                style={{ marginBottom: "14px" }}
              >
                <SchedulesWaitingConfirmation
                  schedulesWaitingConfirmation={
                    data.schedulesWaitingConfirmation as TotalReports
                  }
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
                <SchedulesWaitingForService
                  schedulesWaitingForService={
                    data.schedulesWaitingForService as TotalReports
                  }
                />
              </Col>
            </>
          ) : null}

          <Divider />

          {user &&
          user.role !== AssignmentType.ATTENDANT &&
          user.role !== AssignmentType.CLIENT ? (
            <>
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
                  totalSchedulesByStatus={
                    data?.totalSchedulesByStatus as TotalSchedulesByStatus[]
                  }
                />
              </Col>
            </>
          ) : null}

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
