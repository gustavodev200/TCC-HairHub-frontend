import { Client } from "@/@types/client";
import { Employee } from "@/@types/employee";
import { AssignmentType } from "@/@types/role";
import { TagColor } from "@/components/Tag";
import { formatCEP } from "@/helpers/utils/formatCep";
import { formatCpf } from "@/helpers/utils/formatCpf";
import { formatPhoneNumber } from "@/helpers/utils/formatPhoneNumber";
import { Modal } from "antd";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  clientInfo?: Client;
}

export const InfoModal = ({ open, onClose, clientInfo }: ModalProps) => {
  return (
    <Modal
      centered
      title="DADOS DO CLIENTE"
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
    >
      <div>
        {clientInfo ? (
          <div>
            <AddressGap key={clientInfo.id}>
              <AddressGap>
                <strong>Nome:</strong> <span> {clientInfo.name}</span>
              </AddressGap>
              <AddressGap>
                <strong>Email:</strong> <span> {clientInfo.email}</span>
              </AddressGap>
              <AddressGap>
                <strong>CPF:</strong> <span> {formatCpf(clientInfo.cpf)}</span>
              </AddressGap>
              <AddressGap>
                <strong>Telefone:</strong>
                <span> {formatPhoneNumber(clientInfo.phone)}</span>
              </AddressGap>
              <AddressGap>
                <strong>Data/Nascimento:</strong>
                <span> {clientInfo.dataNasc}</span>
              </AddressGap>
              <AddressGap>
                <strong>Atribuição: </strong>
                {clientInfo.role === AssignmentType.EMPLOYEE && (
                  <TagColor tag="Barbeiro" color="green" />
                )}

                {clientInfo.role === AssignmentType.ADMIN && (
                  <TagColor tag="Administrador(a)" color="blue" />
                )}

                {clientInfo.role === AssignmentType.ATTENDANT && (
                  <TagColor tag="Atendente" color="red" />
                )}

                {clientInfo.role === AssignmentType.CLIENT && (
                  <TagColor tag="Cliente" color="purple" />
                )}
              </AddressGap>
              <AddressContainer>
                <h4>Endereço:</h4>

                <AddressGap>
                  <strong>Cep:</strong>
                  <span> {formatCEP(clientInfo.address.cep)}</span>
                </AddressGap>
                <AddressGap>
                  <strong>Cidade: </strong>
                  <span>
                    {clientInfo.address.city} - <strong>UF: </strong>
                    {clientInfo.address.state}
                  </span>
                </AddressGap>
                <AddressGap>
                  <strong>Bairro: </strong>
                  <span>
                    {clientInfo.address.district} - <strong>Rua: </strong>
                    {clientInfo.address.street} - <strong>N°: </strong>
                    {clientInfo.address.number}
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
