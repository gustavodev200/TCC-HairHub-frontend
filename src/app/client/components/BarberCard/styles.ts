import { Button } from "antd";
import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 30%;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #242731;

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
  color: #ccc;
`;

export const ButtonContainer = styled.div`
  display: flex;
  height: auto;
`;

export const ButtonContent = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #242731;
  font-size: 32px;
  font-weight: bold;
  border: none;
  color: #ccc;

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

export const NoteWrapper = styled.span`
  font-size: 12px;
  color: #ccc;
`;
