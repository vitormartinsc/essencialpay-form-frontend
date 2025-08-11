import React from 'react';
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
        Dados Bancários
      </Typography>

      <Box sx={{ mb: 2 }}>
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
              error={!!errors.bankName}
              helperText={errors.bankName}
              InputLabelProps={labelProps}
              sx={fieldStyles}
            />
          )}
          sx={{
            '& .MuiAutocomplete-inputRoot': {
              borderRadius: '8px',
              '& .MuiOutlinedInput-notchedOutline': {
                display: 'none !important',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                display: 'none !important',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                display: 'none !important',
              },
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              '&:hover': {
                borderColor: '#0033ff',
              },
              '&.Mui-focused': {
                border: '1px solid #0033ff',
                boxShadow: '0 0 6px rgba(0, 51, 255, 0.5)',
              },
            },
            '& .MuiAutocomplete-popupIndicator': {
              color: '#0033ff',
            },
            '& .MuiAutocomplete-clearIndicator': {
              color: '#0033ff',
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControl 
          fullWidth 
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
      </Box>

      <Box sx={{ 
        display: 'flex', 
        gap: { xs: 0, sm: 2 }, 
        flexDirection: { xs: 'column', sm: 'row' }, 
        mt: 1, 
        mb: 1
      }}>
        <Box sx={{ flex: 1, mb: { xs: 2, sm: 0 } }}>
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
            sx={fieldStyles}
          />
        </Box>
        <Box sx={{ flex: 2, mb: { xs: 2, sm: 0 } }}>
          <TextField
            fullWidth
            label="Conta (até 11 dígitos)"
            name="account"
            value={formData.account}
            onChange={onFieldChange}
            error={!!errors.account}
            helperText={errors.account}
            placeholder="123456789"
            InputLabelProps={labelProps}
            sx={fieldStyles}
          />
        </Box>
        <Box sx={{ flex: 0.5, mb: { xs: 0, sm: 0 }, minWidth: '120px' }}>
          <TextField
            fullWidth
            label="DV"
            name="accountDv"
            value={formData.accountDv}
            onChange={onFieldChange}
            error={!!errors.accountDv}
            helperText={errors.accountDv}
            placeholder="00"
            InputLabelProps={labelProps}
            sx={fieldStyles}
          />
        </Box>
      </Box>
    </>
  );
};

export default BankingStep;
