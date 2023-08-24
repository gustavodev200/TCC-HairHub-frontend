import { Button, Form, Input } from "antd";
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

export const ProfileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 24px;
  margin: 20px 0;
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  background-color: #c1820b;
  margin-top: 50px;
`;

export const FormConatainer = styled(Form)`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #181a21;
  border-radius: 20px;
  padding: 50px 20px;

  label {
    color: #fff !important;
  }
`;

export const InputContent = styled(Input.Password)`
  width: 100% !important;
`;
