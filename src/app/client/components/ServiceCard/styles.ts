import { Button } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #242731;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;

  @media (max-width: 400px) {
    padding: 10px;
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
    color: #fff;
    font-size: 18px;
  }

  span:nth-child(2) {
    color: #9a9ea3;
    font-size: 12px;
  }

  span:nth-child(3) {
    color: #c1820b;
    font-size: 16px;
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

export const ButtonContainer = styled.div`
  display: flex;
  height: auto;
`;

export const ButtonContent = styled(Button)`
  background-color: #fff;
  color: #16171b;
  font-size: 14px;
  font-weight: bold;
  border: none;

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;
