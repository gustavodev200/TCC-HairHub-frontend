import { Employee } from "@/@types/employee";
import { AssignmentType } from "@/@types/role";
import { Checkbox, Form, FormInstance } from "antd";
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

  const [selectedRoles, setSelectedRoles] = useState<AssignmentType[]>(
    getFieldValue("role") ?? []
  );

  return (
    <Form
      disabled={disabled}
      layout="vertical"
      size="middle"
      form={form}
      initialValues={getFieldsValue()}
      onValuesChange={(fields) => {
        setSelectedRoles(fields.role);
      }}
    >
      <Form.Item
        required
        label="Selecione as atribuições do colaborador"
        name="role"
        rules={[{ required: true, message: "" }]}
      >
        <StyledCheckboxGroup>
          <Checkbox
            disabled={
              selectedRoles.includes(AssignmentType.EMPLOYEE) ||
              selectedRoles.includes(AssignmentType.ATTENDANT)
            }
            value={AssignmentType.ADMIN}
          >
            Administrador(a)
          </Checkbox>

          <Checkbox
            disabled={
              selectedRoles.includes(AssignmentType.ADMIN) ||
              selectedRoles.includes(AssignmentType.ATTENDANT)
            }
            value={AssignmentType.EMPLOYEE}
          >
            Colaborador(a)
          </Checkbox>

          <Checkbox
            disabled={
              selectedRoles.includes(AssignmentType.EMPLOYEE) ||
              selectedRoles.includes(AssignmentType.ADMIN)
            }
            value={AssignmentType.ATTENDANT}
          >
            Atendente
          </Checkbox>
        </StyledCheckboxGroup>
      </Form.Item>
    </Form>
  );
};
