"use client";

import Image from "next/image";
import styled from "styled-components";

export default function HomePageContent() {
  return (
    <>
      <HomeContainer>
        <h1 style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          Welcome to Hair Hub
          <h1
            style={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: 10,
              padding: "0 5px",
            }}
          >
            BarberShop
          </h1>
        </h1>
        <Image
          src={"/images/logo_hair_hub.svg"}
          width={400}
          height={400}
          alt="Logo"
        />
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin-top: 4rem;

  h1 {
    font-weight: bold;
    font-size: 3rem;
  }

  img {
    margin-top: 2rem;
    background-color: #000;
    border-radius: 10px;
  }
`;
