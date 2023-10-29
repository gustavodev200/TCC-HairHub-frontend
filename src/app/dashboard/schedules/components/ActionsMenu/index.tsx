import React from "react";
import { Button, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import { scheduleService } from "@/services/schedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface StatusProps {
  backgroundcolor: string;
  label: string;
}

const nextStatusProps: Record<string, StatusProps> = {
  scheduled: {
    backgroundcolor: "#3498DB",
    label: "Confirmar",
  },
  confirmed: {
    backgroundcolor: "#E67E22",
    label: "Aguard. atendimento",
  },

  awaiting_service: {
    backgroundcolor: "#AAB7B8",
    label: "Atender",
  },
  attend: {
    backgroundcolor: "#52BE80",
    label: "Finalizar",
  },
};

interface ActionsProps {
  onEdit: (category: ScheduleOutputDTO) => void;
  record: ScheduleOutputDTO;
  schedule_status: ScheduleStatus;
  id: string;
  handleOpenModalScheduleConsume: (id: string, isFinishing?: boolean) => void;
}

function ActionsMenu({
  onEdit,
  record,
  schedule_status,
  id,
  handleOpenModalScheduleConsume,
}: ActionsProps) {
  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      scheduleService.changeStatus(params.id, params.schedule_status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["schedulings"]);
    },
  });
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "1",
            label: (
              <StatusButton
                backgroundcolor="#C1820B"
                type="primary"
                onClick={() => onEdit(record)}
              >
                Editar
              </StatusButton>
            ),
          },
          {
            key: "2",
            label: (
              <StatusButton
                backgroundcolor={
                  nextStatusProps[schedule_status as ScheduleStatus]
                    .backgroundcolor
                }
                type="primary"
                onClick={
                  schedule_status === "attend"
                    ? () => handleOpenModalScheduleConsume(id, true)
                    : () =>
                        changeStatus.mutate({
                          id,
                          schedule_status:
                            schedule_status === "scheduled"
                              ? "confirmed"
                              : schedule_status === "confirmed"
                              ? "awaiting_service"
                              : schedule_status === "awaiting_service"
                              ? "attend"
                              : null,
                        })
                }
              >
                {nextStatusProps[schedule_status as ScheduleStatus].label}
              </StatusButton>
            ),
          },
          {
            key: "3",
            label: (
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
            ),
          },
          {
            key: "4",
            label:
              schedule_status === "awaiting_service" ||
              schedule_status === "attend" ? (
                <StatusButton
                  backgroundcolor="#250444"
                  type="primary"
                  onClick={() => handleOpenModalScheduleConsume(id)}
                >
                  Consumir
                </StatusButton>
              ) : null,
          },
        ],
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MoreOutlined style={{ fontSize: "18px" }} />
        </Space>
      </a>
    </Dropdown>
  );
}

const StatusButton = styled(Button)`
  background: ${(props: any) => props.backgroundcolor};
  width: 100%;
`;

export default ActionsMenu;
