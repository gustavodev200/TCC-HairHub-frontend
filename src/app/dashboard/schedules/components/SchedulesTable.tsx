"use client";

import { Table, Button, Tag, Space, Select } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/category";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import { useState } from "react";
import dayjs from "dayjs";

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
        <span>{`${dayjs(record.start_date_time).format("DD/MM/YY")} - ${dayjs(
          record.start_date_time
        ).format("HH:mm")} às ${dayjs(record.end_date_time).format(
          "HH:mm"
        )}`}</span>
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
        <span>{record.services.map((service) => service.length)}</span>
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
      render: (schedule_status) => {
        return (
          schedule_status && (
            <StatusSelect
              defaultValue={schedule_status}
              customStatus={schedule_status}
              options={[
                { value: schedule_status, label: "Agendado" },
                { value: ScheduleStatus.CONFIRMED, label: "Confirmado" },
                {
                  value: ScheduleStatus.AWAITING_SERVICE,
                  label: "Aguardando Atendimento",
                },
                { value: ScheduleStatus.FINISHED, label: "Finalizado" },
                { value: ScheduleStatus.CANCELED, label: "Cancelado" },
              ]}
            />
          )
        );
      },
      // render: (status) => {
      //   return status === "active" ? (
      //     <Tag color="#059101" key={status}>
      //       ATIVO
      //     </Tag>
      //   ) : (
      //     <Tag color="#bd0000" key={status}>
      //       INATIVO
      //     </Tag>
      //   );
      // },
    },

    {
      title: "Ações",
      key: "action",

      render: ({ id, status }, record) => (
        <Space size="middle">
          <StatusButton
            backgroundcolor="#C1820B"
            type="primary"
            onClick={() => onEdit(record)}
          >
            Editar
          </StatusButton>
          {/* <StatusButton
            backgroundcolor={status === "active" ? "#F05761" : "#6CB66F"}
            type="primary"
            onClick={() =>
              changeStatus.mutate({
                id,
                status: status === "active" ? "inactive" : "active",
              })
            }
          >
            {status === "active" ? "Inativar" : "Ativar"}
          </StatusButton> */}
        </Space>
      ),
    },
  ];

  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      categoryService.changeStatus(params.id, params.status),
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
