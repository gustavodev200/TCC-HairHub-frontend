"use client";

import { CardProduct, ModalProduct } from "./components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Products } from "@/@types/products";
import { PageHeaderProducts } from "./components";
import { categoryService } from "@/services/category";
import styled from "styled-components";
import { Col, Row } from "antd";

export default function Page() {
  const { isLoading, error, data } = useQuery(
    ["categories", "products"],
    categoryService.listProductsWithCategories
  );

  const [productToEdit, setProductToEdit] = useState<Products>();
  const [showModalProduct, setShowModalProduct] = useState(false);

  const handleOpenModalProduct = (product?: Products) => {
    if (product) {
      setProductToEdit(product);
    }

    setShowModalProduct(true);
  };

  const handleCloseModalProduct = () => {
    setShowModalProduct(false);

    if (productToEdit) {
      setProductToEdit(undefined);
    }
  };
  return (
    <>
      <PageHeaderProducts
        pageTitle="Produtos"
        statusFilter={"all"}
        handleOpenModal={handleOpenModalProduct}
      />

      <ModalProduct
        categories={
          data?.map((category) => ({
            id: category.id,
            name: category.name,
            status: category.status,
            products: category.products,
          })) ?? []
        }
        open={showModalProduct}
        productToEdit={productToEdit}
        onClose={handleCloseModalProduct}
      />
      {data?.map((category) => (
        <CardWrapper key={category.id}>
          <h2 style={{ marginBottom: "16px" }}>{category.name}</h2>
          <ProductsGrid>
            {category.products.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </ProductsGrid>
        </CardWrapper>
      ))}
    </>
  );
}

const CardWrapper = styled.div`
  padding: 16px;
`;

const ProductsGrid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
