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

  @media (max-width: 568px) {
    padding: 85px 8px;
    height: 100%;
  }
`;

export const Content = styled.div`
  h2 {
    color: #fff;
    margin-bottom: 20px;
  }
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 24px;
  margin: 20px 0;
`;

export const MySchedulesConatainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1500px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
