"use client";

import { Table, Button, Tag, Space, Avatar, Tooltip } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Employee } from "@/@types/employee";
import { employeeService } from "@/services/employee";
import { AssignmentType } from "@/@types/role";
import { TagColor } from "@/components/Tag";
import { useProgressIndicator } from "@/stores/useProgressIndicator";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  handleOpenModalInfoEmployee: (id: string) => void;
  resetPassword: (id: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  handleOpenModalInfoEmployee,
  resetPassword,
}) => {
  const { addProgressIndicatorItem, removeProgressIndicatorItem } =
    useProgressIndicator();

  const columns: ColumnsType<Employee> = [
    {
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Avatar size="large" src={image} key={image} />
        ) : (
          <Avatar size={32} icon={<UserOutlined />} />
        ),
    },
    {
      title: "Colaboradores",
      dataIndex: "name",
      key: "name",
      render: (name) => <h4>{name}</h4>,
    },
    {
      title: "Atribuição",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        if (role === AssignmentType.EMPLOYEE) {
          return <TagColor tag="Barbeiro" color="green" />;
        } else if (role === AssignmentType.ADMIN) {
          return <TagColor tag="Gerente/Proprietário" color="blue" />;
        } else {
          return <TagColor tag="Atendente" color="red" />;
        }
      },
    },

    {
      title: "Enviar senha",
      key: "password",
      render: ({ id, password }, result) => (
        <Space size="middle">
          <StatusButton
            backgroundcolor="#53A5FF"
            type="primary"
            onClick={() => handleResetPassword(id)}
          >
            Reenviar senha
          </StatusButton>
        </Space>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status === "active" ? (
          <Tag color="#059101" key={status}>
            ATIVO
          </Tag>
        ) : (
          <Tag color="#bd0000" key={status}>
            INATIVO
          </Tag>
        );
      },
    },

    {
      title: "Ações",
      key: "action",
      render: ({ id, status }, record) => (
        <Space size="middle">
          <Tooltip title="Ver datalhes">
            <StatusButton
              backgroundcolor="#53A5FF"
              type="primary"
              onClick={() => handleOpenModalInfoEmployee(id)}
            >
              <InfoCircleOutlined />
            </StatusButton>
          </Tooltip>
          <StatusButton
            backgroundcolor="#C1820B"
            type="primary"
            onClick={() => onEdit(record)}
          >
            Editar
          </StatusButton>
          <StatusButton
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
          </StatusButton>
        </Space>
      ),
    },
  ];

  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      employeeService.changeStatus(params.id, params.status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["employees"]);
    },
  });

  const handleResetPassword = (id: string) => {
    addProgressIndicatorItem({
      id: "reset-password",
      message: "Reenviando e-mail...",
    });

    employeeService.resetPassword(id).finally(() => {
      removeProgressIndicatorItem("reset-password");
    });
  };

  return (
    <TableWrapper
      pagination={false}
      columns={columns as Array<ColumnType<object> | ColumnGroupType<object>>}
      dataSource={employees}
      rowKey="id"
    />
  );
};

const StatusButton = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;

const TableWrapper = styled(Table)`
  border-radius: 8px;
  overflow: auto;
  min-width: 750px;
  min-height: 529px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));

  thead tr th::before {
    display: none;
  }
`;
