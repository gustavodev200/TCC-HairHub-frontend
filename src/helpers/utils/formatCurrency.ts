export function formatCurrency(numero: number): string {
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
