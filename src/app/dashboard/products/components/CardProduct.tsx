import { Card, Divider, Space } from "antd";
import { StatusButton } from "./StatusButton";
import { GenericStatus } from "@/@types/genericStatus";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Products } from "@/@types/products";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product";

interface CardProductProps {
  product: Products;
  onEdit: (product: Products) => void;
}
export const CardProduct: React.FC<CardProductProps> = ({
  product,
  onEdit,
}) => {
  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      productService.changeStatus(params.id, params.status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories", "products"]);
    },
  });

  return (
    <Card
      extra={
        <Space>
          <StatusButton
            isLoading={changeStatus.isLoading}
            changeStatus={() =>
              changeStatus.mutate({
                id: product.id,
                status: product.status === "active" ? "inactive" : "active",
              })
            }
            currentStatus={product.status as GenericStatus}
            bgColor={product.status === "active" ? "#F05761" : "#6CB66F"}
          />
          <ButtonEdit onClick={() => onEdit(product)}>
            <EditOutlined />
          </ButtonEdit>
        </Space>
      }
      style={{ width: 350 }}
    >
      <div>
        <h2>{product.name}</h2>
      </div>
      <div>
        <DescriptLimitedRow>{product.description}</DescriptLimitedRow>
      </div>
      <Divider orientation="left"></Divider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span>
            <strong>Em estoque:</strong> {product.amount}
          </span>
        </div>
        <div>
          <span>
            <strong>Preço:</strong> {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </Card>
  );
};

const DescriptLimitedRow = styled.p`
  margin-top: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const ButtonEdit = styled.button`
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #e0e0e0;
  }
`;
