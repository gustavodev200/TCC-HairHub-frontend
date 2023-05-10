export interface AddressInputDTO {
  cep: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number?: string;
}

export interface AddressDTO extends AddressInputDTO {
  id?: string;
}
