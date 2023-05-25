import { GenericStatus } from "@/@types/genericStatus";
import { Button } from "antd";
import styled from "styled-components";

interface StatusButtonProps {
  bgColor: string;
  changeStatus: () => void;
  currentStatus: GenericStatus;
}

export const StatusButton: React.FC<StatusButtonProps> = ({
  changeStatus,
  bgColor,
  currentStatus,
}) => {
  return (
    <StatusButtonWrapper
      backgroundcolor={bgColor}
      type="primary"
      onClick={changeStatus}
    >
      {currentStatus === "active" ? "Inativar" : "Ativar"}
    </StatusButtonWrapper>
  );
};

const StatusButtonWrapper = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;
