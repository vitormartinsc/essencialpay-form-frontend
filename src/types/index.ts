export interface FormData {
  // Informações de contato - OBRIGATÓRIAS
  fullName: string; // Obrigatório
  phone: string; // Obrigatório
  // TODO: Reativar quando necessário - informações pessoais básicas
  cpf: string;
  cnpj?: string;
  email: string;
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
  // Informações de contato - OBRIGATÓRIAS
  fullName?: string;
  phone?: string;
  // TODO: Reativar quando necessário - informações pessoais básicas
  cpf?: string;
  cnpj?: string;
  email?: string;
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
