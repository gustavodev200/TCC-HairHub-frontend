export interface ConsumptionInputDTO {
  products_consumption: string[];
  total_amount: number;
  payment_type: string;
}

export interface ConsumptionOutputDTO extends ConsumptionInputDTO {
  id: string;
  services_consumption: string[];
  created_at: Date;
  updated_at: Date;
}
