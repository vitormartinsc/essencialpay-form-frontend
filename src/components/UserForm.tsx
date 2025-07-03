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
  validatePixKey,
} from '../utils/formatters';
import './EssencialForm.css';

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
    maxWidth: '400px',
    '& .MuiInputBase-root': {
      height: '56px', // Altura fixa padronizada para todos os campos
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
      height: 'auto', // Deixa o Material-UI gerenciar a altura interna
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
      minHeight: '24px', // Altura mínima para o conteúdo do select
    },
  };

  // Styling específico para campos Select
  const selectFieldStyles = {
    ...fieldStyles,
    '& .MuiInputBase-root': {
      ...fieldStyles['& .MuiInputBase-root'],
      minHeight: '56px', // Garante altura mínima
    },
    '& .MuiSelect-select': {
      padding: '16px 14px',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      minHeight: '24px',
      lineHeight: '1.4375em', // Altura padrão do Material-UI
    },
    '& .MuiInputLabel-root': {
      transform: 'translate(14px, 16px) scale(1)',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
    },
  };

  const labelProps = {
    sx: { 
      fontSize: '1rem', 
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
    identityDocument: null,
    residenceProof: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);

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
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Função para buscar dados do CEP
  const handleCepBlur = async () => {
    const cleanCep = formData.cep.replace(/\D/g, '');
    
    if (cleanCep.length === 8) {
      setSearchingCep(true);
      try {
        const response = await fetch(`http://localhost:3000/api/cep/${cleanCep}`);
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
    }

    // PIX é opcional, mas se preenchido deve ser válido
    if (formData.pixKey && !validatePixKey(formData.pixKey)) {
      newErrors.pixKey = 'Chave PIX inválida';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Enviar dados para o backend
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Usuário criado:', result);
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
        maxWidth: '400px',
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

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
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
          </Box>
        </Box>

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

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Estado (UF)"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
              InputLabelProps={labelProps}
              sx={fieldStyles}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Cidade"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              InputLabelProps={labelProps}
              sx={fieldStyles}
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

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Número"
              name="number"
              value={formData.number}
              onChange={handleChange}
              error={!!errors.number}
              helperText={errors.number}
              InputLabelProps={labelProps}
              sx={fieldStyles}
            />
          </Box>
          <Box sx={{ flex: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Complemento (opcional)"
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              InputLabelProps={labelProps}
              sx={fieldStyles}
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

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Agência"
              name="agency"
              value={formData.agency}
              onChange={handleChange}
              error={!!errors.agency}
              helperText={errors.agency}
              placeholder="0000"
              InputLabelProps={labelProps}
              sx={fieldStyles}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Conta"
              name="account"
              value={formData.account}
              onChange={handleChange}
              error={!!errors.account}
              helperText={errors.account}
              placeholder="00000-0"
              InputLabelProps={labelProps}
              sx={fieldStyles}
            />
          </Box>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Chave PIX (Opcional)"
          name="pixKey"
          value={formData.pixKey}
          onChange={handleChange}
          error={!!errors.pixKey}
          helperText={errors.pixKey || 'CPF, email, telefone ou chave aleatória'}
          placeholder="Sua chave PIX"
          InputLabelProps={labelProps}
          sx={fieldStyles}
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
            color: '#0033ff', 
            textAlign: 'center', 
            fontSize: '0.9rem',
            '& a': {
              color: '#0033ff',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          }}
        >
          Ao enviar este formulário, você concorda com nossos{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" onClick={(e) => e.preventDefault()}>
            política de privacidade
          </a>
          .
        </Typography>
      </Box>
    </Paper>
  );
};

export default UserForm;
