"use client";

import { CategoriesWithProducts } from "@/@types/categoriesWithProducts";
import { Products, ProductsInputDTO } from "@/@types/products";
import { productService } from "@/services/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal, InputNumber, Input, Select } from "antd";
import { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  productToEdit?: Products;
  open: boolean;
  onClose: () => void;
  categories: CategoriesWithProducts[];
}

export const ModalProduct: React.FC<ModalProps> = ({
  productToEdit,
  open,
  onClose,
  categories,
}) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { resetFields, setFieldsValue, validateFields } = form;

  const createProduct = useMutation({
    mutationFn: (data: ProductsInputDTO) => productService.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories", "products"]);
    },
  });

  const editProduct = useMutation({
    mutationFn: (data: ProductsInputDTO) => productService.editProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories", "products"]);
    },
  });

  const handleCancel = () => {
    if (createProduct.isLoading || editProduct.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        if (productToEdit) {
          editProduct
            .mutateAsync({
              ...productToEdit,
              ...data,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createProduct
            .mutateAsync(data)
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (productToEdit) {
      setFieldsValue({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price,
        amount: productToEdit.amount,
        category_id: productToEdit.category_id,
      });
    }
  }, [productToEdit, setFieldsValue]);

  return (
    <ModalWrapper
      centered
      title={`${productToEdit ? "EDITAR" : "ADICIONAR"} PRODUTOS`}
      open={open}
      onCancel={handleCancel}
      footer={[
        <ButtonModal
          onClick={handleCancel}
          key="cancel"
          type="primary"
          backgroundcolor="#F05761"
        >
          Cancelar
        </ButtonModal>,

        <ButtonModal
          key="save"
          type="primary"
          backgroundcolor="#6cb66f"
          loading={createProduct.isLoading || editProduct.isLoading}
          onClick={handleSubmit}
        >
          Salvar
        </ButtonModal>,
      ]}
    >
      <FormContainer>
        <Form
          layout="vertical"
          size="middle"
          disabled={createProduct.isLoading || editProduct.isLoading}
          form={form}
          initialValues={{
            name: "",
          }}
        >
          <Form.Item
            required
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Input size="large" placeholder="Nome do produto" />
          </Form.Item>

          <Form.Item
            required
            label="Preço"
            name="price"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              placeholder="Preço"
            />
          </Form.Item>

          <Form.Item
            required
            label="Selecione uma categoria"
            name="category_id"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              size="large"
              defaultValue="Selecione uma categoria"
              style={{ width: "100%" }}
              options={categories.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            required
            label="Descrição"
            name="description"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <TextArea rows={4} placeholder="Descrição do produto" />
          </Form.Item>

          <Form.Item
            required
            label="Quantidade/Estoque"
            name="amount"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              size="large"
              placeholder="Em estoque"
            />
          </Form.Item>
        </Form>
      </FormContainer>
    </ModalWrapper>
  );
};

const FormContainer = styled.div`
  margin: 25px 0;
`;

const ModalWrapper = styled(Modal)`
  margin-top: 15;
`;

const ButtonModal = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;
