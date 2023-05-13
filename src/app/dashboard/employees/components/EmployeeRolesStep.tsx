import { Employee } from "@/@types/employee";
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

interface EmployeeRolesStepProps {
  disabled: boolean;
  form: FormInstance<Employee>;
}

export const EmployeeRolesStep: React.FC<EmployeeRolesStepProps> = ({
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
        role: AssignmentType.EMPLOYEE,
      }}
      onValuesChange={(fields) => {
        setSelectedRoles(fields.role);
      }}
    >
      <Form.Item
        required
        label="Selecione as atribuições do colaborador"
        name="role"
        rules={[{ required: true, message: "" }]}
        style={{ width: "100%" }}
      >
        <Select
          optionFilterProp="children"
          size="large"
          style={{ width: "100%" }}
          options={[
            { value: AssignmentType.ADMIN, label: "Administrador(a)" },
            { value: AssignmentType.EMPLOYEE, label: "Barbairo(a)" },
            { value: AssignmentType.ATTENDANT, label: "Atendente" },
          ]}
        />
      </Form.Item>
    </Form>
  );
};
