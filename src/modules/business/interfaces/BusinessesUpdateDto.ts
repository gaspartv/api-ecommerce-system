export interface BusinessesUpdateDto {
  id: string;
  name?: string;
  deleted?: boolean;
  disabled?: boolean;
  responsible?: string;
  email?: string;
  phone?: string;
  cnpj?: string;
  notes?: string;
}
