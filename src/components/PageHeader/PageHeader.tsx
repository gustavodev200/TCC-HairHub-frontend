"use client";

import styled from "styled-components";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Select, Button } from "antd";
import { useCallback, useState } from "react";
import { GenericStatus } from "@/@types/genericStatus";
import debounce from "lodash.debounce";

interface PageHeaderProps {
  pageTitle: string;
  statusFilter: GenericStatus | "all";
  onChangeStatusFilter: (status: GenericStatus | "all") => void;
  onChangeSearch: (search: string) => void;
  handleOpenModal: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  statusFilter,
  onChangeStatusFilter,
  onChangeSearch,
  handleOpenModal,
}) => {
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value === "" || value.length >= 3) {
        onChangeSearch(value);
      }
    }, 500),
    []
  );
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderTitle>
        <h3>{pageTitle}</h3>
      </HeaderTitle>

      <HeaderActions>
        <Input
          size="large"
          placeholder="Pesquisar serviços"
          prefix={<SearchOutlined />}
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        <SelectWrapper>
          <SelectContainer
            size="large"
            defaultValue="todos"
            value={statusFilter}
            onChange={(value) => onChangeStatusFilter(value as GenericStatus)}
            options={[
              { value: "all", label: "Todos" },
              { value: GenericStatus.active, label: "Ativos" },
              { value: GenericStatus.inactive, label: "Inativos" },
            ]}
          />
        </SelectWrapper>

        <ButtonWrapper>
          <ButtonContainer
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => handleOpenModal()}
          />
        </ButtonWrapper>
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

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    h3 {
      margin-bottom: 1rem;
    }
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

  @media (max-width: 568px) {
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const SelectContainer = styled(Select)`
  width: 8rem;
  margin: 0 1.5rem;

  @media (max-width: 568px) {
    width: 100%;
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const SelectWrapper = styled.div`
  @media (max-width: 568px) {
    width: 100%;
  }
`;

const ButtonContainer = styled(Button)`
  background-color: #6cb66f;

  @media (max-width: 568px) {
    min-width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  @media (max-width: 568px) {
    width: 100%;
  }
`;
