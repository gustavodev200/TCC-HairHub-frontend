"use client";

import { ErrorMessages } from "@/@types/messages";
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
  UploadProps,
} from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UploadButton } from "./components/UploadButton";
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";

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

  const { resetFields, setFieldsValue, validateFields, getFieldsValue } = form;

  const createService = useMutation({
    mutationFn: (data: IServiceInputDTO) => serviceApi.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });

  const editService = useMutation({
    mutationFn: (data: IService) => serviceApi.editService(data),
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
        console.log(data);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", data.image.file?.originFileObj);
        formData.append("price", data.price);
        formData.append("time", data.time);

        if (serviceToEdit) {
          editService
            .mutateAsync({ ...serviceToEdit, ...formData })
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
      .catch(() => {
        toast.error(`Ops, ${ErrorMessages.MSGE01}`);
      });
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      createService.isLoading || editService.isLoading;
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, () => {
        createService.isLoading || editService.isLoading;
        serviceToEdit?.image;
      });
    }
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
  }, [serviceToEdit]);

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
              showUploadList={false}
              className="avatar-uploader"
              onChange={handleChange}
            >
              {serviceToEdit?.image ? (
                <img
                  src={serviceToEdit?.image}
                  alt="avatar"
                  style={{ borderRadius: "10px" }}
                  width={85}
                  height={85}
                />
              ) : (
                <UploadButton
                  isLoading={createService.isLoading || editService.isLoading}
                />
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
              addonBefore="R$"
              placeholder="Preço"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            required
            label="Tempo"
            name="time"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
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