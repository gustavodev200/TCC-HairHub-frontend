"use client";

import { MySchedulesCard } from "../components/MySchedulesCard";
import * as C from "./styles";

export default function Schedules() {
  return (
    <C.Container>
      <C.Content>
        <C.Title>Meus Agendamentos</C.Title>
        <C.MySchedulesConatainer>
          <MySchedulesCard />
          <MySchedulesCard />
          <MySchedulesCard />
          <MySchedulesCard />
        </C.MySchedulesConatainer>
      </C.Content>
    </C.Container>
  );
}
