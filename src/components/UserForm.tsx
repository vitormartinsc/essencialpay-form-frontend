import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Link,
  Checkbox,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
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
import config from '../config/index';
import './EssencialForm.css';

// Importações dos ícones
import idFrente from '../assets/id_frente.svg';
import idVerso from '../assets/id_verso.svg';
import cnhImage from '../assets/cnh.svg';
import selfieIcon from '../assets/selfie.png';
import comprovanteResidencia from '../assets/comprovante_residencia.png';

// Lista dos principais bancos brasileiros
const BRAZILIAN_BANKS = [
  'Banco do Brasil',
  'Itaú',
  'Bradesco',
  'Caixa Econômica Federal',
  'Santander',
  'Banco Inter',
  'Nubank',
  'BTG Pactual',
  'Safra',
  'Banco Original',
  'Banco Pan',
  'Banco BMG',
  'Banco Daycoval',
  'Banco Pine',
  'Banco Mercantil do Brasil',
  'Banco Sofisa',
  'Banco Votorantim',
  'C6 Bank',
  'Neon',
  'Next',
  'Banco Modal',
  'Banco Fibra',
  'Banco Rendimento',
  'Banco Industrial do Brasil',
  'Banco Paulista',
  'Banco Topázio',
  'Banco Alfa',
  'Banco Bonsucesso',
  'Banco Máxima',
  'Banco Ourinvest',
  'PagBank',
  'Banco do Nordeste',
  'Banco da Amazônia',
  'BRDE',
  'Banco de Brasília',
  'Banrisul',
  'Banestes',
  'Banco Cooperativo Sicredi',
  'Unicred',
  'Outros'
].sort();

const UserForm: React.FC = () => {
  // Standard styling for form fields following the original project design
  const fieldStyles = {
    mt: 1,
    mb: 1,
    width: '100%',
    maxWidth: '500px',
    '& .MuiInputBase-root': {
      height: '56px', // Voltando ao padrão
      fontSize: '1rem',
      backgroundColor: '#fff',
      color: '#0033ff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      '&:focus-within': {
        border: '1px solid #0033ff',
        boxShadow: '0 0 6px rgba(0, 51, 255, 0.5)',
      },
    },
    '& .MuiInputBase-input': {
      padding: '16px 14px',
      height: 'auto',
      '&::placeholder': {
        color: '#999',
        opacity: 1,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
    '& .MuiSelect-select': {
      padding: '16px 14px',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      minHeight: '24px',
    },
  };

  // Styling específico para campos Select - idêntico aos TextField
  const selectFieldStyles = {
    ...fieldStyles,
    '& .MuiInputBase-root': {
      height: '56px',
      fontSize: '1rem',
      backgroundColor: '#fff',
      color: '#0033ff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      '&:focus-within': {
        border: '1px solid #0033ff',
        boxShadow: '0 0 6px rgba(0, 51, 255, 0.5)',
      },
      '&:hover': {
        borderColor: '#0033ff',
      },
    },
    '& .MuiSelect-select': {
      padding: '16px 14px !important',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      minHeight: '24px',
      lineHeight: '1.4375em',
      backgroundColor: 'transparent !important',
      border: 'none !important',
      '&:focus': {
        backgroundColor: 'transparent !important',
      },
    },
    '& .MuiSelect-icon': {
      color: '#0033ff',
      right: '8px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      display: 'none !important', // Remove completamente a borda padrão
    },
    '& .MuiInputLabel-root': {
      transform: 'translate(14px, 16px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
        backgroundColor: '#fff',
        paddingX: '4px',
      },
    },
    '& .MuiFormControl-root': {
      '& .MuiInputBase-root': {
        '&::before, &::after': {
          display: 'none !important',
        },
      },
    },
  };

  const labelProps = {
    sx: { 
      fontSize: '0.95rem', // Reduzido ligeiramente para mobile
      fontWeight: 500, 
      color: '#0033ff',
      '&.Mui-focused': {
        color: '#0033ff',
      },
      '&.MuiInputLabel-shrink': {
        backgroundColor: '#fff',
        paddingX: '4px',
      }
    }
  };

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

  // Função para criar mensagens de erro amigáveis
  const getErrorMessages = (errors: FormErrors): string[] => {
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
  const isValidImage = (file: File) => {
    if (!file) return false;
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    return validTypes.includes(file.type);
  };

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
        {/* Personal Information */}
        <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, fontSize: '1.1rem', fontWeight: 600 }}>
          Informações Pessoais
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Nome completo"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        <TextField
          fullWidth
          margin="normal"
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          error={!!errors.cpf}
          helperText={errors.cpf}
          placeholder="000.000.000-00"
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Telefone/Celular"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          placeholder="(11) 99999-9999"
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        {/* CNPJ Campo Opcional */}
        <TextField
          fullWidth
          margin="normal"
          label="CNPJ (Opcional)"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          error={!!errors.cnpj}
          helperText={errors.cnpj}
          placeholder="00.000.000/0000-00"
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        {/* Address Information */}
        <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, mt: 3, fontSize: '1.1rem', fontWeight: 600 }}>
          Endereço
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="CEP"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          onBlur={handleCepBlur}
          error={!!errors.cep}
          helperText={searchingCep ? 'Buscando endereço...' : errors.cep}
          placeholder="00000-000"
          disabled={searchingCep}
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', sm: 'row' }, 
          mt: 1, 
          mb: 1
        }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Estado (UF)"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
              placeholder="Ex: SP, RJ, MG"
              InputLabelProps={labelProps}
              sx={{
                ...fieldStyles,
                mt: 0,
                mb: 0
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Cidade"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              InputLabelProps={labelProps}
              sx={{
                ...fieldStyles,
                mt: 0,
                mb: 0
              }}
            />
          </Box>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Bairro"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          error={!!errors.neighborhood}
          helperText={errors.neighborhood}
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Rua"
          name="street"
          value={formData.street}
          onChange={handleChange}
          error={!!errors.street}
          helperText={errors.street}
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', sm: 'row' }, 
          mt: 1, 
          mb: 1
        }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Número"
              name="number"
              value={formData.number}
              onChange={handleChange}
              error={!!errors.number}
              helperText={errors.number}
              InputLabelProps={labelProps}
              sx={{
                ...fieldStyles,
                mt: 0,
                mb: 0
              }}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            <TextField
              fullWidth
              label="Complemento (opcional)"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              InputLabelProps={labelProps}
              sx={{
                ...fieldStyles,
                mt: 0,
                mb: 0
              }}
            />
          </Box>
        </Box>

        {/* Dados Bancários */}
        <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, mt: 3, fontSize: '1.1rem', fontWeight: 600 }}>
          Dados Bancários
        </Typography>

        <FormControl 
          fullWidth 
          margin="normal" 
          error={!!errors.bankName}
          sx={selectFieldStyles}
        >
          <InputLabel sx={labelProps.sx}>
            Nome do Banco
          </InputLabel>
          <Select
            name="bankName"
            value={formData.bankName}
            onChange={handleSelectChange}
            label="Nome do Banco"
          >
            {BRAZILIAN_BANKS.map((bank) => (
              <MenuItem key={bank} value={bank}>
                {bank}
              </MenuItem>
            ))}
          </Select>
          {errors.bankName && (
            <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
              {errors.bankName}
            </Typography>
          )}
        </FormControl>

        <FormControl 
          fullWidth 
          margin="normal" 
          error={!!errors.accountType}
          sx={selectFieldStyles}
        >
          <InputLabel sx={labelProps.sx}>
            Tipo de Conta
          </InputLabel>
          <Select
            name="accountType"
            value={formData.accountType}
            onChange={handleSelectChange}
            label="Tipo de Conta"
          >
            <MenuItem value="corrente">Conta Corrente</MenuItem>
            <MenuItem value="poupanca">Conta Poupança</MenuItem>
            <MenuItem value="salario">Conta Salário</MenuItem>
          </Select>
          {errors.accountType && (
            <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
              {errors.accountType}
            </Typography>
          )}
        </FormControl>

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', sm: 'row' }, 
          mt: 1, 
          mb: 1
        }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Agência"
              name="agency"
              value={formData.agency}
              onChange={handleChange}
              error={!!errors.agency}
              helperText={errors.agency}
              placeholder="0000"
              InputLabelProps={labelProps}
              sx={{
                ...fieldStyles,
                mt: 0,
                mb: 0
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label="Conta"
              name="account"
              value={formData.account}
              onChange={handleChange}
              error={!!errors.account}
              helperText={errors.account}
              placeholder="000000-0"
              InputLabelProps={labelProps}
              sx={{
                ...fieldStyles,
                mt: 0,
                mb: 0
              }}
            />
          </Box>
        </Box>

        {/* Documentos */}
        <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, mt: 3, fontSize: '1.1rem', fontWeight: 600, textAlign: 'center' }}>
          Documentos de Identificação
        </Typography>

        <RadioGroup
          row
          value={formData.documentType}
          onChange={handleDocumentTypeChange}
          sx={{ justifyContent: 'center', mb: 4, gap: 2 }}
        >
          <FormControlLabel
            value="RG"
            control={<Radio sx={{ color: '#0033ff' }} />}
            label="Vou enviar meu RG"
            sx={{ color: '#0033ff', fontWeight: '500' }}
          />
          <FormControlLabel
            value="CNH"
            control={<Radio sx={{ color: '#0033ff' }} />}
            label="Vou enviar minha CNH"
            sx={{ color: '#0033ff', fontWeight: '500' }}
          />
        </RadioGroup>

        {formData.documentType === 'RG' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 3 }, mb: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
              <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Foto da frente da Identidade</Typography>
              <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f8f9fa', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
                <img src={idFrente} alt="RG Frente" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              </Box>
              {!formData.documentFront ? (
                <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
                  Enviar
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp" 
                    name="documentFront" 
                    onChange={handleFileChange}
                    style={{ 
                      display: 'none',
                      opacity: 0,
                      position: 'absolute',
                      zIndex: -1,
                      width: 0,
                      height: 0,
                      overflow: 'hidden'
                    }}
                  />
                </Button>
              ) : (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      color: '#0056FF',
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: 0.2,
                      cursor: 'pointer',
                      marginRight: 1,
                      userSelect: 'text',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {formData.documentFront.name}
                  </Typography>
                  <CloseIcon
                    sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                    onClick={() => setFormData(prev => ({ ...prev, documentFront: null }))}
                  />
                </Box>
              )}
              {!formData.documentFront && errors.documentFront && (
                <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.documentFront}</Typography>
              )}
            </Box>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
              <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Foto do verso da Identidade</Typography>
              <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f8f9fa', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
                <img src={idVerso} alt="RG Verso" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              </Box>
              {!formData.documentBack ? (
                <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
                  Enviar
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp" 
                    name="documentBack" 
                    onChange={handleFileChange}
                    style={{ 
                      display: 'none',
                      opacity: 0,
                      position: 'absolute',
                      zIndex: -1,
                      width: 0,
                      height: 0,
                      overflow: 'hidden'
                    }}
                  />
                </Button>
              ) : (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      color: '#0056FF',
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: 0.2,
                      cursor: 'pointer',
                      marginRight: 1,
                      userSelect: 'text',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {formData.documentBack.name}
                  </Typography>
                  <CloseIcon
                    sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                    onClick={() => setFormData(prev => ({ ...prev, documentBack: null }))}
                  />
                </Box>
              )}
              {!formData.documentBack && errors.documentBack && (
                <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.documentBack}</Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
              <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Foto da CNH</Typography>
              <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f8f9fa', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
                <img src={cnhImage} alt="CNH" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
              </Box>
              {!formData.documentFront ? (
                <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
                  Enviar
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg, image/webp" 
                    name="documentFront" 
                    onChange={handleFileChange}
                    style={{ 
                      display: 'none',
                      opacity: 0,
                      position: 'absolute',
                      zIndex: -1,
                      width: 0,
                      height: 0,
                      overflow: 'hidden'
                    }}
                  />
                </Button>
              ) : (
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      color: '#0056FF',
                      fontWeight: 500,
                      fontSize: 14,
                      letterSpacing: 0.2,
                      cursor: 'pointer',
                      marginRight: 1,
                      userSelect: 'text',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {formData.documentFront.name}
                  </Typography>
                  <CloseIcon
                    sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                    onClick={() => setFormData(prev => ({ ...prev, documentFront: null }))}
                  />
                </Box>
              )}
              {!formData.documentFront && errors.documentFront && (
                <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.documentFront}</Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Selfie do Cliente */}
        <Typography variant="body2" sx={{ 
          mt: 4, 
          mb: 2, 
          color: '#0056FF', 
          fontWeight: 'bold', 
          fontSize: '1rem', 
          textAlign: 'center',
          borderTop: '1px solid #e0e0e0',
          paddingTop: 3
        }}>
          Agora precisamos de uma selfie sua
        </Typography>

        <Alert 
          severity="info" 
          sx={{ 
            mb: 3, 
            background: '#e3f2fd', 
            color: '#0056FF', 
            border: '1px solid #0056FF',
            fontWeight: 500, 
            textAlign: 'left',
            borderRadius: '8px',
            '& .MuiAlert-icon': {
              color: '#0056FF'
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            📸 Instruções para a selfie:
          </Typography>
          <Typography variant="body2" component="div">
            • Tire a foto de frente, olhando para a câmera<br/>
            • Certifique-se de que seu rosto esteja bem iluminado<br/>
            • Mantenha a foto nítida e sem objetos na frente<br/>
            • Não use óculos escuros, bonés ou máscaras<br/>
            • O rosto deve ocupar boa parte da foto
          </Typography>
        </Alert>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box sx={{ 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            backgroundColor: '#e8f5e8', 
            padding: '20px 15px 15px 15px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
            width: { xs: 180, sm: 200 }, 
            border: '2px solid #4caf50'
          }}>
            <Typography variant="body2" sx={{ 
              mb: 1.5, 
              color: '#2e7d32', 
              fontWeight: 'bold', 
              fontSize: '0.9rem', 
              textAlign: 'center', 
              lineHeight: 1.3 
            }}>
              Sua Selfie
            </Typography>
            <Box sx={{ 
              width: '70px', 
              height: '70px', 
              backgroundColor: '#f1f8e9', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              mb: 1.5, 
              mt: 0.5,
              border: '2px solid #81c784'
            }}>
              <img src={selfieIcon} alt="Selfie" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
            </Box>
            {!formData.selfie ? (
              <Button 
                variant="contained" 
                component="label" 
                sx={{ 
                  backgroundColor: '#4caf50', 
                  color: '#fff', 
                  fontWeight: 'bold', 
                  textTransform: 'none', 
                  borderRadius: '8px', 
                  minWidth: 90, 
                  height: 34, 
                  px: 2, 
                  py: 0, 
                  fontSize: 14, 
                  whiteSpace: 'nowrap', 
                  display: 'flex', 
                  alignSelf: 'center', 
                  justifyContent: 'center', 
                  mb: 1,
                  '&:hover': { 
                    backgroundColor: '#388e3c' 
                  } 
                }}
              >
                Enviar Selfie
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp" 
                  name="selfie" 
                  onChange={handleFileChange}
                  capture="user"
                  style={{ 
                    display: 'none',
                    opacity: 0,
                    position: 'absolute',
                    zIndex: -1,
                    width: 0,
                    height: 0,
                    overflow: 'hidden'
                  }}
                />
              </Button>
            ) : (
              <Box sx={{ 
                mt: 1, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                background: '#f1f8e9', 
                borderRadius: '6px', 
                px: 1, 
                py: 0.5, 
                width: '100%' 
              }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    color: '#2e7d32',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: 0.2,
                    cursor: 'pointer',
                    marginRight: 1,
                    userSelect: 'text',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {formData.selfie.name}
                </Typography>
                <CloseIcon
                  sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                  onClick={() => setFormData(prev => ({ ...prev, selfie: null }))}
                />
              </Box>
            )}
            {!formData.selfie && errors.selfie && (
              <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>
                {errors.selfie}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Comprovante de Residência */}
        <Typography variant="body2" sx={{ 
          mt: 4, 
          mb: 2, 
          color: '#0056FF', 
          fontWeight: 'bold', 
          fontSize: '1rem', 
          textAlign: 'center',
          borderTop: '1px solid #e0e0e0',
          paddingTop: 3
        }}>
          Por último, o comprovante de residência
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
            <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Comprovante de Residência</Typography>
            <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f9f9f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
              <img src={comprovanteResidencia} alt="Comprovante de Residência" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
            </Box>
            {!formData.residenceProof ? (
              <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
                Enviar
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf" 
                  name="residenceProof" 
                  onChange={handleFileChange}
                  style={{ 
                    display: 'none',
                    opacity: 0,
                    position: 'absolute',
                    zIndex: -1,
                    width: 0,
                    height: 0,
                    overflow: 'hidden'
                  }}
                />
              </Button>
            ) : (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    color: '#0056FF',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: 0.2,
                    cursor: 'pointer',
                    marginRight: 1,
                    userSelect: 'text',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {formData.residenceProof.name}
                </Typography>
                <CloseIcon
                  sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                  onClick={() => setFormData(prev => ({ ...prev, residenceProof: null }))}
                />
              </Box>
            )}
            {!formData.residenceProof && errors.residenceProof && (
              <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.residenceProof}</Typography>
            )}
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: '#666', mt: 2, display: 'block', textAlign: 'center' }}>
          Formatos aceitos: PNG, JPG, JPEG, WEBP (documentos e selfie) | PDF, PNG, JPG, JPEG, WEBP (comprovante)
        </Typography>

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
        <Box sx={{ mt: 2, mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                sx={{
                  color: errors.consent ? '#d32f2f' : '#0033ff',
                  '&.Mui-checked': {
                    color: '#0033ff',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: errors.consent ? '#d32f2f' : '#555' }}>
                Eu li e concordo com os{' '}
                <Link
                  component={RouterLink}
                  to="/termos-de-uso"
                  target="_blank"
                  sx={{ color: '#0033ff', textDecoration: 'underline' }}
                >
                  Termos de Uso
                </Link>{' '}
                e a{' '}
                <Link
                  component={RouterLink}
                  to="/politica-de-privacidade"
                  target="_blank"
                  sx={{ color: '#0033ff', textDecoration: 'underline' }}
                >
                  Política de Privacidade
                </Link>
              </Typography>
            }
          />
          {errors.consent && (
            <Typography variant="body2" sx={{ color: '#d32f2f', mt: 1, ml: 4 }}>
              {errors.consent}
            </Typography>
          )}
        </Box>

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
