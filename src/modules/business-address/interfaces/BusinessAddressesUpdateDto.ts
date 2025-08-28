export interface BusinessAddressesUpdateDto {
  id?: string;
  name: string;
  city: string;
  state: string;
  number: string;
  address: string;
  country: string;
  zip_code: string;
  complement: string;
  neighborhood: string;
}

export interface BusinessAddressesUpdateManyDto {
  business_code: string;
  addresses: BusinessAddressesUpdateDto[];
}
