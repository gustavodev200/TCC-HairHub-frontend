"use client";

import styled from "styled-components";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Select, Button } from "antd";
import { useCallback, useState } from "react";
import { ModalService } from "../ModalService";
import { GenericStatus } from "@/@types/genericStatus";
import debounce from "lodash.debounce";

interface PageHeaderProps {
  statusFilter: GenericStatus | "all";
  onChangeStatusFilter: (status: GenericStatus | "all") => void;
  onChangeSearch: (search: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  statusFilter,
  onChangeStatusFilter,
  onChangeSearch,
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
    console.log("Clicked cancel button");
    setOpen(false);
  };

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
          onChange={(e) => debouncedSearch(e.target.value)}
        />

        <div>
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
        </div>

        <div>
          <ButtonContainer
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={showModal}
          />
          <ModalService
            open={open}
            handleCancel={handleCancel}
            title="ADICIONAR SERVIÇO"
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
