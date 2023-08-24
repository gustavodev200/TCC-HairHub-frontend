"use client";

import { Image } from "antd";
import * as C from "./styles";
import { Rate } from "antd";

export default function FavoriteCard() {
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
          <h4>Renan do Corte</h4>

          <C.RateContainer>
            <Rate disabled allowHalf defaultValue={4.5} />
            <C.NoteWrapper>4.5</C.NoteWrapper>
          </C.RateContainer>
        </C.InfoServiceContainer>
      </C.ContainerOne>

      <C.ButtonContainer>
        <C.ButtonContent>VER AGENDA</C.ButtonContent>
      </C.ButtonContainer>
    </C.Container>
  );
}
