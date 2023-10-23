"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { ScheduleOutputDTO } from "@/@types/schedules";
import styled from "styled-components";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product";
import { serviceApi } from "@/services/service";
import { consumptionApi } from "@/services/consumptions";
import {
  ConsumptionInputDTO,
  ConsumptionOutputDTO,
} from "@/@types/Consumption";

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
  const queryClient = useQueryClient();
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

  const { data: dataServices, isLoading: isLoadingServices } = useQuery(
    ["services"],
    {
      queryFn: () => serviceApi.getServicesOnly(),
    }
  );

  const createConsumption = useMutation({
    mutationFn: (data: ConsumptionOutputDTO) =>
      consumptionApi.createConsumption(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["consumptions"]);
    },
  });

  const editConsumption = useMutation({
    mutationFn: (data: ConsumptionOutputDTO) => consumptionApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["consumptions"]);
    },
  });

  const handleCancel = () => {
    if (createConsumption.isLoading || editConsumption.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        if (selectedConsumeScheduleId) {
          editConsumption
            .mutateAsync({
              ...selectedConsumeScheduleId,
              ...data,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createConsumption
            .mutateAsync({
              ...data,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (selectedConsumeScheduleId) {
      if (
        selectedConsumeScheduleId.services &&
        selectedConsumeScheduleId.services.length > 0
      ) {
        const defaultValues = selectedConsumeScheduleId.services.map(
          (item) => ({
            value: item.id,
            label: item.name,
            price: item.price,
          })
        );

        setFieldsValue({
          services: defaultValues,
        });
      }
    }
  }, [selectedConsumeScheduleId, setFieldsValue]);

  const [productQuantities, setProductQuantities] = useState<{
    [productId: string]: number;
  }>({});

  const [paymentTotal, setPaymentTotal] = useState<number>(0);

  useEffect(() => {
    let total = 0;

    paymentTotalWatch?.forEach((selectedProduct: string) => {
      const product = data?.find((item) => String(item.id) === selectedProduct);
      if (product) {
        const productQuantity = productQuantities[String(product.id)] || 0;
        total += product.price * productQuantity;
      }
    });

    if (
      selectedConsumeScheduleId &&
      selectedConsumeScheduleId.services &&
      selectedConsumeScheduleId.services.length > 0
    ) {
      selectedConsumeScheduleId.services.forEach((service) => {
        total += service.price;
      });
    }

    if (total > 0 && paymentTotalWatch) {
      setPaymentTotal(total);
      setFieldValue("payment_total", total);
    } else {
      setFieldValue("payment_total", null);
    }
  }, [
    data,
    productQuantities,
    paymentTotalWatch,
    selectedConsumeScheduleId,
    setFieldValue,
  ]);

  const handleQuantityChange = (productId: string, amount: number) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantity = Math.max(
        0,
        (prevQuantities[productId] || 0) + amount
      );

      return {
        ...prevQuantities,
        [productId]: updatedQuantity,
      };
    });
  };

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
          loading={createConsumption.isLoading || editConsumption.isLoading}
          onClick={handleSubmit}
        >
          Finalizar
        </ButtonModal>,
      ]}
    >
      <Form
        layout="vertical"
        size="middle"
        // disabled={createConsumption.isLoading || editConsumption.isLoading}
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
            disabled
            mode="tags"
            style={{ width: "100%" }}
            optionFilterProp="label"
            filterOption={(input: string, option: any) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            defaultValue={[]}
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

        {paymentTotalWatch?.length > 0 && (
          <Form.Item label="Quantidade" name="products_consumption">
            <>
              {paymentTotalWatch?.map((selectedProduct: string) => {
                const product = data?.find(
                  (item) => String(item.id) === selectedProduct
                );

                return (
                  <QuantityContainer key={selectedProduct}>
                    {product && (
                      <>
                        <span>
                          <strong>{product.name}</strong> - <span>1x </span>
                          <span>{formatCurrency(product.price)}</span>
                        </span>
                        <QuantityPerProduct>
                          <ButtonRemoveQuantity
                            onClick={() =>
                              handleQuantityChange(String(product.id), -1)
                            }
                          >
                            -
                          </ButtonRemoveQuantity>

                          <InputQuantity
                            min={0}
                            value={productQuantities[String(product.id)] || 0}
                            onChange={(value) =>
                              handleQuantityChange(
                                String(product.id),
                                value as number
                              )
                            }
                          />
                          <ButtonAddQuantity
                            onClick={() =>
                              handleQuantityChange(String(product.id), 1)
                            }
                          >
                            +
                          </ButtonAddQuantity>
                        </QuantityPerProduct>
                      </>
                    )}
                  </QuantityContainer>
                );
              })}
            </>
          </Form.Item>
        )}

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
              style={{ width: "50%", fontSize: "20px" }}
              placeholder="Total a pagar"
              value={formatCurrency(paymentTotal)}
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

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const QuantityPerProduct = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
`;

const InputQuantity = styled(InputNumber)`
  text-align: center;
  .ant-input-number-input {
    text-align: center;
  }
`;

const ButtonAddQuantity = styled(Button)`
  background-color: #6cb66f;
  color: #fff;
  border: none;
`;

const ButtonRemoveQuantity = styled(Button)`
  background-color: #e94444;
  color: #fff;
  border: none;
`;

export default ConsumeModal;
