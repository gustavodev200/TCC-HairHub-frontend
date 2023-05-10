"use client";

import { Table, Button, Tag, Space, Avatar } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { EmployeeInputDTO } from "@/@types/employee";
import { employeeService } from "@/services/employee";
import { formatCpf } from "@/helpers/utils/formatCpf";
import { formatPhoneNumber } from "@/helpers/utils/formatPhoneNumber";

interface EmployeeTableProps {
  employees: EmployeeInputDTO[];
  onEdit: (employee: EmployeeInputDTO) => void;
  handleOpenModalEmployee: (id: string) => void;
  resetPassword: (id: string) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  handleOpenModalEmployee,
  resetPassword,
}) => {
  const columns: ColumnsType<EmployeeInputDTO> = [
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
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
      render: (cpf) => <span>{formatCpf(cpf)}</span>,
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span>{formatPhoneNumber(phone)}</span>,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Enviar senha",
      key: "password",
      render: ({ id, password }, result) => (
        <Space size="middle">
          <StatusButton
            backgroundcolor="#53A5FF"
            type="primary"
            onClick={() => resetPassword(id)}
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
          <Tag color="green" key={status}>
            ATIVO
          </Tag>
        ) : (
          <Tag color="red" key={status}>
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
          <StatusButton
            backgroundcolor="#53A5FF"
            type="primary"
            onClick={() => handleOpenModalEmployee(id)}
          >
            <InfoCircleOutlined />
          </StatusButton>
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
