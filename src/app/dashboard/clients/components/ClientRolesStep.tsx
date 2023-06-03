import { Client } from "@/@types/client";
import { AssignmentType } from "@/@types/role";
import { Checkbox, Form, FormInstance, Select } from "antd";
import { useState } from "react";
import styled from "styled-components";

const StyledCheckboxGroup = styled(Checkbox.Group)`
  flex-direction: column;
  gap: 4px;

  label {
    margin: 0 !important;
  }
`;

interface ClientRolesStepProps {
  disabled: boolean;
  form: FormInstance<Client>;
}

export const ClientRolesStep: React.FC<ClientRolesStepProps> = ({
  disabled,
  form,
}) => {
  const { getFieldValue, getFieldsValue } = form;

  const [selectedRoles, setSelectedRoles] = useState<AssignmentType>(
    getFieldValue("role") ?? ""
  );

  return (
    <Form
      disabled={disabled}
      layout="vertical"
      size="middle"
      form={form}
      initialValues={{
        role: AssignmentType.CLIENT,
      }}
      onValuesChange={(fields) => {
        setSelectedRoles(fields.role);
      }}
    >
      <Form.Item
        required
        label="Selecione as atribuições do cliente"
        name="role"
        rules={[{ required: true, message: "" }]}
        style={{ width: "100%" }}
      >
        <Select
          optionFilterProp="children"
          size="large"
          style={{ width: "100%" }}
          options={[
            { value: AssignmentType.ADMIN, label: "Gerente/Proprietário" },
            { value: AssignmentType.EMPLOYEE, label: "Barbairo(a)" },
            { value: AssignmentType.ATTENDANT, label: "Atendente" },
            { value: AssignmentType.CLIENT, label: "Cliente" },
          ]}
        />
      </Form.Item>
    </Form>
  );
};
