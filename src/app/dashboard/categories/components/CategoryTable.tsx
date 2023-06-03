"use client";

import { Table, Button, Tag, Space, Avatar } from "antd";
import styled from "styled-components";
import { ColumnGroupType, ColumnType, ColumnsType } from "antd/es/table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceApi } from "@/services/service";
import { CategoryOutputDTO } from "@/@types/category";
import { categoryService } from "@/services/category";

interface CategoryTableProps {
  categories: CategoryOutputDTO[];
  onEdit: (category: CategoryOutputDTO) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
}) => {
  const columns: ColumnsType<CategoryOutputDTO> = [
    {
      title: "Categorias",
      dataIndex: "name",
      key: "name",
      render: (name) => <h4>{name}</h4>,
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
      categoryService.changeStatus(params.id, params.status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  return (
    <TableWrapper
      pagination={false}
      columns={columns as Array<ColumnType<object> | ColumnGroupType<object>>}
      dataSource={categories}
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

  .ant-table-cell {
    width: 90%;
  }
`;
