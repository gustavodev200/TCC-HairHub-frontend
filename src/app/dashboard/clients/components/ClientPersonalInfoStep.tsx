import { Client } from "@/@types/client";
import { ErrorMessages } from "@/@types/messages";
import { validateCPF } from "@/helpers/utils/validateCPF";
import { DatePicker, Form, FormInstance, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import dayjs from "dayjs";

interface ClientPersonalInfoStepProps {
  form: FormInstance<Client>;
  onStepValidate: (isValid: boolean) => void;
}

export const ClientPersonalInfoStep: React.FC<ClientPersonalInfoStepProps> = ({
  form,
  onStepValidate,
}) => {
  const { getFieldsValue, getFieldsError } = form;

  return (
    <Form
      layout="vertical"
      size="middle"
      form={form}
      onBlur={() => {
        onStepValidate(
          Object.values(
            getFieldsValue(["name", "cpf", "dataNasc", "phone", "email"])
          ).filter((value) => !value).length === 0 &&
            !getFieldsError(["name", "cpf", "dataNasc", "phone", "email"]).some(
              (field) => field.errors.length > 0
            )
        );
      }}
    >
      <Form.Item
        required
        label="Name"
        name="name"
        rules={[
          { required: true, message: "" },
          { type: "string", min: 3, message: ErrorMessages.MSGE08 },
          { type: "string", max: 120, message: ErrorMessages.MSGE09 },
        ]}
      >
        <Input size="large" placeholder="Nome do cliente" />
      </Form.Item>

      <Form.Item
        required
        label="CPF"
        name="cpf"
        rules={[
          { required: true, message: "" },
          {
            pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            message: ErrorMessages.MSGE12,
          },
          () => ({
            validator(_, value) {
              const isValid = validateCPF(value.replace(/\D/g, ""));

              if (isValid || value.replace(/\D/g, "").length < 11) {
                return Promise.resolve();
              }

              return Promise.reject(ErrorMessages.MSGE12);
            },
          }),
        ]}
      >
        <MaskedInput
          mask="000.000.000-00"
          size="large"
          placeholder="999.999.999-99"
        />
      </Form.Item>

      <Form.Item
        required
        label="Data de nascimento"
        name="dataNasc"
        rules={[
          { required: true, message: "" },
          () => ({
            validator(_, value) {
              const isValid = dayjs(value).isBefore(new Date());

              if (isValid) {
                return Promise.resolve();
              }

              return Promise.reject(ErrorMessages.MSGE11);
            },
          }),
        ]}
      >
        <DatePicker
          size="large"
          format="DD/MM/YYYY"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        required
        label="Telefone"
        name="phone"
        rules={[
          { required: true, message: "" },
          {
            pattern: /^\(\d{2}\) 9\d{4}-\d{4}$/,
            message: ErrorMessages.MSGE06,
          },
        ]}
      >
        <MaskedInput
          mask="(00) 00000-0000"
          size="large"
          placeholder="(99) 99999-9999"
        />
      </Form.Item>

      <Form.Item
        required
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: "" },
          { type: "email", message: ErrorMessages.MSGE06 },
        ]}
      >
        <Input size="large" placeholder="exemplo@dominio.com" />
      </Form.Item>
    </Form>
  );
};
