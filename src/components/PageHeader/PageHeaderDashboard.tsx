"use client";

import styled from "styled-components";
import { Input, Select, Button, DatePicker, Space } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { ComponentPrinter } from "../ComponentsDashboad";
import { ReportsDTO } from "@/@types/reports";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "@tanstack/react-query";
import { employeeService } from "@/services/employee";
import { EmployeeOutputWithSchedulesDTO } from "@/@types/employee";
import { Token } from "@/@types/token";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
const { RangePicker } = DatePicker;

interface PageHeaderProps {
  pageTitle: string;
  handleDateChange: (dates: any, dateStrings: [string, string]) => void;
  selectedDates: Dayjs[];
  data: ReportsDTO;
  setSelectedBarberId: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedBarberId: string;
}

export const PageHeaderDashboard: React.FC<PageHeaderProps> = ({
  pageTitle,
  handleDateChange,
  selectedDates,
  data,
  setSelectedBarberId,
  selectedBarberId,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<Token>();

  const accessToken = getCookie("@hairhub");

  useEffect(() => {
    if (accessToken) {
      const decodedToken: Token = jwtDecode(accessToken as string);
      setUser(decodedToken);
    }
  }, [accessToken]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { data: dataEmployees, isLoading } = useQuery(["employees"], {
    queryFn: () => employeeService.getAllBarbers(),
  });

  const selectedBarber = dataEmployees?.find(
    (barber) => barber.id === selectedBarberId
  );

  function handleSelectChange(value: string): void {
    setSelectedBarberId(value);
  }

  return (
    <HeaderContainer>
      <HeaderTitle>
        <h3>{pageTitle}</h3>
      </HeaderTitle>

      <HeaderActions>
        {user?.role === "admin" ? (
          <Space>
            <Select
              style={{ marginRight: "1rem", width: "15rem" }}
              size="large"
              allowClear={true}
              placeholder="Selecione um barbeiro"
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => handleSelectChange(value as string)}
              options={dataEmployees?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Space>
        ) : null}

        <RangePicker
          size="large"
          format="DD/MM/YYYY"
          onChange={handleDateChange}
          disabledDate={(day) => dayjs(day).isAfter(dayjs())}
          defaultValue={[selectedDates[0], selectedDates[1]]}
        />

        <Space>
          <ButtonDownloadPDF size="large" type="primary" onClick={handlePrint}>
            <FilePdfOutlined size={30} />
          </ButtonDownloadPDF>
          <ComponentPrinter
            data={data}
            selectedDates={selectedDates}
            ref={componentRef}
            selectedBarberName={
              selectedBarber as EmployeeOutputWithSchedulesDTO
            }
          />
        </Space>
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

const ButtonDownloadPDF = styled(Button)`
  background-color: #771a2f;
  margin-left: 1.5rem;

  span {
    font-size: 1.2rem;
  }
`;

const ButtonWrapper = styled.div`
  @media (max-width: 568px) {
    width: 100%;
  }
`;
