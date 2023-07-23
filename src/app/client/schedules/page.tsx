"use client";

import { MySchedulesCard } from "../components/MySchedulesCard";
import * as C from "./styles";

export default function Schedules() {
  return (
    <C.Container>
      <C.Content>
        <h2>Meus Agendamentos</h2>
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
