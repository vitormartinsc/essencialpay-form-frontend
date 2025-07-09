import React from 'react';
import { TextField, Typography } from '@mui/material';
import type { FormData, FormErrors } from '../../types';

interface PersonalInfoStepProps {
  formData: FormData;
  errors: FormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldStyles: any;
  labelProps: any;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  errors,
  onFieldChange,
  fieldStyles,
  labelProps
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, fontSize: '1.1rem', fontWeight: 600 }}>
        Informações Pessoais
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Nome completo"
        name="fullName"
        value={formData.fullName}
        onChange={onFieldChange}
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
        onChange={onFieldChange}
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
        onChange={onFieldChange}
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
        onChange={onFieldChange}
        error={!!errors.phone}
        helperText={errors.phone}
        placeholder="(11) 99999-9999"
        InputLabelProps={labelProps}
        sx={fieldStyles}
      />

      <TextField
        fullWidth
        margin="normal"
        label="CNPJ (Opcional)"
        name="cnpj"
        value={formData.cnpj}
        onChange={onFieldChange}
        error={!!errors.cnpj}
        helperText={errors.cnpj}
        placeholder="00.000.000/0000-00"
        InputLabelProps={labelProps}
        sx={fieldStyles}
      />
    </>
  );
};

export default PersonalInfoStep;
