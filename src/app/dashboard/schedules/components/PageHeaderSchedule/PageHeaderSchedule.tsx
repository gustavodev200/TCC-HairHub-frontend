"use client";

import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { Select, Button } from "antd";
import { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import type { Dayjs } from "dayjs";
import { ScheduleStatus } from "@/@types/scheduleStatus";
import { disableDateByDayOfWeek } from "@/helpers/utils/disableDateByDayOfWeek";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { employeeService } from "@/services/employee";

interface PageHeaderProps {
  pageTitle: string;
  statusFilter: ScheduleStatus | "all";
  selectedDate: Dayjs | null;
  selectedBarberId: string;
  onChangeSelectedDate: (date: Dayjs | null) => void;
  onChangeSelectedBarberId: (id: string) => void;
  onChangeStatusFilter: (status: ScheduleStatus | "all") => void;
  onChangeSearch: (search: string) => void;
  handleOpenModal: () => void;
  schedules: ScheduleOutputDTO[];
}

export const PageHeaderSchedule: React.FC<PageHeaderProps> = ({
  pageTitle,
  selectedDate,
  selectedBarberId,
  onChangeSelectedDate,
  onChangeStatusFilter,
  onChangeSelectedBarberId,
  onChangeSearch,
  handleOpenModal,
}) => {
  const { data, isLoading } = useQuery(["employees", selectedBarberId], {
    queryFn: () => employeeService.getOnlyBarbers(),
  });

  const [dayOfWeek, setDayOfWeek] = useState<number[]>([]);

  const handleSelectChange = (selectedValue: string) => {
    onChangeSelectedBarberId(selectedValue);
    // Encontre o barbeiro selecionado
    const selectedBarber = data?.find((item) => item.id === selectedValue);

    // Verifique se o barbeiro foi encontrado
    if (selectedBarber) {
      // Acesse os available_days do barbeiro selecionado
      const availableDays = selectedBarber.shifts.flatMap((shift) =>
        shift.available_days.map((day) => day)
      );

      // Atualize o estado com os available_days
      setDayOfWeek(availableDays);
    } else {
      // Caso o barbeiro não seja encontrado, defina dayOfWeek como vazio

      setDayOfWeek([]);
    }
    onChangeSelectedDate(null);
  };

  const handleChangeDatePicker = (value: Dayjs | null, dateString: string) => {
    onChangeSelectedDate(value);
  };

  useEffect(() => {
    handleSelectChange(selectedBarberId);
    handleChangeDatePicker(selectedDate, selectedBarberId);
  }, [data, selectedBarberId, selectedDate]);

  return (
    <HeaderContainer>
      <HeaderTitle>
        <h3>{pageTitle}</h3>
      </HeaderTitle>

      <HeaderActions>
        <Space direction="vertical" size={12}>
          <DatePicker
            disabledDate={(current) =>
              disableDateByDayOfWeek(current, dayOfWeek, true)
            }
            onChange={handleChangeDatePicker}
            format="DD/MM/YYYY"
            size="large"
            value={selectedDate}
          />
        </Space>

        <div>
          <SelectContainer
            allowClear
            showSearch
            size="large"
            placeholder="Selecione um barbeiro"
            // defaultValue="Selecione um barbeiro"
            optionFilterProp="label"
            filterOption={(input: string, option: any) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            onChange={(value) => handleSelectChange(value as string)}
            options={data?.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
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
    align-items: flex-start;
    flex-direction: column;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const SelectContainer = styled(Select)`
  width: 15rem;
  margin: 0 1.5rem;

  @media (max-width: 568px) {
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const ButtonContainer = styled(Button)`
  background-color: #6cb66f;
`;
