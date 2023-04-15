import {
  UploadOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import { Button, Form, Modal, Upload, Input } from "antd";
import styled from "styled-components";

interface ModalProps {
  title: string;
  open: boolean;
  handleCancel: () => void;
}

export const ModalService: React.FC<ModalProps> = ({
  title,
  open,
  handleCancel,
}) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <ModalWrapper
      centered
      title={title}
      open={open}
      onCancel={handleCancel}
      footer={[
        <ButtonModal
          onClick={handleCancel}
          key="cancel"
          type="primary"
          backgroundColor="#F05761"
        >
          Cancelar
        </ButtonModal>,

        <ButtonModal key="save" type="primary" backgroundColor="#6cb66f">
          Salvar
        </ButtonModal>,
      ]}
    >
      <FormContainer>
        <Form.Item
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" listType="picture">
            <Button icon={<UploadOutlined />}>Selecione uma imagem</Button>
          </Upload>

          <InputWrapper
            size="large"
            prefix={<ScissorOutlined />}
            placeholder="Serviço"
          />
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
  background: ${(props) => props.backgroundColor};
`;
