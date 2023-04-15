"use client";
import { useState } from "react";
import { IService } from "@/@types/service";
import { Table, Button, Tag, Modal, Space, Avatar } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi } from "@/services/service";

interface ServicesTableProps {
  services: IService[];
}

export const ServicesTable: React.FC<ServicesTableProps> = ({ services }) => {
  const columns: ColumnsType<IService> = [
    {
      dataIndex: "image",
      key: "image",
      render: (image) => <Avatar size="large" src={image} key={image} />,
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
      render: (_, { id, status }) => (
        <Space size="middle">
          <StatusButton backgroundColor="#C1820B" type="primary">
            Editar
          </StatusButton>
          <StatusButton
            backgroundColor={status === "active" ? "#F05761" : "#6CB66F"}
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
  const { confirm } = Modal;

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      serviceApi.changeStatus(params.id, params.status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["services"]);
    },
  });

  return (
    <TableImage
      columns={columns as Array<ColumnType<object> | ColumnGroupType<object>>}
      dataSource={services}
    />
  );
};

const StatusButton = styled(Button)`
  background: ${(props) => props.backgroundColor};
`;

const TableImage = styled(Table)`
  tbody > tr > td {
    width: 2rem;
  }
`;
