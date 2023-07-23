import { Button } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 30%;
  background-color: ${({ backgroudSelected }) => backgroudSelected};
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ backgroudSelectedHover }) => backgroudSelectedHover};
    color: ${({ BarberSelectedColorHover }) => BarberSelectedColorHover};
  }

  @media (max-width: 400px) {
    padding: 10px;
  }

  @media (max-width: 1180px) {
    min-width: 100%;
  }
`;

export const ContainerOne = styled.div`
  display: flex;
`;

export const ImageContent = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;
export const InfoServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h4 {
    font-size: 18px;
  }

  @media (max-width: 400px) {
    h4 {
      font-size: 14px;
    }

    span:nth-child(3) {
      font-size: 12px;
    }
  }
`;
export const BarberName = styled.h4`
  color: ${({ BarberSelectedColor }) =>
    BarberSelectedColor ? "#fff" : "#16171b"};
`;

export const ButtonContainer = styled.div`
  display: flex;
  height: auto;
`;

export const ButtonContent = styled(Button)`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${({ BarberSelectedColor }) =>
    BarberSelectedColor === "#16171b" ? "#fff" : "#16171b"};
  font-size: 32px;
  font-weight: bold;
  border: none;

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

export const NoteWrapper = styled.span`
  color: ${({ BarberSelectedColor }) =>
    BarberSelectedColor === "#fff" ? "#fff" : "#16171b"};
  font-size: 12px;
`;
