"use client";

import { Image } from "antd";
import * as C from "./styles";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import styled from "styled-components";

export const ServiceCard = () => {
  return (
    <C.Container>
      <C.ContainerOne>
        <C.ImageContent>
          <Image
            src="https://www.segredosdesalao.com.br/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-segredosdesalao-br-Library/default/dwc58c6a53/images/blog/blog-article/229148-deixe-o-crew-cut-mais-moderno-com-um-det-orig-2.jpg?sw=480&q=70"
            width={70}
            height={70}
            alt="Logo Hair Hub Barbershop"
            style={{
              borderRadius: "10px",
            }}
          />
        </C.ImageContent>

        <C.InfoServiceContainer>
          <h4>Corte de Cabelo</h4>
          <span>
            <ClockCircleOutlined style={{ marginRight: "10px" }} />
            30min
          </span>
          <span>
            <strong>R$ 25,00</strong>
          </span>
        </C.InfoServiceContainer>
      </C.ContainerOne>

      <C.ButtonContainer>
        <C.ButtonContent>AGENDAR</C.ButtonContent>
      </C.ButtonContainer>
    </C.Container>
  );
};
