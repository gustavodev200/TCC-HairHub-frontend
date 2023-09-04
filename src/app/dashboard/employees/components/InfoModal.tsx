import { Employee } from "@/@types/employee";
import { AssignmentType } from "@/@types/role";
import { TagColor } from "@/components/Tag";
import { formatCEP } from "@/helpers/utils/formatCep";
import { formatCpf } from "@/helpers/utils/formatCpf";
import { formatPhoneNumber } from "@/helpers/utils/formatPhoneNumber";
import { getDayFromNumber } from "@/helpers/utils/getDayFromNumber";
import { Modal } from "antd";
import dayjs from "dayjs";
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
      footer={null}
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
                {employeeInfo.role === AssignmentType.EMPLOYEE && (
                  <TagColor tag="Barbeiro" color="green" />
                )}

                {employeeInfo.role === AssignmentType.ADMIN && (
                  <TagColor tag="Proprietário" color="blue" />
                )}

                {employeeInfo.role === AssignmentType.ATTENDANT && (
                  <TagColor tag="Atendente" color="red" />
                )}
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
              {employeeInfo.shifts.length > 0 && (
                <AddressContainer>
                  <h4>Expedientes:</h4>

                  {employeeInfo.shifts.map((shift, index) => (
                    <AddressGap key={shift.id}>
                      <strong>Turno {index + 1}: </strong>
                      <span>
                        {dayjs(shift.start_time).format("HH:mm")} às
                        <span>
                          {" "}
                          {dayjs(shift.end_time).format("HH:mm")} Horas
                        </span>
                      </span>

                      <AvailableDaysGap>
                        <strong>Dias disponíveis: </strong>
                        <span>
                          {shift.available_days.map((day, index) => (
                            <>
                              <AvailableDaysContent key={index}>
                                {getDayFromNumber(day)}
                              </AvailableDaysContent>
                            </>
                          ))}
                        </span>
                      </AvailableDaysGap>
                    </AddressGap>
                  ))}
                </AddressContainer>
              )}
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

const AvailableDaysGap = styled.div`
  margin-top: 8px;
`;

const AvailableDaysContent = styled.span`
  margin-right: 8px;
  background-color: #669cff;
  border-radius: 4px;
  padding: 2px 5px;
  color: #fff;
`;
