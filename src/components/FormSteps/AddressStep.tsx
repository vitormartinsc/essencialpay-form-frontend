import React from 'react';
import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { FormData, FormErrors } from '../../types';
import { brazilianStates } from '../../utils/states';

interface AddressStepProps {
  formData: FormData;
  errors: FormErrors;
  searchingCep: boolean;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCepBlur: () => void;
  onSelectChange: (e: any) => void;
  fieldStyles: any;
  labelProps: any;
}

const AddressStep: React.FC<AddressStepProps> = ({
  formData,
  errors,
  searchingCep,
  onFieldChange,
  onCepBlur,
  onSelectChange,
  fieldStyles,
  labelProps
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ 
        color: '#0033ff', 
        mb: 2, 
        mt: 3, 
        fontSize: '1.1rem', 
        fontWeight: 600,
        '@media (max-width:600px)': {
          fontSize: '1rem',
          mb: 1.5,
          mt: 2,
        },
      }}>
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
          <FormControl fullWidth error={!!errors.state}>
            <InputLabel 
              id="state-select-label" 
              sx={{ 
                fontSize: '0.95rem',
                fontWeight: 500, 
                color: '#0033ff',
                '&.Mui-focused': {
                  color: '#0033ff',
                },
                '&.MuiInputLabel-shrink': {
                  backgroundColor: '#fff',
                  paddingX: '4px',
                }
              }}
            >
              Estado
            </InputLabel>
            <Select
              labelId="state-select-label"
              name="state"
              value={formData.state}
              onChange={onSelectChange}
              label="Estado"
              sx={{
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
                  display: 'none !important',
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 16px) scale(1)',
                  '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                    backgroundColor: '#fff',
                    paddingX: '4px',
                  },
                },
              }}
            >
              {brazilianStates.map((state) => (
                <MenuItem key={state.value} value={state.value}>
                  {state.label}
                </MenuItem>
              ))}
            </Select>
            {errors.state && (
              <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                {errors.state}
              </Typography>
            )}
          </FormControl>
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
