"use client";

import ImageSlider from "../components/ImageSlider";
import { ServiceCard } from "../components/ServiceCard";
import * as C from "./styles";

export default function Home() {
  return (
    <>
      <C.Container>
        <C.SliderImageContainer>
          <h2>Novidades e Destaques:</h2>
          <ImageSlider />
        </C.SliderImageContainer>

        <C.SelectedServiceContainer>
          <div>
            <h2>Selecione o profissional:</h2>
          </div>

          <div>
            <h2>Lista de serviços:</h2>
            <C.GridContainer>
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
              <ServiceCard />
            </C.GridContainer>
          </div>
        </C.SelectedServiceContainer>
      </C.Container>
    </>
  );
}
