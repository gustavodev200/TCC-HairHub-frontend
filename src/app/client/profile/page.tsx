"use client";

import * as C from "./styles";
import { Upload, Form, Input } from "antd";
import {
  MailOutlined,
  LockOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { ErrorMessages } from "@/@types/messages";
import { useState } from "react";

export default function Profile() {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined color="#fff" />
      ) : (
        <PlusOutlined color="#fff" />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <C.Container>
      <C.Title>Meu Perfil</C.Title>
      <C.ProfileContainer>
        <C.FormConatainer
          name="basic"
          layout="vertical"
          // onFinish={onFinish}
          // disabled={isLoading}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label="Imagem perfil"
            name="name"
            rules={[{ required: true, message: ErrorMessages.MSGE01 }]}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"

              // beforeUpload={beforeUpload}
              // onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: ErrorMessages.MSGE01 }]}
          >
            <Input
              placeholder="Nome"
              prefix={<MailOutlined style={{ color: "#9a9a9a" }} />}
            />
          </Form.Item>

          <Form.Item
            label="Telefone"
            name="phone"
            rules={[{ required: true, message: ErrorMessages.MSGE01 }]}
          >
            <C.InputContent
              placeholder="Telephone"
              prefix={<LockOutlined style={{ color: "#9a9a9a" }} />}
            />
          </Form.Item>

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

          <Form.Item>
            <C.ButtonSubmit type="primary" htmlType="submit">
              ENTRAR
            </C.ButtonSubmit>
          </Form.Item>
        </C.FormConatainer>
      </C.ProfileContainer>
    </C.Container>
  );
}
