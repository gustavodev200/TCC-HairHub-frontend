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
  ParamsUpdateConsumptionDTO,
} from "@/@types/Consumption";
import { scheduleService } from "@/services/schedule";

interface ConsumeModalProps {
  open: boolean;
  onClose: () => void;
  selectedConsumeScheduleId?: ScheduleOutputDTO;
  isFinishing?: boolean;
}

function ConsumeModal({
  open,
  onClose,
  selectedConsumeScheduleId,
  isFinishing,
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

  const { data: dataSchedulings } = useQuery(["schedulings"], {
    queryFn: () =>
      scheduleService.getSchedulingById(
        selectedConsumeScheduleId?.id as string
      ),
    enabled: !!selectedConsumeScheduleId,
  });

  const createConsumption = useMutation({
    mutationFn: (data: ConsumptionInputDTO) =>
      consumptionApi.createConsumption(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["consumptions"]);
    },
  });

  const editConsumption = useMutation({
    mutationFn: (data: ParamsUpdateConsumptionDTO) =>
      consumptionApi.update(data),
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

  const [productQuantities, setProductQuantities] = useState<{
    [productId: string]: number;
  }>({});

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        const dataToUse = {
          ...data,
          services_consumption: data.services?.map((item: any) => item.value),
          products_consumption: data.products?.map((item: any) => ({
            product_id: item,
            quantity: productQuantities[item] || 0,
          })),
        };
        console.log(data);
        if (dataSchedulings?.consumption) {
          editConsumption
            .mutateAsync({
              ...dataSchedulings?.consumption,
              ...dataToUse,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createConsumption
            .mutateAsync({
              ...dataToUse,
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    if (dataSchedulings) {
      if (dataSchedulings.services && dataSchedulings.services.length > 0) {
        const defaultValues = dataSchedulings.services?.map((item) => ({
          value: item.id,
          label: item.name,
          price: item.price,
        }));

        setFieldsValue({
          services: defaultValues,
          products_consumption:
            dataSchedulings.consumption?.products_consumption,
          total_amount: dataSchedulings.consumption?.total_amount,
          payment_type: dataSchedulings.consumption?.payment_type,
        });
      }
    }
  }, [dataSchedulings, setFieldsValue]);

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
      dataSchedulings &&
      dataSchedulings.services &&
      dataSchedulings.services.length > 0
    ) {
      dataSchedulings.services.forEach((service) => {
        total += service.price;
      });
    }

    if (total > 0 && paymentTotalWatch) {
      setPaymentTotal(total);
      setFieldValue("total_amount", total);
    } else {
      setFieldValue("total_amount", null);
    }
  }, [
    data,
    productQuantities,
    paymentTotalWatch,
    dataSchedulings,
    setFieldValue,
  ]);

  const handleQuantityChange = (productId: string, amount: number) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantity = Math.max(
        0,
        (prevQuantities[productId] || 0) + amount
      );

      // Atualize o estado do formulário com os produtos consumidos
      form.setFieldsValue({
        products_consumption: {
          ...form.getFieldValue("products_consumption"),
          [productId]: updatedQuantity,
        },
      });

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
          total_amount: 0,
          products_consumption: [],
          payment_type: "",
          scheduling_id: selectedConsumeScheduleId?.id,
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

        {isFinishing && (
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
                { value: "pix", label: "Pix Barbearia" },
                { value: "credit_card", label: "Cartão de Crédito" },
                { value: "debit_card", label: "Cartão de Débito" },
              ]}
            />
          </Form.Item>
        )}
        <Form.Item name="total_amount" style={{ width: "100%" }}>
          <AmountToPayContainer>
            <h3>Valor a pagar:</h3>
            <span>{formatCurrency(paymentTotal)}</span>
          </AmountToPayContainer>
        </Form.Item>

        <Form.Item name="scheduling_id" style={{ display: "none" }}>
          <input type="text" />
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
