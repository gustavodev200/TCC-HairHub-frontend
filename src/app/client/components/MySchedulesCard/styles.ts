import { Button } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30%;
  background-color: #0d0e12;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;

  @media (max-width: 1180px) {
    min-width: 100%;
  }

  @media (max-width: 568px) {
    padding: 10px;
  }
`;

export const ContentOneCard = styled.div`
  display: flex;
  background-color: #242731;
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 450px) {
    padding: 5px;
    flex-direction: column;
    gap: 10px;
  }
`;

export const ImageContent = styled.div`
  display: flex;
  align-items: center;
`;

export const InfoNameBarber = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  span {
    color: #c1820b;
    font-weight: bold;
    font-size: 12px;
  }

  h5 {
    color: #fff;
    font-size: 18px;
  }

  @media (max-width: 568px) {
    span {
      font-size: 10px;
    }

    h5 {
      color: #fff;
      font-size: 14px;
    }
  }

  @media (max-width: 320px) {
    span {
      font-size: 12px;
    }

    h5 {
      color: #fff;
      font-size: 18px;
    }
  }
`;

export const ScheduledContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;

  @media (max-width: 568px) {
    gap: 5px;
  }
`;

export const ScheduledContentDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0d0e12;
  padding: 10px 20px;
  border-radius: 10px;

  span:nth-child(1) {
    color: #c1820b;
    font-weight: bold;
    font-size: 12px;
  }

  span:nth-child(2) {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  @media (max-width: 568px) {
    span:nth-child(1) {
      font-size: 10px;
    }

    span:nth-child(2) {
      font-size: 14px;
    }
  }
`;

export const ScheduledContentHours = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0d0e12;
  padding: 10px 20px;
  border-radius: 10px;

  span:nth-child(1) {
    color: #c1820b;
    font-weight: bold;
    font-size: 12px;
  }

  span:nth-child(2) {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }

  @media (max-width: 568px) {
    span:nth-child(1) {
      font-size: 10px;
    }

    span:nth-child(2) {
      font-size: 14px;
    }
  }
`;

export const ContentTwoCard = styled.div`
  display: flex;
  background-color: #242731;
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ScheduledContentService = styled.div`
  span:nth-child(1) {
    color: #c1820b;
    font-weight: bold;
    font-size: 12px;
  }

  h6 {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }

  @media (max-width: 568px) {
    span:nth-child(1) {
      font-size: 10px;
    }

    h6 {
      font-size: 14px;
    }
  }
`;
export const ScheduledContentCurrency = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #0d0e12;
  padding: 10px 30px;
  border-radius: 10px;

  span:nth-child(1) {
    color: #c1820b;
    font-weight: bold;
    font-size: 12px;
  }

  span:nth-child(2) {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const ButtonContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const ButtonStyle = styled(Button)`
  display: flex;
  font-weight: bold;
  font-size: 16px;
  align-items: center;
  background-color: #c1820b;
  padding: 20px 30px;

  @media (max-width: 568px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;
