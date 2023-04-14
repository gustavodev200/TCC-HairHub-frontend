"use client";

import styled from "styled-components";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Select, Button } from "antd";

export const PageHeader = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <h3>Serviços</h3>
      </HeaderTitle>

      <HeaderActions>
        <Input
          size="large"
          placeholder="Pesquisar serviços"
          prefix={<SearchOutlined />}
        />

        <div>
          <SelectContainer
            size="large"
            defaultValue="todos"
            options={[
              { value: "todos", label: "Todos" },
              { value: "active", label: "Ativos" },
              { value: "inactive", label: "Inativos" },
            ]}
          />
        </div>

        <div>
          <ButtonContainer
            type="primary"
            icon={<PlusOutlined />}
            size="large"
          />
        </div>
      </HeaderActions>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3.5rem;

  h3 {
    color: #16171b;
    font-size: 2rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    ::placeholder {
      font-size: 0.9rem;
    }
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const SelectContainer = styled(Select)`
  width: 8rem;
  margin: 0 1.5rem;
`;

const ButtonContainer = styled(Button)`
  background-color: #6cb66f;
`;
