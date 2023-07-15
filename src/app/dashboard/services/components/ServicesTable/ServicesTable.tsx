"use client";

import { IService } from "@/@types/service";
import { Table, Button, Tag, Space, Avatar } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi } from "@/services/service";
import { UserOutlined } from "@ant-design/icons";

interface ServicesTableProps {
  services: IService[];
  onEdit: (service: IService) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  onEdit,
}) => {
  const columns: ColumnsType<IService> = [
    {
      dataIndex: "image",
      key: "image",
      render: (image) =>
        image ? (
          <Avatar size="large" src={image} key={image} />
        ) : (
          <Avatar size={64} icon={<UserOutlined />} />
        ),
    },
    {
      title: "Serviços",
      dataIndex: "name",
      key: "name",
      render: (name) => <h4>{name}</h4>,
    },
    {
      title: "Preço (R$)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tempo (min)",
      dataIndex: "time",
      key: "time",
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
      serviceApi.changeStatus(params.id, params.status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["services"]);
    },
  });

  return (
    <div style={{ overflow: "auto" }}>
      <TableWrapper
        pagination={false}
        columns={columns as Array<ColumnType<object> | ColumnGroupType<object>>}
        dataSource={services}
        rowKey="id"
      />
    </div>
  );
};

const StatusButton = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;

const TableWrapper = styled(Table)`
  border-radius: 8px;
  min-width: 900px;
  min-height: 529px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));

  thead tr th::before {
    display: none;
  }
`;
