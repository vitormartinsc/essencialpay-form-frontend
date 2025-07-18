import React, { useState } from 'react';
import { 
  TextField, 
  Typography, 
  Box, 
  FormControl, 
  Autocomplete,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import type { FormData, FormErrors } from '../../types';

const BRAZILIAN_BANKS = [
  'Banco do Brasil',
  'Itaú',
  'Bradesco',
  'Caixa Econômica Federal',
  'Santander',
  'Inter',
  'Nubank',
  'BTG Pactual',
  'Safra',
  'Original',
  'Pan',
  'BMG',
  'Daycoval',
  'Pine',
  'Mercantil do Brasil',
  'Sofisa',
  'Votorantim',
  'C6 Bank',
  'Neon',
  'Next',
  'Modal',
  'Fibra',
  'Rendimento',
  'Industrial do Brasil',
  'Paulista',
  'Topázio',
  'Alfa',
  'Bonsucesso',
  'Máxima',
  'Ourinvest',
  'PagBank',
  'Banco do Nordeste',
  'Banco da Amazônia',
  'BRDE',
  'Banco de Brasília',
  'Banrisul',
  'Banestes',
  'Sicredi',
  'Unicred'
].sort();

interface BankingStepProps {
  formData: FormData;
  errors: FormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: any) => void;
  fieldStyles: any;
  selectFieldStyles: any;
  labelProps: any;
}

const BankingStep: React.FC<BankingStepProps> = ({
  formData,
  errors,
  onFieldChange,
  onSelectChange,
  fieldStyles,
  selectFieldStyles,
  labelProps
}) => {
  const handleBankChange = (_event: any, newValue: string | null) => {
    onSelectChange({
      target: {
        name: 'bankName',
        value: newValue || ''
      }
    });
  };

  const handleBankInputChange = (_event: any, newInputValue: string) => {
    // Captura o valor digitado mesmo quando não há seleção
    onSelectChange({
      target: {
        name: 'bankName',
        value: newInputValue || ''
      }
    });
  };

  return (
    <>
      <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, mt: 3, fontSize: '1.1rem', fontWeight: 600 }}>
        Dados Bancários
      </Typography>

      <Autocomplete
        options={BRAZILIAN_BANKS}
        value={formData.bankName || ''}
        onChange={handleBankChange}
        onInputChange={handleBankInputChange}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label="Nome do Banco"
            fullWidth
            margin="normal"
            error={!!errors.bankName}
            helperText={errors.bankName}
            InputLabelProps={labelProps}
            sx={fieldStyles}
          />
        )}
        sx={{
          '& .MuiAutocomplete-inputRoot': {
            borderRadius: '15px',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
          }
        }}
      />

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
          onChange={onSelectChange}
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
            onChange={onFieldChange}
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
            onChange={onFieldChange}
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
    </>
  );
};

export default BankingStep;
