import { GenericStatus } from "@/@types/genericStatus";
import { Button } from "antd";
import styled from "styled-components";

interface StatusButtonProps {
  status: GenericStatus;
  id: string;
  changeStatus: any;
}

export const StatusButton: React.FC<StatusButtonProps> = ({
  changeStatus,
  id,
  status,
}) => {
  return (
    <StatusButtonWrapper
      backgroundcolor={status === "active" ? "#F05761" : "#6CB66F"}
      type="primary"
      onClick={() =>
        changeStatus.mutate({
          id,
          status: status === "active" ? "inactive" : "active",
        })
      }
    >
      {status === "active" ? "Inativar" : "Ativar"}
    </StatusButtonWrapper>
  );
};

const StatusButtonWrapper = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;
