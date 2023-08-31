"use client";

import { Image } from "antd";
import * as C from "./styles";
import { ClockCircleOutlined } from "@ant-design/icons";
import { IService } from "@/@types/service";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { SchedulingModal } from "../SchedulingModal";
import { useState } from "react";

export const ServiceCard = ({ service }: { service: IService }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <C.Container>
        <C.ContainerOne>
          <C.ImageContent>
            <Image
              src={service.image}
              width={70}
              height={70}
              alt="Logo Hair Hub Barbershop"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </C.ImageContent>

          <C.InfoServiceContainer>
            <h4>{service.name}</h4>
            <span>
              <ClockCircleOutlined style={{ marginRight: "10px" }} />
              {service.time}min
            </span>
            <span>
              <strong>{formatCurrency(service.price)}</strong>
            </span>
          </C.InfoServiceContainer>
        </C.ContainerOne>

        <C.ButtonContainer>
          <C.ButtonContent onClick={showModal}>AGENDAR</C.ButtonContent>
        </C.ButtonContainer>
      </C.Container>
      <SchedulingModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </>
  );
};
