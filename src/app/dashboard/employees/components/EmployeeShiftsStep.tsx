"use client";

import { Employee } from "@/@types/employee";
import { ShiftFormDTO, ShiftOutputDTO } from "@/@types/shifts";
import { Form, FormInstance, TimePicker, Checkbox, Button, Space } from "antd";
import styled from "styled-components";
import { CheckboxWeek } from "./CheckboxWeek";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

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
  const daysOfWeek = [
    {
      label: "Seg",
      value: 1,
    },
    {
      label: "Ter",
      value: 2,
    },

    {
      label: "Qua",
      value: 3,
    },

    {
      label: "Qui",
      value: 4,
    },

    {
      label: "Sex",
      value: 5,
    },

    {
      label: "Sab",
      value: 6,
    },

    {
      label: "Dom",
      value: 0,
    },
  ];

  const shiftsFromEmployee = employeeForm.getFieldValue("shifts");

  return (
    <Form
      layout="vertical"
      size="middle"
      form={form}
      initialValues={{
        start_time: dayjs(shiftsFromEmployee?.[0]?.start_time),
        end_time: dayjs(shiftsFromEmployee?.[0]?.end_time),
        available_days: shiftsFromEmployee?.[0]?.available_days,
        shifts:
          shiftsFromEmployee?.slice(1).map((shift: any) => ({
            start_time: dayjs(shift.start_time),
            end_time: dayjs(shift.end_time),
            available_days: shift.available_days,
          })) ?? [],
      }}
      onValuesChange={(changedValues, allValues) => {}}
      onBlur={() => {
        const shifts = getFieldValue("shifts");

        const isValid =
          Object.values(
            getFieldsValue([
              "start_time",
              "end_time",
              "available_days",
              "shifts",
            ])
          ).filter((value) => !value).length === 0 &&
          !getFieldsError([
            "start_time",
            "end_time",
            "available_days",
            "shifts",
          ]).some((field) => field.errors?.length > 0) &&
          shifts.every(
            (shift: ShiftOutputDTO) => shift?.available_days?.length > 0
          );

        onStepValidate(isValid);

        const valueFields = getFieldsValue();

        employeeForm.setFieldValue("shifts", [
          {
            start_time: valueFields?.start_time?.format(),
            end_time: valueFields?.end_time?.format(),
            available_days: valueFields?.available_days,
          },
          ...valueFields.shifts?.map((shift: any) => ({
            start_time: shift?.start_time?.format(),
            end_time: shift?.end_time?.format(),
            available_days: shift?.available_days,
          })),
        ]);
      }}
    >
      <Form.Item required label="Agenda 1">
        <Space.Compact block>
          <Form.Item
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
            required
            name="end_time"
            style={{ display: "inline-block", width: "50%" }}
            rules={[{ required: true, message: "" }]}
          >
            <TimePicker
              format="HH:mm"
              style={{ width: "100%" }}
              placeholder="Término"
            />
          </Form.Item>
        </Space.Compact>

        <Form.Item label="Quais são os dia disponíveis?" name="available_days">
          <StyledCheckboxGroup
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {daysOfWeek.map((day, index) => (
              <CheckboxWeek
                value={daysOfWeek[index].value}
                key={index}
                day_of_week={daysOfWeek[index].label}
              />
            ))}
          </StyledCheckboxGroup>
        </Form.Item>
      </Form.Item>

      <Form.List name="shifts">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => {
              return (
                <div key={key}>
                  <Form.Item label={`Agenda ${index + 2}`}>
                    <Space.Compact block>
                      <Form.Item
                        {...restField}
                        name={[name, "start_time"]}
                        style={{ width: "100%" }}
                      >
                        <TimePicker
                          format="HH:mm"
                          style={{ width: "100%" }}
                          placeholder="Início"
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "end_time"]}
                        style={{ width: "100%" }}
                      >
                        <TimePicker
                          disabledTime={(current) => {
                            return {};
                          }}
                          format="HH:mm"
                          style={{ width: "100%" }}
                          placeholder="Término"
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        style={{
                          display: "inline-block",
                          justifyItems: "center",

                          cursor: "pointer",
                          fontSize: "32px",
                          marginLeft: "10px",
                        }}
                        onClick={() => {
                          const employeeShifts: any[] =
                            employeeForm.getFieldValue("shifts");
                          remove(name);
                          employeeShifts.splice(index, 1);
                          employeeForm.setFieldValue("shifts", employeeShifts);
                        }}
                      />
                    </Space.Compact>

                    <Form.Item
                      {...restField}
                      name={[name, "available_days"]}
                      label="Quais são os dias disponíveis?"
                      style={{ width: "100%" }}
                    >
                      <StyledCheckboxGroup style={{ width: "100%" }}>
                        {daysOfWeek.map((day, index) => (
                          <CheckboxWeek
                            value={daysOfWeek[index].value}
                            key={index}
                            day_of_week={daysOfWeek[index].label}
                          />
                        ))}
                      </StyledCheckboxGroup>
                    </Form.Item>
                  </Form.Item>
                </div>
              );
            })}
            {fields.length < 2 && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    const shifts = getFieldValue("shifts");
                    if (shifts.length > 1) {
                      const previousShift = shifts[shifts.length - 2];
                      const currentShift = shifts[shifts.length - 1];

                      const previousAvailableDays =
                        previousShift?.available_days;
                      const currentAvailableDays = currentShift?.available_days;

                      if (
                        !currentAvailableDays ||
                        currentAvailableDays.length === 0
                      ) {
                        setFieldValue(
                          ["shifts", shifts.length - 1, "available_days"],
                          previousAvailableDays
                        );
                      }
                    }
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  Adicionar Agenda
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
