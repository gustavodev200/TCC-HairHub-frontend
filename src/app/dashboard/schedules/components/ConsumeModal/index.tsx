"use client";

import React, { useEffect } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { ScheduleOutputDTO } from "@/@types/schedules";
import styled from "styled-components";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product";

interface ConsumeModalProps {
  open: boolean;
  onClose: () => void;
  selectedConsumeScheduleId?: ScheduleOutputDTO;
}

function ConsumeModal({
  open,
  onClose,
  selectedConsumeScheduleId,
}: ConsumeModalProps) {
  const [form] = Form.useForm();
  const { resetFields, setFieldsValue, validateFields, setFieldValue } = form;

  const { data } = useQuery(["products"], {
    queryFn: () => productService.getOnlyProducts(),
  });

  const paymentTypeWatch = Form.useWatch("payment_type", {
    form,
    preserve: true,
  });

  const paymentTotalWatch = Form.useWatch("products", {
    form,
    preserve: true,
  });

  useEffect(() => {
    let paymentTotal = 0;

    paymentTotalWatch?.forEach((selectedProduct: string) => {
      const product = data?.find((item) => String(item.id) === selectedProduct);
      if (product) {
        paymentTotal += product.price;
      }
    });

    if (paymentTotal > 0 && paymentTotalWatch) {
      console.log(paymentTotal);
      setFieldValue("payment_total", paymentTotal);
    } else {
      setFieldValue("payment_total", null);
    }
  }, [paymentTotalWatch]);

  return (
    <ModalWrapper
      title="CONSUMOS ATÉ O MOMENTO"
      open={open}
      onCancel={onClose}
      centered
      // title={`${scheduleToEdit ? "EDITAR" : "ADICIONAR"} AGENDAMENTO `}
      footer={[
        <ButtonModal
          onClick={onClose}
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
          // loading={createSchedule.isLoading || editSchedule.isLoading}
          // onClick={handleSubmit}
        >
          Salvar
        </ButtonModal>,
      ]}
    >
      <Form
        layout="vertical"
        size="middle"
        // disabled={createSchedule.isLoading || editSchedule.isLoading}
        form={form}
        initialValues={{
          name: "",
        }}
      >
        <Form.Item
          required
          label="Serviços"
          name="services"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Campo Obrigatório!" }]}
        >
          <Select
            disabled={true}
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Selecione serviços"
            optionFilterProp="label"
            filterOption={(input: string, option: any) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            // options={dataServices?.map((item) => ({
            //   value: item.id,
            //   label: item.name,
            // }))}
          />
        </Form.Item>

        <Form.Item
          required
          label="Produtos"
          name="products"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Campo Obrigatório!" }]}
        >
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Selecione produtos consumidos"
            optionFilterProp="label"
            filterOption={(input: string, option: any) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            options={data?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          required
          label="Tipo de Pagamento"
          name="payment_type"
          style={{ width: "100%" }}
          rules={[{ required: true, message: "Campo Obrigatório!" }]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Tipo de pagamento"
            options={[
              { value: "money", label: "Dinheiro" },
              { value: "pix", label: "Pix" },
              { value: "credit_card", label: "Cartão de Crédito" },
              { value: "debit_card", label: "Cartão de Débito" },
            ]}
          />
        </Form.Item>

        <Form.Item name="payment_total" style={{ width: "100%" }}>
          <AmountToPayContainer>
            <h3>Valor a pagar:</h3>
            <Input
              name="payment_total"
              disabled
              style={{ width: "50%", fontSize: "20px" }}
              placeholder="Total a pagar"
            />
          </AmountToPayContainer>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
}

const ButtonModal = styled(Button)`
  background: ${(props: any) => props.backgroundcolor};
`;

const ModalWrapper = styled(Modal)`
  margin-top: 15;
`;

const AmountToPayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 30px 0;
`;

export default ConsumeModal;
