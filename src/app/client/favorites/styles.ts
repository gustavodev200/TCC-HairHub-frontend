import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 85px 100px;
  z-index: 0;

  @media (max-width: 1750px) {
    padding: 85px 32px;
    height: 100vh;
  }

  @media (max-width: 400px) {
    padding: 85px 8px;
    height: 100vh;
  }
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 24px;
  margin: 20px 0;
`;

export const Content = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
