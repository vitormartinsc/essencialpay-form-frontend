import type { FormErrors } from '../types';

export const getErrorMessages = (errors: FormErrors): string[] => {
  const messages: string[] = [];
  
  if (errors.fullName) messages.push('• Nome completo é obrigatório');
  if (errors.cpf) messages.push('• CPF inválido ou não preenchido');
  if (errors.cnpj) messages.push('• CNPJ inválido');
  if (errors.email) messages.push('• Email inválido ou não preenchido');
  if (errors.phone) messages.push('• Telefone inválido ou não preenchido');
  if (errors.cep) messages.push('• CEP inválido ou não preenchido');
  if (errors.state) messages.push('• Estado é obrigatório');
  if (errors.city) messages.push('• Cidade é obrigatória');
  if (errors.neighborhood) messages.push('• Bairro é obrigatório');
  if (errors.street) messages.push('• Rua é obrigatória');
  if (errors.number) messages.push('• Número é obrigatório');
  if (errors.bankName) messages.push('• Nome do banco é obrigatório');
  if (errors.accountType) messages.push('• Tipo de conta é obrigatório');
  if (errors.agency) messages.push('• Agência é obrigatória');
  if (errors.account) messages.push('• Conta bancária inválida ou não preenchida');
  if (errors.documentFront) messages.push('• Documento obrigatório não enviado');
  if (errors.documentBack) messages.push('• Verso do documento obrigatório não enviado');
  if (errors.selfie) messages.push('• Selfie obrigatória não enviada');
  if (errors.residenceProof) messages.push('• Comprovante de residência obrigatório');
  
  return messages;
};

// Função utilitária para validar imagem
export const isValidImage = (file: File) => {
  if (!file) return false;
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  return validTypes.includes(file.type);
};
