"use client";

import { Table, Button, Space, Select } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import dayjs from "dayjs";
import { TagColor } from "@/components/Tag";
import { scheduleService } from "@/services/schedule";
import { renameStatusInTable } from "@/helpers/utils/ranameStatusInTable";
import { Progress } from "antd";
import ActionsMenu from "./ActionsMenu";
import { useEffect } from "react";

interface SchedulesTableProps {
  schedules: ScheduleOutputDTO[];
  onEdit: (schedule: ScheduleOutputDTO) => void;
  handleOpenModalScheduleConsume: (id?: string) => void;
}

export const SchedulesTable: React.FC<SchedulesTableProps> = ({
  schedules,
  onEdit,
  handleOpenModalScheduleConsume,
}) => {
  const columns: ColumnsType<ScheduleOutputDTO> = [
    {
      title: "Agendado para",
      key: "schedule_date",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {record.schedule_status === "scheduled" ? (
            <Progress
              type="circle"
              percent={12}
              format={(percent) => `${percent}H`}
              strokeColor={"#F05761"}
              size={40}
              strokeWidth={12}
            />
          ) : null}
          <span style={{ fontWeight: "bold" }}>{`${dayjs(
            record.start_date_time
          ).format("DD/MM/YY")} - ${dayjs(record.start_date_time).format(
            "HH:mm"
          )} às ${dayjs(record.end_date_time).format("HH:mm")}`}</span>
        </div>
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
        />
      ),
    },
  ];
  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      scheduleService.changeStatus(params.id, params.schedule_status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["schedulings"]);
    },
  });

  return (
    <div style={{ overflow: "auto" }}>
      <TableWrapper
        pagination={false}
        columns={columns as Array<ColumnType<object> | ColumnGroupType<object>>}
        dataSource={schedules}
        rowKey="id"
      />
    </div>
  );
};

const StatusButton = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;

const TableWrapper = styled(Table)`
  width: 100%;
  border-radius: 8px;
  min-width: 900px;
  min-height: 529px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));

  thead tr th::before {
    display: none;
  }
`;

const StatusSelect = styled(Select)`
  width: 120px;

  .ant-select-selection-item {
    color: #fff;
  }

  .ant-select-selector {
    background-color: ${(props) => {
      switch (props.customStatus) {
        case ScheduleStatus.SCHEDULED:
          return "#FF9029";
        case ScheduleStatus.CONFIRMED:
          return "#53A5FF";
        case ScheduleStatus.AWAITING_SERVICE:
          return "#f1c40f";
        case ScheduleStatus.FINISHED:
          return "#6CB66F";
        case ScheduleStatus.CANCELED:
          return "#F05761";
        default:
          return "#000000";
      }
    }}!important;
  }
`;
