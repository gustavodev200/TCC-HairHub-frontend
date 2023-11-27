"use client";

import { Table, Button, Space, Select, Spin } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import dayjs, { Dayjs } from "dayjs";
import { TagColor } from "@/components/Tag";
import { scheduleService } from "@/services/schedule";
import { renameStatusInTable } from "@/helpers/utils/ranameStatusInTable";
import ActionsMenu from "./ActionsMenu";
import { useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";
import { useUpdateStore } from "@/stores/useUpdateStore";
import { FilePdfOutlined } from "@ant-design/icons";
import ComponentPrinterSchedules from "./ComponentPrinterSchedules";

interface SchedulesTableProps {
  schedules: ScheduleOutputDTO[];
  onEdit: (schedule: ScheduleOutputDTO) => void;
  handleOpenModalScheduleConsume: (id?: string, isFinishing?: boolean) => void;
  isLoading?: boolean;
}

export const SchedulesTable: React.FC<SchedulesTableProps> = ({
  schedules,
  onEdit,
  handleOpenModalScheduleConsume,
  isLoading,
}) => {
  const columns: ColumnsType<ScheduleOutputDTO> = [
    {
      title: "Agendado para",
      key: "schedule_date",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: "bold" }}>{`${dayjs(
            record.start_date_time
          ).format("DD/MM/YY")} - ${dayjs(record.start_date_time).format(
            "HH:mm"
          )} às ${dayjs(record.end_date_time).format("HH:mm")}`}</span>
        </div>
      ),
    },

    {
      title: "Atendimento em:",
      key: "attended_at",
      render: (_, record) =>
        record.schedule_status === ScheduleStatus.SCHEDULED ||
        record.schedule_status === ScheduleStatus.CONFIRMED ||
        record.schedule_status === ScheduleStatus.AWAITING_SERVICE ? (
          <Countdown key={record.id} scheduledDate={record.start_date_time} />
        ) : (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "22%",
            }}
          ></span>
        ),
    },

    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      render: (client) => <span>{client.name}</span>,
    },

    {
      title: "Serviços",
      dataIndex: "services",
      key: "services",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "flex-start",
          }}
        >
          {record.services.map((service) => (
            <TagColor tag={service.name} color="#717D7E" key={service.id} />
          ))}
        </div>
      ),
    },

    {
      title: "Barbeiro",
      dataIndex: "employee",
      key: "employee",
      render: (employee) => <span>{employee.name}</span>,
    },

    {
      title: "Status",
      dataIndex: "schedule_status",
      key: "schedule_status",
      render: (schedule_status) => (
        <span>{renameStatusInTable(schedule_status as ScheduleStatus)}</span>
      ),
    },

    {
      title: "Ações",
      key: "action",

      render: ({ id, schedule_status }, record) => (
        <ActionsMenu
          onEdit={onEdit}
          record={record}
          schedule_status={schedule_status}
          id={id}
          handleOpenModalScheduleConsume={handleOpenModalScheduleConsume}
          print={() => setPrintSchedules(record)}
        />
      ),
    },
  ];

  const schedulesTableKey = useUpdateStore((state) => state.schedulesTableKey);
  const queryClient = useQueryClient();
  const [printSchedules, setPrintSchedules] = useState<ScheduleOutputDTO>();

  useEffect(() => {
    queryClient.invalidateQueries(["schedulings"]);
  }, [schedulesTableKey]);

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      scheduleService.changeStatus(params.id, params.schedule_status),

    onSuccess: (data) => {
      queryClient.invalidateQueries(["schedulings"]);
    },
  });

  const rowClassName = (record: ScheduleOutputDTO) => {
    return record.schedule_status === "canceled"
      ? "ant-table-row-canceled"
      : "";
  };

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <div style={{ overflow: "auto" }}>
          <TableWrapper
            pagination={false}
            columns={
              columns as Array<ColumnType<object> | ColumnGroupType<object>>
            }
            dataSource={schedules}
            rowKey="id"
            canceledRowColor={schedules.flatMap((schedule) =>
              schedule.schedule_status === "canceled" ? "#f8d7da" : "#fff"
            )}
          />
          {printSchedules !== undefined && (
            <ComponentPrinterSchedules
              data={printSchedules}
              clearData={() => setPrintSchedules(undefined)}
            />
          )}
        </div>
      )}
    </>
  );
};

const TableWrapper = styled(Table)`
  width: 100%;
  border-radius: 8px;
  min-width: 900px;
  min-height: 529px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));

  thead tr th::before {
    display: none;
  }

  .ant-table-row {
    background-color: ${({ canceledRowColor }) => canceledRowColor};
  }
`;

const ButtonDownloadPDF = styled(Button)`
  background-color: #771a2f;
  margin-bottom: 1rem;

  span {
    font-size: 1.2rem;
  }
`;
