import { Tag } from "antd";

export function renameStatusInTable(value: string) {
  if (value === "scheduled") {
    return <Tag color="purple">AGENDADO</Tag>;
  } else if (value === "confirmed") {
    return <Tag color="blue">CONFIRMADO</Tag>;
  } else if (value === "awaiting_service") {
    return <Tag color="orange">AGUARD. ATENDIMENTO</Tag>;
  } else if (value === "attend") {
    return <Tag color="cyan">EM ATENDIMENTO</Tag>;
  } else if (value === "finished") {
    return <Tag color="green">FINALIZADO</Tag>;
  } else {
    return <Tag color="red">CANCELADO</Tag>;
  }
}
