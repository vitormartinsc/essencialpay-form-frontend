import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import type { FormData, FormErrors } from '../../types';

interface AddressStepProps {
  formData: FormData;
  errors: FormErrors;
  searchingCep: boolean;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCepBlur: () => void;
  fieldStyles: any;
  labelProps: any;
}

const AddressStep: React.FC<AddressStepProps> = ({
  formData,
  errors,
  searchingCep,
  onFieldChange,
  onCepBlur,
  fieldStyles,
  labelProps
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, mt: 3, fontSize: '1.1rem', fontWeight: 600 }}>
        Endereço
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="CEP"
        name="cep"
        value={formData.cep}
        onChange={onFieldChange}
        onBlur={onCepBlur}
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
            onChange={onFieldChange}
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
            onChange={onFieldChange}
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
        onChange={onFieldChange}
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
        onChange={onFieldChange}
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
            onChange={onFieldChange}
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
            onChange={onFieldChange}
            InputLabelProps={labelProps}
            sx={{
              ...fieldStyles,
              mt: 0,
              mb: 0
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default AddressStep;
