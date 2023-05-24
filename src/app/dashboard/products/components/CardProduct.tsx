import { Card, Divider, Space } from "antd";
import { StatusButton } from "./StatusButton";
import { GenericStatus } from "@/@types/genericStatus";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Products } from "@/@types/products";
import { formatCurrency } from "@/helpers/utils/formatCurrency";

interface CardProductProps {
  product: Products;
}
export const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  return (
    <Card
      extra={
        <Space>
          <StatusButton
            changeStatus={false}
            id="1"
            status={GenericStatus.inactive}
          />

          <EditOutlined />
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
