import React from 'react';
import { TextField, Typography } from '@mui/material';
import type { FormData, FormErrors } from '../../types';

interface ContactStepProps {
  formData: FormData;
  errors: FormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldStyles: any;
  labelProps: any;
}

const ContactStep: React.FC<ContactStepProps> = ({
  formData,
  errors,
  onFieldChange,
  fieldStyles,
  labelProps
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, fontSize: '1.1rem', fontWeight: 600 }}>
        Informações de Contato
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Nome Completo"
        name="fullName"
        value={formData.fullName}
        onChange={onFieldChange}
        error={!!errors.fullName}
        helperText={errors.fullName}
        placeholder="Digite seu nome completo"
        InputLabelProps={labelProps}
        sx={fieldStyles}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Celular"
        name="phone"
        value={formData.phone}
        onChange={onFieldChange}
        error={!!errors.phone}
        helperText={errors.phone}
        placeholder="(11) 99999-9999"
        InputLabelProps={labelProps}
        sx={fieldStyles}
      />
    </>
  );
};

export default ContactStep;
