export interface BusinessesResponseDto {
  id: string;
  code: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  disabled: boolean;
  name: string;
  responsible: string | null;
  email: string | null;
  phone: string | null;
  cnpj: string | null;
  notes: string | null;
}
