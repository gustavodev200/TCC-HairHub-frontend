"use client";

import { Button, Image, Space } from "antd";
import * as C from "./styles";

interface backgroudSelectedProps {}

export const MySchedulesCard = ({}: backgroudSelectedProps) => {
  return (
    <C.Container>
      <C.ContentOneCard>
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

          <C.InfoNameBarber>
            <span>PROFISSIONAL:</span>
            <h5>Dom Juan</h5>
          </C.InfoNameBarber>
        </C.ImageContent>
        <C.ScheduledContent>
          <C.ScheduledContentDay>
            <span>AGENDADO PARA:</span>
            <span>08/08/2022</span>
          </C.ScheduledContentDay>
          <C.ScheduledContentHours>
            <span>HORÁRIO:</span>
            <span>13:00</span>
          </C.ScheduledContentHours>
        </C.ScheduledContent>
      </C.ContentOneCard>

      <C.ContentTwoCard>
        <C.ScheduledContentService>
          <span>SERVIÇO:</span>
          <h6>Corte de Cabelo</h6>
        </C.ScheduledContentService>

        <C.ScheduledContentCurrency>
          <span>VALOR:</span>
          <span>R$ 25,00</span>
        </C.ScheduledContentCurrency>
      </C.ContentTwoCard>

      <C.ButtonContent>
        <C.ButtonStyle type="primary">EDITAR</C.ButtonStyle>
      </C.ButtonContent>
    </C.Container>
  );
};
