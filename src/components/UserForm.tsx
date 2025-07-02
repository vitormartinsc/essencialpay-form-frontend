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

const UserForm: React.FC = () => {
  // Standard styling for form fields following the original project design
  const fieldStyles = {
    mt: 1,
    mb: 1,
    width: '100%',
    maxWidth: '400px',
    '& .MuiInputBase-root': {
      height: '44px', // Altura fixa para todos os campos
      fontSize: '1.05rem',
      backgroundColor: '#fff',
      color: '#0033ff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      '&:focus-within': {
        border: '1px solid #0033ff',
        boxShadow: '0 0 6px rgba(0, 51, 255, 0.5)',
      },
    },
    '& .MuiInputBase-input': {
      padding: '10px 8px',
      height: '24px', // Altura interna consistente
      '&::placeholder': {
        color: '#FFD700',
        opacity: 1,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
    '& .MuiSelect-select': {
      padding: '10px 8px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
    },
  };

  const labelProps = {
    sx: { 
      backgroundColor: '#fff', 
      fontSize: '1.05rem', 
      fontWeight: 500, 
      color: '#0033ff',
      paddingX: '4px'
    }
  };

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    cpf: '',
    cnpj: '',
    rg: '',
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
    pixKey: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    if (!formData.rg.trim()) {
      newErrors.rg = 'RG é obrigatório';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
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

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
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
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="RG"
              name="rg"
              value={formData.rg}
              onChange={handleChange}
              error={!!errors.rg}
              helperText={errors.rg}
              InputLabelProps={labelProps}
              sx={fieldStyles}
            />
          </Box>
        </Box>

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
          error={!!errors.cep}
          helperText={errors.cep}
          placeholder="00000-000"
          InputLabelProps={{
            sx: { backgroundColor: '#fff', fontSize: 17, fontWeight: 500, color: '#0056FF' },
            shrink: undefined
          }}
          inputProps={{ style: { height: 48, padding: '16.5px 14px', fontSize: 17 } }}
          sx={{
            mt: 2,
            mb: 1,
            '& .MuiInputBase-root': {
              height: 56,
              borderRadius: 2,
              fontSize: 17,
            },
          }}
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
              InputLabelProps={{
                sx: { backgroundColor: '#fff', fontSize: 17, fontWeight: 500, color: '#0056FF' },
                shrink: undefined
              }}
              inputProps={{ style: { height: 48, padding: '16.5px 14px', fontSize: 17 } }}
              sx={{
                mt: 2,
                mb: 1,
                '& .MuiInputBase-root': {
                  height: 56,
                  borderRadius: 2,
                  fontSize: 17,
                },
              }}
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
              InputLabelProps={{
                sx: { backgroundColor: '#fff', fontSize: 17, fontWeight: 500, color: '#0056FF' },
                shrink: undefined
              }}
              inputProps={{ style: { height: 48, padding: '16.5px 14px', fontSize: 17 } }}
              sx={{
                mt: 2,
                mb: 1,
                '& .MuiInputBase-root': {
                  height: 56,
                  borderRadius: 2,
                  fontSize: 17,
                },
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
          InputLabelProps={{
            sx: { backgroundColor: '#fff', fontSize: 17, fontWeight: 500, color: '#0056FF' },
            shrink: undefined
          }}
          inputProps={{ style: { height: 48, padding: '16.5px 14px', fontSize: 17 } }}
          sx={{
            mt: 2,
            mb: 1,
            '& .MuiInputBase-root': {
              height: 56,
              borderRadius: 2,
              fontSize: 17,
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Rua"
              name="street"
              value={formData.street}
              onChange={handleChange}
              error={!!errors.street}
              helperText={errors.street}
              InputLabelProps={{
                sx: { backgroundColor: '#fff', fontSize: 17, fontWeight: 500, color: '#0056FF' },
                shrink: undefined
              }}
              inputProps={{ style: { height: 48, padding: '16.5px 14px', fontSize: 17 } }}
              sx={{
                mt: 2,
                mb: 1,
                '& .MuiInputBase-root': {
                  height: 56,
                  borderRadius: 2,
                  fontSize: 17,
                },
              }}
            />
          </Box>
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
              InputLabelProps={{
                sx: { backgroundColor: '#fff', fontSize: 17, fontWeight: 500, color: '#0056FF' },
                shrink: undefined
              }}
              inputProps={{ style: { height: 48, padding: '16.5px 14px', fontSize: 17 } }}
              sx={{
                mt: 2,
                mb: 1,
                '& .MuiInputBase-root': {
                  height: 56,
                  borderRadius: 2,
                  fontSize: 17,
                },
              }}
            />
          </Box>
        </Box>

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

        {/* Dados Bancários */}
        <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, mt: 3, fontSize: '1.1rem', fontWeight: 600 }}>
          Dados Bancários
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Nome do Banco"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          error={!!errors.bankName}
          helperText={errors.bankName}
          placeholder="Ex: Banco do Brasil, Itaú, etc."
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <FormControl 
              fullWidth 
              margin="normal" 
              error={!!errors.accountType}
              sx={fieldStyles}
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
          </Box>
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
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
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
          <Box sx={{ flex: 1 }}>
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
          </Box>
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
