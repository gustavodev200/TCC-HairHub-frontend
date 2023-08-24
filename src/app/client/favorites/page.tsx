"use client";

import FavoriteCard from "../components/FavoriteCard";
import * as C from "./styles";

export default function Favorites() {
  return (
    <C.Container>
      <C.Title>Barbeiros Favoritos</C.Title>
      <C.Content>
        <FavoriteCard />
        <FavoriteCard />
        <FavoriteCard />
      </C.Content>
    </C.Container>
  );
}
