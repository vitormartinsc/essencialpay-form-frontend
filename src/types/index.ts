export interface FormData {
  // TODO: Reativar quando necessário - informações pessoais básicas
  fullName: string;
  cpf: string;
  cnpj?: string;
  email: string;
  phone: string;
  // TODO: Reativar quando necessário - informações de endereço
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
  // Dados bancários - ATIVOS
  bankName: string;
  accountType: string;
  agency: string;
  account: string;
  // Documentos - ATIVOS
  documentType: string;
  documentFront: File | null;
  documentBack: File | null;
  selfie: File | null;
  residenceProof: File | null;
}

export interface FormErrors {
  // TODO: Reativar quando necessário - informações pessoais básicas
  fullName?: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
  // TODO: Reativar quando necessário - informações de endereço
  cep?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
  // Dados bancários - ATIVOS
  bankName?: string;
  accountType?: string;
  agency?: string;
  account?: string;
  // Documentos - ATIVOS
  documentType?: string;
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
  residenceProof?: string;
  // Consentimento
  consent?: string;
}
