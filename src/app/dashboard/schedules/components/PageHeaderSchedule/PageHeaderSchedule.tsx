"use client";

import styled from "styled-components";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Select, Button } from "antd";
import { useCallback, useState } from "react";
import { GenericStatus } from "@/@types/genericStatus";
import debounce from "lodash.debounce";
import { DatePicker, Space } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface PageHeaderProps {
  pageTitle: string;
  statusFilter: GenericStatus | "all";
  onChangeStatusFilter: (status: GenericStatus | "all") => void;
  onChangeSearch: (search: string) => void;
  handleOpenModal: () => void;
}

const onRangeChange = (
  dates: null | (Dayjs | null)[],
  dateStrings: string[]
) => {
  if (dates) {
    console.log("De: ", dates[0], ", Para: ", dates[1]);
    console.log("De: ", dateStrings[0], ", Para: ", dateStrings[1]);
  } else {
    console.log("Limpar");
  }
};

const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

export const PageHeaderSchedule: React.FC<PageHeaderProps> = ({
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

  const { RangePicker } = DatePicker;

  const onChange = (value: Dayjs | null, dateString: string) => {
    if (value) {
      console.log("Date: ", value);
    } else {
      console.log("Clear");
    }
  };

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
        <Space direction="vertical" size={12}>
          <DatePicker onChange={onChange} format="DD/MM/YYYY" size="large" />
        </Space>

        <div>
          <SelectContainer
            size="large"
            defaultValue="Selecione um barbeiro"
            value={1}
            onChange={(value) => onChangeStatusFilter(value as GenericStatus)}
            options={[
              { value: 1, label: "Carlin Corte" },
              { value: 2, label: "Gustavo Cardoso" },
              { value: 3, label: "Josiel" },
            ]}
          />
        </div>

        <div>
          <ButtonContainer
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => handleOpenModal()}
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
  width: 15rem;
  margin: 0 1.5rem;
`;

const ButtonContainer = styled(Button)`
  background-color: #6cb66f;
`;
