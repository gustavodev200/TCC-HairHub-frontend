"use client";

import { BarberCard } from "../components/BarberCard";
import ImageSlider from "../components/ImageSlider";
import { ServiceCard } from "../components/ServiceCard";
import * as C from "./styles";

export default function Home() {
  return (
    <>
      <C.Container>
        <C.SliderImageContainer>
          <C.Title>Novidades e Destaques:</C.Title>
          <ImageSlider />
        </C.SliderImageContainer>

        <C.SelectedServiceContainer>
          <div>
            <h2>Selecione o profissional:</h2>
            <C.BarberSelectedConatainer>
              {/* <BarberCard
                backgroudSelected="#ffffff"
                BarberSelectedColor="#242731"
                backgroudSelectedHover="#242731"
                BarberSelectedColorHover="#FFF"
              />
              <BarberCard
                backgroudSelected="#242731"
                BarberSelectedColor="#FFF"
                backgroudSelectedHover="#FFF"
                BarberSelectedColorHover="#242731"
              />
              <BarberCard
                backgroudSelected="#242731"
                BarberSelectedColor="#FFF"
                backgroudSelectedHover="#FFF"
                BarberSelectedColorHover="#242731"
              />
              <BarberCard
                backgroudSelected="#242731"
                BarberSelectedColor="#FFF"
                backgroudSelectedHover="#FFF"
                BarberSelectedColorHover="#242731"
              /> */}
              <BarberCard
                backgroudSelected="#242731"
                BarberSelectedColor="#FFF"
                backgroudSelectedHover="#FFF"
                BarberSelectedColorHover="#242731"
              />
            </C.BarberSelectedConatainer>
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
