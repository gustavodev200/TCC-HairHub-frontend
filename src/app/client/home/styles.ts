import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 85px 100px;
  z-index: 0;

  @media (max-width: 1750px) {
    padding: 85px 32px;
    height: 100%;
  }

  @media (max-width: 400px) {
    padding: 85px 8px;
    height: 100%;
  }
`;

export const SliderImageContainer = styled.div`
  h2 {
    margin-bottom: 20px;
    color: #fff;
  }
`;

export const SelectedServiceContainer = styled.div`
  h2 {
    margin: 20px 0;
    color: #fff;
  }
`;

export const BarberSelectedConatainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
