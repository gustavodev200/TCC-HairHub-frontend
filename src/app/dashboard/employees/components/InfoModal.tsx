import { Employee } from "@/@types/employee";
import { TagColor } from "@/components/Tag";
import { formatCEP } from "@/helpers/utils/formatCep";
import { formatCpf } from "@/helpers/utils/formatCpf";
import { formatPhoneNumber } from "@/helpers/utils/formatPhoneNumber";
import { Modal } from "antd";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  employeeInfo?: Employee;
}

export const InfoModal = ({ open, onClose, employeeInfo }: ModalProps) => {
  return (
    <Modal
      centered
      title="DADOS DO COLABORADOR"
      open={open}
      onOk={onClose}
      onCancel={onClose}
    >
      <div>
        {employeeInfo ? (
          <div>
            <AddressGap key={employeeInfo.id}>
              <AddressGap>
                <strong>Nome:</strong> <span> {employeeInfo.name}</span>
              </AddressGap>
              <AddressGap>
                <strong>Email:</strong> <span> {employeeInfo.email}</span>
              </AddressGap>
              <AddressGap>
                <strong>CPF:</strong>{" "}
                <span> {formatCpf(employeeInfo.cpf)}</span>
              </AddressGap>
              <AddressGap>
                <strong>Telefone:</strong>
                <span> {formatPhoneNumber(employeeInfo.phone)}</span>
              </AddressGap>
              <AddressGap>
                <strong>Data/Nascimento:</strong>
                <span> {employeeInfo.dataNasc}</span>
              </AddressGap>
              <AddressGap>
                <strong>Atribuição: </strong>

                <TagColor
                  tag={
                    employeeInfo.role === "employee"
                      ? "Colaborador"
                      : employeeInfo.role
                  }
                  color="blue"
                />
              </AddressGap>
              <AddressContainer>
                <h4>Endereço:</h4>

                <AddressGap>
                  <strong>Cep:</strong>
                  <span> {formatCEP(employeeInfo.address.cep)}</span>
                </AddressGap>
                <AddressGap>
                  <strong>Cidade: </strong>
                  <span>
                    {employeeInfo.address.city} - <strong>UF: </strong>
                    {employeeInfo.address.state}
                  </span>
                </AddressGap>
                <AddressGap>
                  <strong>Bairro: </strong>
                  <span>
                    {employeeInfo.address.district} - <strong>Rua: </strong>
                    {employeeInfo.address.street} - <strong>N°: </strong>
                    {employeeInfo.address.number}
                  </span>
                </AddressGap>
              </AddressContainer>
            </AddressGap>
          </div>
        ) : (
          <p>Carregando informações...</p>
        )}
      </div>
    </Modal>
  );
};

const AddressContainer = styled.div`
  margin-top: 20px;
`;

const AddressGap = styled.div`
  margin-top: 8px;
`;
