"use client";

import { IService, IServiceInputDTO } from "@/@types/service";
import { serviceApi } from "@/services/service";
import { FieldTimeOutlined, ScissorOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Modal,
  Upload,
  Input,
  InputNumber,
  UploadFile,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { UploadButton } from "./components/UploadButton";

interface ModalProps {
  serviceToEdit?: IService;
  open: boolean;
  onClose: () => void;
}

export const ModalService: React.FC<ModalProps> = ({
  serviceToEdit,
  open,
  onClose,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { resetFields, setFieldsValue, validateFields } = form;

  const createService = useMutation({
    mutationFn: (data: IServiceInputDTO) => serviceApi.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });

  const editService = useMutation({
    mutationFn: (data: FormData) => serviceApi.editService(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });

  const handleCancel = () => {
    if (createService.isLoading || editService.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("time", data.time);

        if (data.image.file) {
          formData.append("image", data.image.file?.originFileObj);
        }

        if (serviceToEdit) {
          formData.append("id", serviceToEdit.id ?? "");
          editService
            .mutateAsync(formData)
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createService

            .mutateAsync(formData as unknown as IServiceInputDTO)
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (serviceToEdit) {
      setFieldsValue({
        name: serviceToEdit.name,
        image: serviceToEdit.image,
        price: serviceToEdit.price,
        time: serviceToEdit.time,
      });
    }
  }, [serviceToEdit, setFieldsValue]);

  return (
    <ModalWrapper
      centered
      title={`${serviceToEdit ? "EDITAR" : "ADICIONAR"} SERVIÇO`}
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
          loading={createService.isLoading || editService.isLoading}
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
          disabled={createService.isLoading || editService.isLoading}
          form={form}
          initialValues={{
            name: "",
            price: 0,
            time: 0,
          }}
        >
          <Form.Item required label="Image" name="image" valuePropName="image">
            <Upload
              name="image"
              listType="picture-card"
              maxCount={1}
              className="avatar-uploader"
            >
              {serviceToEdit?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={serviceToEdit?.image}
                  alt="avatar"
                  width={75}
                  height={85}
                />
              ) : (
                <UploadButton isLoading={createService.isLoading} />
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            required
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Input
              size="large"
              prefix={<ScissorOutlined />}
              placeholder="Serviço"
            />
          </Form.Item>

          <Form.Item
            required
            label="Preço"
            name="price"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <InputNumber
              size="large"
              min={1}
              max={999}
              precision={2}
              step={0.1}
              addonBefore="R$"
              placeholder="Preço"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item required label="Tempo" name="time">
            <InputNumber
              size="large"
              min={1}
              max={999}
              addonAfter="Min"
              prefix={<FieldTimeOutlined className="site-form-item-icon" />}
              placeholder="Tempo"
              style={{ width: "100%" }}
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
