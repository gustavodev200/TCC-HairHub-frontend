"use client";

import styled from "styled-components";
import { Input, Select, Button, DatePicker, Space } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
const { RangePicker } = DatePicker;

interface PageHeaderProps {
  pageTitle: string;
  handleDateChange: (dates: any, dateStrings: [string, string]) => void;
  selectedDates: Dayjs[];
}

export const PageHeaderDashboard: React.FC<PageHeaderProps> = ({
  pageTitle,
  handleDateChange,
  selectedDates,
}) => {
  return (
    <HeaderContainer>
      <HeaderTitle>
        <h3>{pageTitle}</h3>
      </HeaderTitle>

      <HeaderActions>
        <RangePicker
          size="large"
          format="DD/MM/YYYY"
          onChange={handleDateChange}
          disabledDate={(day) => dayjs(day).isAfter(dayjs())}
          defaultValue={[selectedDates[0], selectedDates[1]]}
        />

        <Space>
          <ButtonDownloadPDF size="large" type="primary">
            <FilePdfOutlined size={30} />
          </ButtonDownloadPDF>
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
