"use client";

import {
  ScheduleOutputDTO,
  SchedulesUpdateParamsDTO,
} from "@/@types/schedules";
import { disableDateByDayOfWeek } from "@/helpers/utils/disableDateByDayOfWeek";

import { clientService } from "@/services/client";
import { employeeService } from "@/services/employee";
import { scheduleService } from "@/services/schedule";
import { serviceApi } from "@/services/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Modal,
  Select,
  DatePicker,
  TimePicker,
  Space,
  SelectProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import styled from "styled-components";
import isBetween from "dayjs/plugin/isBetween";
import {
  DisabledTimes,
  disableTimeByShift,
} from "@/helpers/utils/disableTimeByShift";
dayjs.extend(isBetween);

interface ModalProps {
  scheduleToEdit?: ScheduleOutputDTO;
  open: boolean;
  onClose: () => void;
}

interface Shift {
  start_time: string;
  end_time: string;
}

export const ModalSchedule: React.FC<ModalProps> = ({
  scheduleToEdit,
  open,
  onClose,
}) => {
  const [selected, setSelected] = useState("");
  const [timeByShift, setTimeByShift] = useState<Shift[]>([]);
  const [disabledTimes, setDisabledTimes] = useState<DisabledTimes>({});
  const [dayOfWeek, setDayOfWeek] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { resetFields, setFieldsValue, validateFields } = form;

  const { data, isLoading } = useQuery(["employees"], {
    queryFn: () => employeeService.getAllBarbers(),
  });

  const { data: dataClients, isLoading: isLoadingClients } = useQuery(
    ["clients"],
    {
      queryFn: () => clientService.getAllClients(),
    }
  );

  const { data: dataServices, isLoading: isLoadingServices } = useQuery(
    ["services"],
    {
      queryFn: () => serviceApi.getServicesOnly(),
    }
  );

  const createSchedule = useMutation({
    mutationFn: (data: ScheduleOutputDTO) => scheduleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["schedulings"]);
    },
  });

  const editSchedule = useMutation({
    mutationFn: (data: SchedulesUpdateParamsDTO) =>
      scheduleService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["schedulings"]);
    },
  });

  const handleCancel = () => {
    if (createSchedule.isLoading || editSchedule.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        if (scheduleToEdit) {
          editSchedule
            .mutateAsync({
              ...scheduleToEdit,
              ...data,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createSchedule
            .mutateAsync(data)
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  };

  const handleSelectChange = (selectedValue: string) => {
    setSelected(selectedValue);
    // Encontre o barbeiro selecionado
    const selectedBarber = data?.find((item) => item.name === selectedValue);

    // Verifique se o barbeiro foi encontrado
    if (selectedBarber) {
      // Acesse os available_days do barbeiro selecionado
      const availableDays = selectedBarber.shifts.flatMap((shift) =>
        shift.available_days.map((day) => day)
      );

      // Encontre o objeto de turno que corresponde à data selecionada

      // Atualize o estado com os available_days
      setDayOfWeek(availableDays);
      setTimeByShift(selectedBarber.shifts);

      setSelectedDate(dayjs());

      setDisabledTimes(disableTimeByShift(selectedBarber.shifts, dayjs()));
    } else {
      // Caso o barbeiro não seja encontrado, defina dayOfWeek como vazio

      setDayOfWeek([]);
      setTimeByShift([]);
    }
    setSelectedDate(null);
  };

  // useEffect(() => {
  //   if (scheduleToEdit) {
  //     setFieldsValue({
  //       name: scheduleToEdit.name,
  //     });
  //   }
  // }, [scheduleToEdit, setFieldsValue]);

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
          loading={createSchedule.isLoading || editSchedule.isLoading}
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
          disabled={createSchedule.isLoading || editSchedule.isLoading}
          form={form}
          initialValues={{
            name: "",
          }}
        >
          <Form.Item
            required
            label="Barbeiro"
            name="employee_id"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              placeholder="Selecione um barbeiro"
              // defaultValue="Selecione um barbeiro"
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => handleSelectChange(value as string)}
              options={data?.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            required
            label="Data/Agendamento"
            name="start_date_time"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                disableDateByDayOfWeek(current, dayOfWeek, true)
              }
              // onChange={handleChangeDatePicker}
              format="DD/MM/YYYY"
              value={selectedDate}
            />
          </Form.Item>

          <Form.Item
            required
            label="Cliente"
            name="client_id"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              placeholder="Selecione um barbeiro"
              // defaultValue="Selecione um barbeiro"
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => handleSelectChange(value as string)}
              options={dataClients?.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
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
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => handleSelectChange(value as string)}
              options={dataServices?.map((item) => ({
                value: item.name,
                label: item.name,
              }))}
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
                disabledHours={() => disabledTimes.disabledHours?.()}
                disabledMinutes={(hour) =>
                  disabledTimes.disabledMinutes?.(hour)
                }
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
