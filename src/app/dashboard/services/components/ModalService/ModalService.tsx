"use client";

import { IService } from "@/@types/service";
import {
  UploadOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Upload, Input } from "antd";
import styled from "styled-components";

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

  const { resetFields, setFieldsValue, validateFields, getFieldsValue } = form;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCancel = () => {
    // if (createDiscipline.isLoading || editDiscipline.isLoading) {
    //   return;
    // }

    // resetFields();
    onClose();
  };

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

        <ButtonModal key="save" type="primary" backgroundcolor="#6cb66f">
          Salvar
        </ButtonModal>,
      ]}
    >
      <FormContainer>
        <Form
          layout="vertical"
          size="middle"
          // disabled={createDiscipline.isLoading || editDiscipline.isLoading}
          form={form}
          initialValues={{
            name: "",
            price: 0,
            time: 0,
          }}
        >
          <Form.Item
            required
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" listType="picture">
              <Button icon={<UploadOutlined />}>Selecione uma imagem</Button>
            </Upload>

            <Form.Item
              required
              label="Nome"
              name="name"
              rules={[
                { required: true, message: "" },
                { type: "string", min: 3, message: "" },
                { type: "string", max: 120, message: "" },
              ]}
            >
              <InputWrapper
                size="large"
                prefix={<ScissorOutlined />}
                placeholder="Serviço"
              />
            </Form.Item>
            <InputWrapper
              size="large"
              prefix={<DollarCircleOutlined className="site-form-item-icon" />}
              placeholder="Preço"
            />
            <InputWrapper
              size="large"
              prefix={<FieldTimeOutlined className="site-form-item-icon" />}
              placeholder="Tempo"
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

const InputWrapper = styled(Input)`
  margin-top: 15px;
`;

const ModalWrapper = styled(Modal)`
  margin-top: 15;
`;

const ButtonModal = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;
