export interface FormData {
  fullName: string;
  cpf: string;
  cnpj?: string;
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
  // Documentos
  documentType: string;
  documentFront: File | null;
  documentBack: File | null;
  selfie: File | null;
  residenceProof: File | null;
}

export interface FormErrors {
  fullName?: string;
  cpf?: string;
  cnpj?: string;
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
  // Documentos
  documentType?: string;
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
  residenceProof?: string;
  // Consentimento
  consent?: string;
}
