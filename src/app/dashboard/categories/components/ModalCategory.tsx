"use client";

import { CategoryInputDTO, CategoryOutputDTO } from "@/@types/category";
import { categoryService } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal, Upload, Input, InputNumber } from "antd";
import { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  categoryToEdit?: CategoryOutputDTO;
  open: boolean;
  onClose: () => void;
}

export const ModalCategory: React.FC<ModalProps> = ({
  categoryToEdit,
  open,
  onClose,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { resetFields, setFieldsValue, validateFields } = form;

  const createCategory = useMutation({
    mutationFn: (data: CategoryInputDTO) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const editCategory = useMutation({
    mutationFn: (data: CategoryOutputDTO) => categoryService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const handleCancel = () => {
    if (createCategory.isLoading || editCategory.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        if (categoryToEdit) {
          editCategory
            .mutateAsync({
              ...categoryToEdit,
              ...data,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createCategory
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
    if (categoryToEdit) {
      setFieldsValue({
        name: categoryToEdit.name,
      });
    }
  }, [categoryToEdit, setFieldsValue]);

  return (
    <ModalWrapper
      centered
      title={`${categoryToEdit ? "EDITAR" : "ADICIONAR"} CATEGORIA`}
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
          loading={createCategory.isLoading || editCategory.isLoading}
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
          disabled={createCategory.isLoading || editCategory.isLoading}
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
            <Input size="large" placeholder="Categoria" />
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
