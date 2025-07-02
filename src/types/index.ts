export interface FormData {
  fullName: string;
  cpf: string;
  cnpj?: string;
  rg: string;
  email: string;
  phone: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  // Dados bancários
  bankName: string;
  accountType: string;
  agency: string;
  account: string;
  pixKey?: string;
}

export interface FormErrors {
  fullName?: string;
  cpf?: string;
  cnpj?: string;
  rg?: string;
  email?: string;
  phone?: string;
  cep?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
  // Dados bancários
  bankName?: string;
  accountType?: string;
  agency?: string;
  account?: string;
  pixKey?: string;
}
