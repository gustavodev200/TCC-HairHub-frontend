import React from "react";
import { Button, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import { scheduleService } from "@/services/schedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ActionsProps {
  onEdit: (category: ScheduleOutputDTO) => void;
  record: ScheduleOutputDTO;
  schedule_status: ScheduleStatus;
  id: string;
  handleOpenModalScheduleConsume: (id: string) => void;
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
                onClick={
                  schedule_status === "attend"
                    ? () => handleOpenModalScheduleConsume(id)
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
              schedule_status === "awaiting_service" ? (
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
