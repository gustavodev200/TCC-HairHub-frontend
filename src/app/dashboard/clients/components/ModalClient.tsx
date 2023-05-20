"use client";

import { ErrorMessages } from "@/@types/messages";

import {
  EnvironmentFilled,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal, Steps } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ClientPersonalInfoStep } from "./ClientPersonalInfoStep";
import { Client } from "@/@types/client";
import { clientService } from "@/services/client";
import { ClientRolesStep } from "./ClientRolesStep";
import { ClientAddressStep } from "./ClientAddressStep";

interface ClientDialogFormProps {
  open: boolean;
  clientToEdit?: Client;
  onClose: () => void;
}

export const ClientDialogForm: React.FC<ClientDialogFormProps> = ({
  open,
  clientToEdit,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const [step, setStep] = useState(0);
  const [isFirstStepValid, setIsFirstStepValid] = useState(false);
  const [isSecondStepValid, setIsSecondStepValid] = useState(false);

  const [form] = Form.useForm<Client>();

  const { resetFields, setFieldsValue, validateFields, getFieldsValue } = form;

  const createClient = useMutation({
    mutationFn: (data: Client) => clientService.create(data),
    onSuccess: (newItem) => {
      queryClient.setQueriesData(
        {
          predicate: ({ queryKey }) =>
            queryKey[0] === "clients" &&
            (queryKey[1] as number) === 1 &&
            (queryKey[2] === "all" || queryKey[2] === "active") &&
            queryKey[3] === "",
        },
        (data: any) => {
          const newArrayOfData = [newItem, ...data.data];

          if (data.data.length === 10) newArrayOfData.pop();

          return { ...data, data: newArrayOfData };
        }
      );

      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === "clients" &&
          ((queryKey[1] as number) > 1 ||
            queryKey[2] === "inactive" ||
            queryKey[3] !== ""),
      });
    },
  });

  const editClient = useMutation({
    mutationFn: (data: Client) => clientService.update(data),
    onSuccess: (updatedData) => {
      queryClient.setQueriesData(
        {
          predicate: ({ queryKey }) =>
            queryKey[0] === "clients" && queryKey[3] === "",
        },
        (data: any) => {
          const itemIndex: number = data.data.findIndex(
            (item: Client) => item.id === updatedData.id
          );

          if (itemIndex === -1) {
            return data;
          }

          const newArrayOfData = [...data.data];

          newArrayOfData[itemIndex] = updatedData;

          return { ...data, data: newArrayOfData };
        }
      );

      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === "clients" && queryKey[3] !== "",
      });
    },
  });

  const handleCancel = () => {
    resetFields();
    setIsFirstStepValid(false);
    setIsSecondStepValid(false);
    setStep(0);
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then(() => {
        const dataToSend = getFieldsValue([
          "id",
          "name",
          "cpf",
          "dataNasc",
          "email",
          "phone",
          "address",
          "role",
        ]);

        dataToSend.cpf = dataToSend.cpf.replace(/\D/g, "");
        dataToSend.phone = dataToSend.phone.replace(/\D/g, "");
        dataToSend.address.cep = dataToSend.address.cep.replace(/\D/g, "");

        if (clientToEdit) {
          editClient
            .mutateAsync({
              ...clientToEdit,
              ...dataToSend,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createClient
            .mutateAsync(dataToSend)
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {
        toast.error(ErrorMessages.MSGE01);
      });
  };

  useEffect(() => {
    if (clientToEdit) {
      setIsFirstStepValid(true);
      setIsSecondStepValid(true);

      setFieldsValue({
        id: clientToEdit.id,
        name: clientToEdit.name,
        cpf: clientToEdit.cpf,
        dataNasc: dayjs(clientToEdit.dataNasc) as any,
        email: clientToEdit.email,
        phone: clientToEdit.phone,
        address: clientToEdit.address,
        role: clientToEdit.role,
      });
    }
  }, [clientToEdit]);

  return (
    <StyledModal
      centered
      open={open}
      onCancel={handleCancel}
      title={`${clientToEdit ? "Editar" : "Adicionar"} Client`}
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
          key="submit"
          type="primary"
          backgroundcolor="#6cb66f"
          loading={createClient.isLoading}
          disabled={
            (!isFirstStepValid && step === 0) ||
            (!isSecondStepValid && step === 1)
          }
          onClick={() => {
            if (step < 2) {
              setStep(step + 1);

              return;
            }

            handleSubmit();
          }}
        >
          {step < 2 ? "Próximo" : "Salvar"}
        </ButtonModal>,
      ]}
    >
      <Steps
        size="small"
        current={step}
        onChange={(vale) => setStep(vale)}
        style={{ margin: "24px 0 16px" }}
        items={[
          {
            title: "Dados pessoais",
            disabled: createClient.isLoading,
            icon: <UserOutlined />,
          },
          {
            title: "Endereço",
            disabled: !isFirstStepValid || createClient.isLoading,
            icon: <EnvironmentFilled />,
          },
          {
            title: "Atribuições",
            disabled:
              !isFirstStepValid || !isSecondStepValid || createClient.isLoading,
            icon: <IdcardOutlined />,
          },
        ]}
      />

      {step === 0 && (
        <ClientPersonalInfoStep
          form={form}
          onStepValidate={(isValid) => setIsFirstStepValid(isValid)}
        />
      )}

      {step === 1 && (
        <ClientAddressStep
          clientForm={form}
          onStepValidate={(isValid) => setIsSecondStepValid(isValid)}
        />
      )}

      {step === 2 && (
        <ClientRolesStep form={form} disabled={createClient.isLoading} />
      )}
    </StyledModal>
  );
};

const ButtonModal = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;

const StyledModal = styled(Modal)`
  @media (max-width: 600px) {
    max-width: unset;
    width: 100% !important;
    height: 100%;

    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: 0;
      padding: 0;

      & > button {
        top: 24px;
      }

      .ant-modal-title {
        padding: 24px 16px 0;
      }

      .ant-modal-body {
        height: 100%;
        padding: 8px 16px;
        overflow-y: auto;
      }

      .ant-modal-footer {
        padding: 8px 16px 16px;
        margin-top: 0;
      }
    }
  }
`;
