"use client";

import { CategoryInputDTO, CategoryOutputDTO } from "@/@types/category";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { categoryService } from "@/services/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Modal,
  Select,
  InputNumber,
  TimePicker,
  Space,
  SelectProps,
} from "antd";
import { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  scheduleToEdit?: ScheduleOutputDTO;
  open: boolean;
  onClose: () => void;
}

export const ModalSchedule: React.FC<ModalProps> = ({
  scheduleToEdit,
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
        if (scheduleToEdit) {
          editCategory
            .mutateAsync({
              ...scheduleToEdit,
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

  // useEffect(() => {
  //   if (scheduleToEdit) {
  //     setFieldsValue({
  //       name: scheduleToEdit.name,
  //     });
  //   }
  // }, [scheduleToEdit, setFieldsValue]);

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 10; i++) {
    options.push({
      value: i.toString(10) + i,
      label: i.toString(10) + i,
    });
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <ModalWrapper
      centered
      title={`${scheduleToEdit ? "EDITAR" : "ADICIONAR"} AGENDAMENTO`}
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
          <InfoContent>
            <h4>Barbeiro:</h4>
            <span>José do Corte</span>
          </InfoContent>

          <InfoContent>
            <h4>Data/Agendamento:</h4>
            <span>10/10/2022</span>
          </InfoContent>

          <Form.Item
            required
            label="Cliente"
            name="client_id"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              defaultValue="Gustavo Lage"
              // onChange={handleChange}
              options={[
                { value: "gustavo", label: "Gustavo Lage" },
                { value: "roberto", label: "Roberto Silva" },
                { value: "caio", label: "Caio Souza" },
              ]}
            />
          </Form.Item>

          <Form.Item
            required
            label="Serviços"
            name="services"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Selecione serviços"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>

          <Form.Item required label="Tempo estimado do serviço" name="time">
            <InputNumber
              min={1}
              max={999}
              addonAfter="Min"
              placeholder="Tempo"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Space.Compact block>
            <Form.Item
              label="Horário/Início"
              required
              style={{ display: "inline-block", width: "50%" }}
              name="start_time"
              rules={[{ required: true, message: "" }]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder="Início"
              />
            </Form.Item>

            <Form.Item
              label="Horário/Fim"
              required
              name="end_time"
              style={{ display: "inline-block", width: "50%" }}
              rules={[{ required: true, message: "" }]}
            >
              <TimePicker
                disabled
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder="Término"
              />
            </Form.Item>
          </Space.Compact>
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

const InfoContent = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;

  h4 {
    margin-right: 10px;
  }
`;
