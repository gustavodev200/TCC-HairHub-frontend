"use client";

import { Image } from "antd";
import * as C from "./styles";
import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";

interface backgroudSelectedProps {
  backgroudSelected: string;
}

export const BarberCard = ({ backgroudSelected }: backgroudSelectedProps) => {
  return (
    <C.Container backgroudSelected={backgroudSelected}>
      <C.ContainerOne>
        <C.ImageContent>
          <Image
            src="https://i0.wp.com/www.canalmasculino.com.br/wp-content/uploads/2017/08/cortes-cabelo-masculinos-side-part-01-570x570.jpg?resize=570%2C570"
            width={60}
            height={60}
            alt="Logo Hair Hub Barbershop"
            style={{
              borderRadius: "10px",
            }}
          />
        </C.ImageContent>

        <C.InfoServiceContainer>
          <h4>Rodrigo do corte</h4>
          <div>
            <Rate />
            <C.NoteWrapper>4.5</C.NoteWrapper>
          </div>
        </C.InfoServiceContainer>
      </C.ContainerOne>

      <C.ButtonContainer>
        <C.ButtonContent>
          <HeartOutlined />
        </C.ButtonContent>
      </C.ButtonContainer>
    </C.Container>
  );
};
