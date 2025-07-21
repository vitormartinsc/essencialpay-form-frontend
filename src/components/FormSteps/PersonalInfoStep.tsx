import React from 'react';
import { TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box, InputLabel, Select, MenuItem } from '@mui/material';
import type { FormData, FormErrors } from '../../types';
import { brazilianStates } from '../../utils/states';

interface PersonalInfoStepProps {
  formData: FormData;
  errors: FormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: any) => void;
  fieldStyles: any;
  labelProps: any;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  errors,
  onFieldChange,
  onSelectChange,
  fieldStyles,
  labelProps
}) => {
  const handleAccountCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    onFieldChange({
      target: {
        name: 'accountCategory',
        value: target.value
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

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

      <Box sx={{ mt: 2, mb: 2 }}>
        <FormControl component="fieldset" error={!!errors.accountCategory}>
          <FormLabel component="legend" sx={{ color: '#0033ff', fontWeight: 600, fontSize: '1rem', mb: 1 }}>
            Que tipo de conta bancária você deseja cadastrar?
          </FormLabel>
          <RadioGroup
            row
            name="accountCategory"
            value={formData.accountCategory}
            onChange={handleAccountCategoryChange}
          >
            <FormControlLabel 
              value="pessoa_fisica" 
              control={<Radio sx={{ color: '#0033ff', '&.Mui-checked': { color: '#0033ff' } }} />} 
              label="Pessoa Física" 
            />
            <FormControlLabel 
              value="pessoa_juridica" 
              control={<Radio sx={{ color: '#0033ff', '&.Mui-checked': { color: '#0033ff' } }} />} 
              label="Pessoa Jurídica" 
            />
          </RadioGroup>
          {errors.accountCategory && (
            <Typography variant="caption" color="error" sx={{ mt: 1 }}>
              {errors.accountCategory}
            </Typography>
          )}
        </FormControl>
      </Box>

      {formData.accountCategory === 'pessoa_fisica' && (
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
      )}

      {formData.accountCategory === 'pessoa_juridica' && (
        <TextField
          fullWidth
          margin="normal"
          label="CNPJ"
          name="cnpj"
          value={formData.cnpj || ''}
          onChange={onFieldChange}
          error={!!errors.cnpj}
          helperText={errors.cnpj}
          placeholder="00.000.000/0000-00"
          InputLabelProps={labelProps}
          sx={fieldStyles}
        />
      )}

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

      <FormControl fullWidth margin="normal" error={!!errors.state}>
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
    </>
  );
};

export default PersonalInfoStep;
