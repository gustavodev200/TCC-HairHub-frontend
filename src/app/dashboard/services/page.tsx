"use client";

import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import styled from "styled-components";

interface DataType {
  key: string;
  name: string;
  price: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Serviços",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Preços",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    price: 32,
    address: "New York No. 1 Lake Park",
    tags: ["Inativo"],
  },
  {
    key: "2",
    name: "Jim Green",
    price: 42,
    address: "London No. 1 Lake Park",
    tags: ["Ativo"],
  },
  {
    key: "3",
    name: "Joe Black",
    price: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["Ativo"],
  },
];

const Page: React.FC = () => {
  return (
    <div>
      <HeaderMain>
        <h2>Serviços</h2>
      </HeaderMain>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Page;

const HeaderMain = styled.div`
  margin-bottom: 50px;
`;
