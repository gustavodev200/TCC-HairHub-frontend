"use client";

import { Employee } from "@/@types/employee";
import { ShiftFormDTO, ShiftOutputDTO } from "@/@types/shifts";
import { Form, FormInstance, TimePicker, Checkbox, Button, Space } from "antd";
import styled from "styled-components";
import { CheckboxWeek } from "./CheckboxWeek";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface EmployeeShiftsStepProps {
  employeeForm: FormInstance<Employee>;
  onStepValidate: (isValid: boolean) => void;
}

const StyledCheckboxGroup = styled(Checkbox.Group)`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4px;

  label {
    margin: 0 !important;
  }
`;

export const EmployeeShiftsStep: React.FC<EmployeeShiftsStepProps> = ({
  employeeForm,
  onStepValidate,
}) => {
  const [form] = Form.useForm<ShiftFormDTO>();

  const { getFieldsValue, getFieldsError, setFieldValue, getFieldValue } = form;
  const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const shiftsFromEmployee = employeeForm.getFieldValue("shifts");

  return (
    <Form
      layout="vertical"
      size="middle"
      form={form}
      initialValues={{
        time_range: [
          dayjs(shiftsFromEmployee?.[0]?.start_time),
          dayjs(shiftsFromEmployee?.[0]?.end_time),
        ],
        available_days: shiftsFromEmployee?.[0]?.available_days,
        shifts: shiftsFromEmployee?.slice(1) ?? [],
      }}
      onValuesChange={(changedValues, allValues) => {
        const shifts = allValues.shifts;

        if (shifts.length > 1) {
          const previousShift = shifts[shifts.length - 2];
          const currentShift = shifts[shifts.length - 1];

          const previousAvailableDays = previousShift?.available_days;
          const currentAvailableDays = currentShift?.available_days;

          if (!currentAvailableDays || currentAvailableDays.length === 0) {
            setFieldValue(
              ["shifts", shifts.length - 1, "available_days"],
              previousAvailableDays
            );
          }
        }
      }}
      onBlur={() => {
        const shifts = getFieldValue("shifts");

        const isValid =
          Object.values(
            getFieldsValue(["time_range", "available_days", "shifts"])
          ).filter((value) => !value).length === 0 &&
          !getFieldsError(["time_range", "available_days", "shifts"]).some(
            (field) => field.errors.length > 0
          ) &&
          shifts.every(
            (shift: ShiftOutputDTO) => shift.available_days.length > 0
          );

        onStepValidate(isValid);

        const valueFields = getFieldsValue();

        employeeForm.setFieldValue("shifts", [
          {
            start_time: valueFields.time_range[0].format(),
            end_time: valueFields.time_range[1].format(),
            available_days: valueFields.available_days,
          },
          ...valueFields.shifts.map((shift: any) => ({
            start_time: shift.shift_time[0].format(),
            end_time: shift.shift_time[1].format(),
            available_days: shift.available_days,
          })),
        ]);
      }}
    >
      <Form.Item
        style={{ width: "100%" }}
        label="1° Turno"
        required
        rules={[{ required: true, message: "" }]}
        name={"time_range"}
      >
        <TimePicker.RangePicker format="HH:mm" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Quais são os dia disponíveis?" name="available_days">
        <StyledCheckboxGroup
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {daysOfWeek.map((day, index) => (
            <CheckboxWeek value={index} key={index} day_of_week={day} />
          ))}
        </StyledCheckboxGroup>
      </Form.Item>
      <Form.List name="shifts">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => {
              const previousDays =
                index === 0
                  ? getFieldValue("available_days")
                  : getFieldValue(["shifts", index - 1, "available_days"]);
              return (
                <div key={key}>
                  <Space>
                    <Form.Item
                      {...restField}
                      name={[name, "shift_time"]}
                      label={`${index + 2}° Turno`}
                    >
                      <TimePicker.RangePicker format="HH:mm" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                  <Form.Item
                    {...restField}
                    name={[name, "available_days"]}
                    label="Quais são os dias disponíveis?"
                    initialValue={previousDays}
                  >
                    <StyledCheckboxGroup>
                      {daysOfWeek.map((day, index) => (
                        <CheckboxWeek
                          value={index}
                          key={index}
                          day_of_week={day}
                        />
                      ))}
                    </StyledCheckboxGroup>
                  </Form.Item>
                </div>
              );
            })}
            {fields.length < 2 && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Adicionar Turno
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>

      <div style={{ display: "flex", alignItems: "end", gap: 8 }}></div>
    </Form>
  );
};
