"use client";

import { Image } from "antd";
import * as C from "./styles";
import { ClockCircleOutlined } from "@ant-design/icons";
import { IService } from "@/@types/service";
import { formatCurrency } from "@/helpers/utils/formatCurrency";

export const ServiceCard = ({ service }: { service: IService }) => {
  return (
    <C.Container>
      <C.ContainerOne>
        <C.ImageContent>
          <Image
            src={service.image}
            width={70}
            height={70}
            alt="Logo Hair Hub Barbershop"
            style={{
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
        <C.ButtonContent>AGENDAR</C.ButtonContent>
      </C.ButtonContainer>
    </C.Container>
  );
};
