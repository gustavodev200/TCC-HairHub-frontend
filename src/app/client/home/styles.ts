import { Spin } from "antd";
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

export const Title = styled.h2`
  color: #fff;
  font-size: 24px;
  margin: 20px 0;
`;

export const SliderImageContainer = styled.div`
  h2 {
    margin-bottom: 20px;
    color: #fff;
  }
`;

export const SelectedServiceContainer = styled.div`
  width: 100%;
  h2 {
    margin: 20px 0;
    color: #fff;
  }
`;

export const BarberSelectedConatainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 10px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background: #242731;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9a9ea3;
    border-radius: 20px;
    cursor: pointer;
  }
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

export const SpinColor = styled(Spin)`
  .ant-spin-dot-item {
    background-color: #ccc !important;
  }
`;
