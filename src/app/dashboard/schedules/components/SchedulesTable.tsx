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

interface SchedulesTableProps {
  schedules: ScheduleOutputDTO[];
  onEdit: (category: ScheduleOutputDTO) => void;
}

export const SchedulesTable: React.FC<SchedulesTableProps> = ({
  schedules,
  onEdit,
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
        <>
          <div style={{ display: "flex", gap: 8 }}>
            <Space size="middle">
              <StatusButton
                backgroundcolor="#C1820B"
                type="primary"
                onClick={() => onEdit(record)}
              >
                Editar
              </StatusButton>
            </Space>

            <StatusButton
              backgroundcolor={
                schedule_status === "scheduled"
                  ? "#3498DB"
                  : schedule_status === "confirmed"
                  ? "#E67E22"
                  : schedule_status === "awaiting_service"
                  ? "#AAB7B8"
                  : schedule_status === "attend"
                  ? "#52BE80"
                  : null
              }
              type="primary"
              onClick={() =>
                changeStatus.mutate({
                  id,
                  schedule_status:
                    schedule_status === "scheduled"
                      ? "confirmed"
                      : schedule_status === "confirmed"
                      ? "awaiting_service"
                      : schedule_status === "awaiting_service"
                      ? "attend"
                      : schedule_status === "attend"
                      ? "finished"
                      : schedule_status === "finished"
                      ? null
                      : null,
                })
              }
            >
              {schedule_status === "scheduled"
                ? "Confirmar"
                : schedule_status === "confirmed"
                ? "Aguard. Atendimento"
                : schedule_status === "awaiting_service"
                ? "Atender"
                : schedule_status === "attend"
                ? "Finalizar"
                : null}
            </StatusButton>

            <StatusButton
              backgroundcolor="#F05761"
              type="primary"
              onClick={() =>
                changeStatus.mutate({
                  id,
                  schedule_status: schedule_status === "canceled",
                })
              }
            >
              Cancelar
            </StatusButton>
          </div>
        </>
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
