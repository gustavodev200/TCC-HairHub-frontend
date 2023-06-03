"use client";

import { Employee } from "@/@types/employee";
import { ErrorMessages } from "@/@types/messages";
import { employeeService } from "@/services/employee";
import {
  EnvironmentFilled,
  IdcardOutlined,
  UserOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal, Steps } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { EmployeeAddressStep } from "./EmployeeAddressStep";
import { EmployeePersonalInfoStep } from "./EmployeePersonaInfoStep";
import { EmployeeRolesStep } from "./EmployeeRolesStep";
import { EmployeeShiftsStep } from "./EmployeeShiftsStep";

interface EmployeeDialogFormProps {
  open: boolean;
  employeeToEdit?: Employee;
  onClose: () => void;
}

export const EmployeeDialogForm: React.FC<EmployeeDialogFormProps> = ({
  open,
  employeeToEdit,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const [step, setStep] = useState(0);
  const [isFirstStepValid, setIsFirstStepValid] = useState(false);
  const [isSecondStepValid, setIsSecondStepValid] = useState(false);
  const [isThirdStepValid, setIsThirdStepValid] = useState(false);

  const [form] = Form.useForm<Employee>();

  const { resetFields, setFieldsValue, validateFields, getFieldsValue } = form;

  const createEmployee = useMutation({
    mutationFn: (data: Employee) => employeeService.create(data),
    onSuccess: (newItem) => {
      queryClient.setQueriesData(
        {
          predicate: ({ queryKey }) =>
            queryKey[0] === "employees" &&
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
          queryKey[0] === "employees" &&
          ((queryKey[1] as number) > 1 ||
            queryKey[2] === "inactive" ||
            queryKey[3] !== ""),
      });
    },
  });

  const editEmployee = useMutation({
    mutationFn: (data: Employee) => employeeService.update(data),
    onSuccess: (updatedData) => {
      queryClient.setQueriesData(
        {
          predicate: ({ queryKey }) =>
            queryKey[0] === "employees" && queryKey[3] === "",
        },
        (data: any) => {
          const itemIndex: number = data.data.findIndex(
            (item: Employee) => item.id === updatedData.id
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
          queryKey[0] === "employees" && queryKey[3] !== "",
      });
    },
  });

  const handleCancel = () => {
    resetFields();
    setIsFirstStepValid(false);
    setIsSecondStepValid(false);
    setIsThirdStepValid(false);
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
          "shifts",
        ]);

        dataToSend.cpf = dataToSend.cpf.replace(/\D/g, "");
        dataToSend.phone = dataToSend.phone.replace(/\D/g, "");
        dataToSend.address.cep = dataToSend.address.cep.replace(/\D/g, "");

        if (employeeToEdit) {
          editEmployee
            .mutateAsync({
              ...employeeToEdit,
              ...dataToSend,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createEmployee
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
    if (employeeToEdit) {
      setIsFirstStepValid(true);
      setIsSecondStepValid(true);
      setIsThirdStepValid(true);

      setFieldsValue({
        id: employeeToEdit.id,
        name: employeeToEdit.name,
        cpf: employeeToEdit.cpf,
        dataNasc: dayjs(employeeToEdit.dataNasc) as any,
        email: employeeToEdit.email,
        phone: employeeToEdit.phone,
        address: employeeToEdit.address,
        role: employeeToEdit.role,
        shifts: employeeToEdit.shifts,
      });
    }
  }, [employeeToEdit]);

  return (
    <StyledModal
      centered
      open={open}
      onCancel={handleCancel}
      title={`${employeeToEdit ? "Editar" : "Adicionar"} Colaborador`}
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
          loading={createEmployee.isLoading}
          disabled={
            (!isFirstStepValid && step === 0) ||
            (!isSecondStepValid && step === 1) ||
            (!isThirdStepValid && step === 2)
          }
          onClick={() => {
            if (step < 3) {
              setStep(step + 1);

              return;
            }

            handleSubmit();
          }}
        >
          {step < 3 ? "Próximo" : "Salvar"}
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
            disabled: createEmployee.isLoading,
            icon: <UserOutlined />,
          },
          {
            title: "Endereço",
            disabled: !isFirstStepValid || createEmployee.isLoading,
            icon: <EnvironmentFilled />,
          },
          {
            title: "Expediente",
            disabled:
              !isFirstStepValid ||
              !isSecondStepValid ||
              createEmployee.isLoading,
            icon: <ContactsOutlined />,
          },
          {
            title: "Atribuições",
            disabled:
              !isFirstStepValid ||
              !isSecondStepValid ||
              !isThirdStepValid ||
              createEmployee.isLoading,
            icon: <IdcardOutlined />,
          },
        ]}
      />

      {step === 0 && (
        <EmployeePersonalInfoStep
          form={form}
          onStepValidate={(isValid) => setIsFirstStepValid(isValid)}
        />
      )}

      {step === 1 && (
        <EmployeeAddressStep
          employeeForm={form}
          onStepValidate={(isValid) => setIsSecondStepValid(isValid)}
        />
      )}

      {step === 2 && (
        <EmployeeShiftsStep
          employeeForm={form}
          onStepValidate={(isValid) => setIsThirdStepValid(isValid)}
        />
      )}

      {step === 3 && (
        <EmployeeRolesStep form={form} disabled={createEmployee.isLoading} />
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
