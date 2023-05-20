"use client";

import { AddressDTO } from "@/@types/address";
import { Client } from "@/@types/client";
import { Employee } from "@/@types/employee";
import { ErrorMessages } from "@/@types/messages";
import { Checkbox, DatePicker, Form, FormInstance, Input, Select } from "antd";
import { MaskedInput } from "antd-mask-input";
import { useState } from "react";

interface ClientAddressStepProps {
  clientForm: FormInstance<Client>;
  onStepValidate: (isValid: boolean) => void;
}

export const ClientAddressStep: React.FC<ClientAddressStepProps> = ({
  clientForm,
  onStepValidate,
}) => {
  const [form] = Form.useForm<AddressDTO>();

  const {
    getFieldsValue,
    getFieldValue,
    getFieldsError,
    setFieldsValue,
    setFieldValue,
  } = form;

  const [lastCep, setLastCep] = useState(
    clientForm.getFieldValue("address")?.cep ?? ""
  );
  const [currentSelectedState, setCurrentSelectedState] = useState(
    clientForm.getFieldValue("address")?.state ?? ""
  );
  const [noNumber, setNoNumber] = useState(
    clientForm.getFieldValue("address")?.number === "s/n" ?? false
  );

  return (
    <Form
      layout="vertical"
      size="middle"
      form={form}
      initialValues={clientForm.getFieldValue("address")}
      onValuesChange={(fields) => {
        if (fields.state && fields.state !== currentSelectedState) {
          setFieldValue("city", undefined);
          setCurrentSelectedState(fields.state);
        }

        if (
          fields.cep &&
          fields.cep.replace(/\D/g, "").length === 8 &&
          fields.cep.replace(/\D/g, "") !== lastCep
        )
          setLastCep(fields.cep.replace(/\D/g, ""));
      }}
      onBlur={() => {
        const isValid =
          Object.values(
            getFieldsValue([
              "cep",
              "city",
              "state",
              "district",
              "street",
              "number",
            ])
          ).filter((value) => !value).length === 0 &&
          !getFieldsError([
            "cep",
            "city",
            "state",
            "district",
            "street",
            "number",
          ]).some((field) => field.errors.length > 0);

        onStepValidate(isValid);

        clientForm.setFieldValue("address", getFieldsValue());
      }}
    >
      <Form.Item
        required
        label="CEP"
        name="cep"
        rules={[
          { required: true, message: "" },
          {
            pattern: /^\d{5}-\d{3}$/,
            message: ErrorMessages.MSGE06,
          },
        ]}
      >
        <MaskedInput
          mask="00000-000"
          size="large"
          placeholder="Insira aqui seu CEP"
        />
      </Form.Item>

      <div style={{ display: "flex", alignItems: "end", gap: 8 }}>
        <Form.Item
          required
          label="Município-UF"
          name="city"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "" }]}
        >
          <Input size="large" placeholder="Goianésia" />
        </Form.Item>

        <span style={{ marginBottom: 32 }}>-</span>

        <Form.Item
          required
          name="state"
          style={{ width: 85 }}
          rules={[{ required: true, message: "" }]}
        >
          <MaskedInput mask="GO" size="large" placeholder="UF" />
        </Form.Item>
      </div>

      <Form.Item
        required
        label="Bairro"
        name="district"
        rules={[{ required: true, message: "" }]}
      >
        <Input size="large" placeholder="Centro" />
      </Form.Item>

      <Form.Item
        required
        label="Rua"
        name="street"
        rules={[{ required: true, message: "" }]}
      >
        <Input size="large" placeholder="Nome da rua" />
      </Form.Item>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Form.Item
          required
          label="Número"
          name="number"
          style={{ flex: 1 }}
          rules={[{ required: true, message: "" }]}
        >
          <Input disabled={noNumber} size="large" placeholder="123" />
        </Form.Item>

        <Checkbox
          checked={noNumber}
          onChange={() => {
            if (noNumber) {
              setFieldValue("number", undefined);
              setNoNumber(false);
            } else {
              setNoNumber(true);
              setFieldValue("number", "s/n");
            }
          }}
        >
          Sem número
        </Checkbox>
      </div>
    </Form>
  );
};
