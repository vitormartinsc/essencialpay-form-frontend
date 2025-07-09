import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import type { FormData, FormErrors } from '../types';
import {
  formatCpf,
  formatCnpj,
  formatPhone,
  formatCep,
  formatAgency,
  formatAccount,
  validateCpf,
  validateCnpj,
  validateEmail,
  validatePhone,
  validateCep,
  validateAccount,
} from '../utils/formatters';
import { getErrorMessages, isValidImage } from '../utils/formHelpers';
import { fieldStyles, selectFieldStyles, labelProps } from '../styles/formStyles';
import config from '../config/index';
import './EssencialForm.css';

// Importação dos componentes das etapas
import PersonalInfoStep from './FormSteps/PersonalInfoStep';
import AddressStep from './FormSteps/AddressStep';
import BankingStep from './FormSteps/BankingStep';
import DocumentsStep from './FormSteps/DocumentsStep';
import ConsentStep from './FormSteps/ConsentStep';

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    cpf: '',
    cnpj: '',
    email: '',
    phone: '',
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',
    bankName: '',
    accountType: '',
    agency: '',
    account: '',
    documentType: 'RG',
    documentFront: null,
    documentBack: null,
    selfie: null,
    residenceProof: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDocumentType = event.target.value;
    setFormData(prev => ({
      ...prev,
      documentType: newDocumentType,
      documentFront: null,
      documentBack: null,
      selfie: null,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting based on field
    switch (name) {
      case 'cpf':
        formattedValue = formatCpf(value);
        break;
      case 'cnpj':
        formattedValue = formatCnpj(value);
        break;
      case 'phone':
        formattedValue = formatPhone(value);
        break;
      case 'cep':
        formattedValue = formatCep(value);
        break;
      case 'agency':
        formattedValue = formatAgency(value);
        break;
      case 'account':
        formattedValue = formatAccount(value);
        break;
      case 'fullName':
        formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Hide validation alert when user starts fixing errors
    if (showValidationAlert) {
      setShowValidationAlert(false);
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user selects a value
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Hide validation alert when user starts fixing errors
    if (showValidationAlert) {
      setShowValidationAlert(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      
      // Para documentos, só aceita imagens
      if (name === 'documentFront' || name === 'documentBack' || name === 'selfie') {
        if (!isValidImage(file)) {
          alert('Por favor, selecione uma imagem válida (PNG, JPG, JPEG, WEBP).');
          return;
        }
      } else {
        // Para comprovante de residência, aceita PDF também
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          setErrors(prev => ({
            ...prev,
            [name]: 'Apenas arquivos PNG, JPG, JPEG, WEBP ou PDF são permitidos',
          }));
          return;
        }
      }

      // Validar tamanho do arquivo (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          [name]: 'Arquivo muito grande. Máximo 5MB.',
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        [name]: file,
      }));

      // Clear error when user selects a valid file
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }

      // Hide validation alert when user starts fixing errors
      if (showValidationAlert) {
        setShowValidationAlert(false);
      }
    }
  };

  // Função para buscar dados do CEP
  const handleCepBlur = async () => {
    const cleanCep = formData.cep.replace(/\D/g, '');
    
    if (cleanCep.length === 8) {
      setSearchingCep(true);
      try {
        const response = await fetch(`${config.apiUrl}/api/cep/${cleanCep}`);
        const data = await response.json();
        
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            state: data.data.uf || '',
            city: data.data.localidade || '',
            neighborhood: data.data.bairro || '',
            street: data.data.logradouro || '',
          }));
          
          // Limpar erros relacionados ao endereço
          setErrors(prev => ({
            ...prev,
            cep: undefined,
            state: undefined,
            city: undefined,
            neighborhood: undefined,
            street: undefined,
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            cep: 'CEP não encontrado',
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        setErrors(prev => ({
          ...prev,
          cep: 'Erro ao buscar CEP',
        }));
      } finally {
        setSearchingCep(false);
      }
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCpf(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    // CNPJ é opcional, mas se preenchido deve ser válido
    if (formData.cnpj && !validateCnpj(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!formData.cep) {
      newErrors.cep = 'CEP é obrigatório';
    } else if (!validateCep(formData.cep)) {
      newErrors.cep = 'CEP inválido';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Estado é obrigatório';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Bairro é obrigatório';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Rua é obrigatória';
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Número é obrigatório';
    }

    // Validação dos dados bancários
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Nome do banco é obrigatório';
    }

    if (!formData.accountType) {
      newErrors.accountType = 'Tipo de conta é obrigatório';
    }

    if (!formData.agency.trim()) {
      newErrors.agency = 'Agência é obrigatória';
    }

    if (!formData.account.trim()) {
      newErrors.account = 'Conta é obrigatória';
    } else if (!validateAccount(formData.account)) {
      newErrors.account = 'Conta deve ter entre 6 e 7 dígitos';
    }

    // Validação dos documentos
    if (formData.documentType === 'RG') {
      if (!formData.documentFront) {
        newErrors.documentFront = 'Obrigatório enviar a frente do RG';
      }
      if (!formData.documentBack) {
        newErrors.documentBack = 'Obrigatório enviar o verso do RG';
      }
    } else if (formData.documentType === 'CNH') {
      if (!formData.documentFront) {
        newErrors.documentFront = 'Obrigatório enviar a foto da CNH';
      }
    }

    if (!formData.residenceProof) {
      newErrors.residenceProof = 'Comprovante de residência é obrigatório';
    }

    // Validação da selfie (obrigatória para ambos os tipos de documento)
    if (!formData.selfie) {
      newErrors.selfie = 'Selfie é obrigatória';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    // Verificar se o consentimento foi aceito
    if (!consentAccepted) {
      validationErrors.consent = 'Você deve aceitar os termos de uso e política de privacidade';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowValidationAlert(true);
      // Scroll to top to show the error alert
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowValidationAlert(false);
    setLoading(true);
    try {
      // Criar FormData para enviar arquivos junto com os dados
      const formDataToSend = new FormData();
      
      // Adicionar todos os campos de texto
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('cpf', formData.cpf);
      formDataToSend.append('cnpj', formData.cnpj || '');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('cep', formData.cep);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('neighborhood', formData.neighborhood);
      formDataToSend.append('street', formData.street);
      formDataToSend.append('number', formData.number);
      formDataToSend.append('complement', formData.complement || '');
      formDataToSend.append('bankName', formData.bankName);
      formDataToSend.append('accountType', formData.accountType);
      formDataToSend.append('agency', formData.agency);
      formDataToSend.append('account', formData.account);
      formDataToSend.append('documentType', formData.documentType);
      
      // Adicionar arquivos se existirem
      if (formData.documentFront) {
        formDataToSend.append('documentFront', formData.documentFront);
      }
      if (formData.documentBack) {
        formDataToSend.append('documentBack', formData.documentBack);
      }
      if (formData.residenceProof) {
        formDataToSend.append('residenceProof', formData.residenceProof);
      }
      if (formData.selfie) {
        formDataToSend.append('selfie', formData.selfie);
      }
      
      // Enviar dados para o backend
      const response = await fetch(`${config.apiUrl}/api/users`, {
        method: 'POST',
        body: formDataToSend, // FormData não precisa do Content-Type header
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Usuário e documentos criados:', result);
      setSubmitted(true);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      // Você pode adicionar um estado de erro aqui se quiser mostrar uma mensagem ao usuário
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Container maxWidth="sm" sx={{ 
        mt: 4, 
        backgroundColor: '#ffffff', 
        borderRadius: '15px', 
        padding: '25px', 
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' 
      }}>
        <Alert 
          severity="success" 
          sx={{ 
            mt: 2, 
            mb: 2, 
            background: '#e8f5e8', 
            color: '#2e7d32', 
            border: '1px solid #4caf50', 
            fontWeight: 500, 
            textAlign: 'center',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' 
          }}
        >
          <Typography variant="h6" gutterBottom>
            Formulário enviado com sucesso!
          </Typography>
          <Typography variant="body2">
            Obrigado por preencher suas informações.
          </Typography>
        </Alert>
      </Container>
    );
  }

  return (
    <Paper
      elevation={0}
      className="essencial-form"
      sx={{
        backgroundColor: '#FFFFFF',
        color: '#0033ff',
        padding: '32px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          textAlign: 'center', 
          color: '#0033ff', 
          fontWeight: 600,
          fontSize: '2rem',
          mb: 3 
        }}
      >
        Cadastro Essencial
      </Typography>

      {showValidationAlert && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2, 
            mb: 3, 
            background: '#ffebee', 
            color: '#c62828', 
            border: '1px solid #f44336', 
            fontWeight: 500, 
            borderRadius: '8px',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)' 
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#c62828' }}>
            Atenção! Existem campos obrigatórios não preenchidos:
          </Typography>
          <Box component="ul" sx={{ pl: 0, m: 0 }}>
            {getErrorMessages(errors).map((message, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                {message}
              </Typography>
            ))}
          </Box>
        </Alert>
      )}

      <Alert 
        severity="info" 
        sx={{ 
          mt: 2, 
          mb: 3, 
          background: '#FFD700', 
          color: '#0056FF', 
          border: 'none',
          fontWeight: 500, 
          textAlign: 'center',
          borderRadius: '4px',
          '& .MuiAlert-icon': {
            color: '#0056FF'
          }
        }}
      >
        Preencha todos os campos com suas informações pessoais.
      </Alert>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {/* Informações Pessoais */}
        <PersonalInfoStep
          formData={formData}
          errors={errors}
          onFieldChange={handleChange}
          fieldStyles={fieldStyles}
          labelProps={labelProps}
        />

        {/* Endereço */}
        <AddressStep
          formData={formData}
          errors={errors}
          searchingCep={searchingCep}
          onFieldChange={handleChange}
          onCepBlur={handleCepBlur}
          fieldStyles={fieldStyles}
          labelProps={labelProps}
        />

        {/* Dados Bancários */}
        <BankingStep
          formData={formData}
          errors={errors}
          onFieldChange={handleChange}
          onSelectChange={handleSelectChange}
          fieldStyles={fieldStyles}
          selectFieldStyles={selectFieldStyles}
          labelProps={labelProps}
        />

        {/* Documentos */}
        <DocumentsStep
          formData={formData}
          errors={errors}
          onDocumentTypeChange={handleDocumentTypeChange}
          onFileChange={handleFileChange}
          setFormData={setFormData}
        />

        {showValidationAlert && (
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 3, 
              mb: 2, 
              background: '#fff3e0', 
              color: '#ef6c00', 
              border: '1px solid #ff9800', 
              fontWeight: 500, 
              borderRadius: '8px',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.1)' 
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              ⚠️ Revise os campos destacados em vermelho antes de enviar
            </Typography>
          </Alert>
        )}

        {/* Consentimento */}
        <ConsentStep
          consentAccepted={consentAccepted}
          setConsentAccepted={setConsentAccepted}
          errors={errors}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ 
            mt: 3, 
            backgroundColor: '#0033ff', 
            color: '#fff', 
            fontWeight: 'bold', 
            borderRadius: '12px',
            minHeight: '36px',
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '15px',
            boxShadow: 'none', 
            textTransform: 'none',
            '@media (max-width:600px)': {
              width: '100%',
            },
            '&:hover': { 
              backgroundColor: '#0022aa' 
            },
            '&:disabled': {
              backgroundColor: '#ccc',
              color: '#666',
            },
          }}
        >
          {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Enviar Cadastro'}
        </Button>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 3, 
            color: '#666', 
            textAlign: 'center', 
            fontSize: '0.9rem',
          }}
        >
          Seus dados serão tratados com segurança e confidencialidade.
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserForm;
