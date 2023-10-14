"use client";

import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { LoginComponent } from "@/components/LoginComponent";
import styled from "styled-components";
import { ErrorMessages } from "@/@types/messages";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { setCookie } from "cookies-next";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPageContent() {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onFinish = (values: FormValues) => {
    setIsLoading(true);

    const { email, password } = values;

    authService
      .login(email, password)
      .then((token) => {
        setCookie("@hairhub", token, {
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
          secure: true,
        });
        push("/dashboard");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <LoginComponent>
      <FormConatainer
        name="basic"
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish as unknown as (values: unknown) => void}
        disabled={isLoading}
        autoComplete="off"
        size="large"
      >
        <Title>
          <h2>ENTRAR</h2>
        </Title>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: ErrorMessages.MSGE01 }]}
        >
          <Input
            placeholder="E-mail"
            prefix={<MailOutlined style={{ color: "#9a9a9a" }} />}
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[
            { required: true, message: ErrorMessages.MSGE01 },
            { type: "string", min: 8, message: ErrorMessages.MSGE08 },
            { type: "string", max: 16, message: ErrorMessages.MSGE09 },
          ]}
        >
          <InputContent
            placeholder="Sua senha"
            prefix={<LockOutlined style={{ color: "#9a9a9a" }} />}
          />
          {/* <Link style={{ color: "#fff " }} href="/dashboard">
            Esqueci minha senha?
          </Link> */}
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Lembrar-me?</Checkbox>
        </Form.Item> */}

        <Form.Item>
          <ButtonSubmit type="primary" htmlType="submit" loading={isLoading}>
            ENTRAR
          </ButtonSubmit>
        </Form.Item>
      </FormConatainer>
    </LoginComponent>
  );
}

const ButtonSubmit = styled(Button)`
  width: 100%;
  background-color: #c1820b;
`;

const FormConatainer = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    color: #fff !important;
  }
`;

const InputContent = styled(Input.Password)`
  width: 100% !important;
`;

const Title = styled.div`
  h2 {
    font-size: 35px;
    font-weight: bold;
    color: #fff;
  }
`;
