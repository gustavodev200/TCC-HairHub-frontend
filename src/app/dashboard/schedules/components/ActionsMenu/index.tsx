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
}

function ActionsMenu({ onEdit, record, schedule_status, id }: ActionsProps) {
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
        ],
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <MoreOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

const StatusButton = styled(Button)`
  background: ${(props: any) => props.backgroundcolor};
`;

export default ActionsMenu;
