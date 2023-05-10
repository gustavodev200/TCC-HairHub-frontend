export function formatCEP(cep: string, useMask: boolean = true): string {
  const cleanedCEP = cep.replace(/\D+/g, "");

  if (cleanedCEP.length !== 8) {
    throw new Error("CEP inválido");
  }

  if (useMask) {
    return cleanedCEP.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  } else {
    return cleanedCEP;
  }
}
