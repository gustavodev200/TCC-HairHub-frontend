import React from "react";

import * as C from "./styles";
import { DatePicker, TimePicker, Form, Select, Space, InputNumber } from "antd";

interface SchedulingModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

export const SchedulingModal = ({
  isModalOpen,
  handleCancel,
}: SchedulingModalProps) => {
  const { RangePicker } = DatePicker;
  return (
    <>
      <C.SchedulingModalContainer
        centered
        title="AGENDAR HORÁRIO"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            width: "100%",
          }}
          initialValues={{ remember: true }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <C.FormItemAntd
            label="Data de Agendamento"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            labelCol={{ span: 24 }}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </C.FormItemAntd>

          <C.FormItemAntd
            required
            label="Barbeiros Disponíveis"
            name="client_id"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
            labelCol={{ span: 24 }}
          >
            <Select
              disabled
              defaultValue="Gustavo Lage"
              // onChange={handleChange}
              options={[
                { value: "gustavo", label: "Gustavo Lage" },
                { value: "roberto", label: "Roberto Silva" },
                { value: "caio", label: "Caio Souza" },
              ]}
            />
          </C.FormItemAntd>

          <C.FormItemAntd
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
              // onChange={handleChange}
              // options={options}
            />
          </C.FormItemAntd>

          <C.FormItemAntd
            required
            label="Tempo estimado do serviço"
            name="time"
            labelCol={{ span: 24 }}
          >
            <InputNumber
              min={1}
              max={999}
              addonAfter="Min"
              placeholder="Tempo"
              style={{ width: "100%" }}
            />
          </C.FormItemAntd>

          <Space.Compact block>
            <Form.Item
              label="Horário/Início"
              required
              style={{ display: "inline-block", width: "50%" }}
              name="start_time"
              rules={[{ required: true, message: "" }]}
              labelCol={{ span: 24 }}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder="Início"
              />
            </Form.Item>

            <Form.Item
              label="Horário/Fim"
              required
              name="end_time"
              style={{ display: "inline-block", width: "50%" }}
              rules={[{ required: true, message: "" }]}
              labelCol={{ span: 24 }}
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
      </C.SchedulingModalContainer>
    </>
  );
};
