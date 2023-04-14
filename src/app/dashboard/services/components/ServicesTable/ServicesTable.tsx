"use client";

import { IService } from "@/@types/service";
import { Table, Button, Tag, Modal, Tooltip, Space, Avatar } from "antd";
import styled from "styled-components";
import { ColumnsType } from "antd/es/table";

interface ServicesTableProps {
  services: IService[];
}

const columns: ColumnsType<ServicesTableProps> = [
  {
    // title: "Serviços",
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
    render: () => (
      <Space size="middle">
        <StatusButton backgroundColor="#C1820B" type="primary">
          Editar
        </StatusButton>
        <StatusButton backgroundColor="#F05761" type="primary">
          Inativar
        </StatusButton>
      </Space>
    ),
  },
];

export const ServicesTable: React.FC<ServicesTableProps> = ({ services }) => (
  <TableImage columns={columns} dataSource={services} />
);

const StatusButton = styled(Button)`
  background: ${(props) => props.backgroundColor};
`;

const TableImage = styled(Table)`
  tbody > tr > td {
    width: 2rem;
  }
`;
