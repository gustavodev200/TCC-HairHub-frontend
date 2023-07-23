"use client";

import { Image } from "antd";
import * as C from "./styles";
import { HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";

interface backgroudSelectedProps {
  backgroudSelected: string;
  BarberSelectedColor: string;
  backgroudSelectedHover: string;
  BarberSelectedColorHover: string;
}

export const BarberCard = ({
  backgroudSelected,
  BarberSelectedColor,
  backgroudSelectedHover,
  BarberSelectedColorHover,
}: backgroudSelectedProps) => {
  return (
    <C.Container
      backgroudSelected={backgroudSelected}
      backgroudSelectedHover={backgroudSelectedHover}
    >
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
          <C.BarberName
            BarberSelectedColor={BarberSelectedColor}
            BarberSelectedColorHover={BarberSelectedColorHover}
          >
            Rodrigo do corte
          </C.BarberName>
          <div>
            <Rate disabled allowHalf defaultValue={4.5} />
            <C.NoteWrapper
              BarberSelectedColor={BarberSelectedColor}
              BarberSelectedColorHover={BarberSelectedColorHover}
            >
              4.5
            </C.NoteWrapper>
          </div>
        </C.InfoServiceContainer>
      </C.ContainerOne>

      <C.ButtonContainer>
        <C.ButtonContent
          BarberSelectedColor={BarberSelectedColor}
          BarberSelectedColorHover={BarberSelectedColorHover}
        >
          <HeartOutlined />
        </C.ButtonContent>
      </C.ButtonContainer>
    </C.Container>
  );
};
