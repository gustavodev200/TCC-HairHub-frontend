import { ReactNode } from "react";
import styled from "styled-components";

export const LoginComponent = ({ children }: { children: ReactNode }) => {
  return (
    <LoginWrapper>
      <ContainerPage>
        <ContainerForm>{children}</ContainerForm>
        <ContainerBanner>
          <ImageWrapper
            src="/images/banner-login.png"
            alt="Banner Login User"
          />
        </ContainerBanner>
      </ContainerPage>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #0d0e12;
`;

const ContainerPage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerBanner = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  height: 90vh;
  border-radius: 20px;
  margin: 32px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));

  @media (max-width: 764px) {
    display: none;
  }
`;

const ContainerForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  height: 90vh;
  border-radius: 20px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
  margin: 32px;

  @media (max-width: 764px) {
    width: 90%;
    padding: 0;
  }
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: auto;
  background-color: #fff;
  border-radius: 20px;
`;
