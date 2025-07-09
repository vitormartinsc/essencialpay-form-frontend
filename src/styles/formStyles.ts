export const fieldStyles = {
  mt: 1,
  mb: 1,
  width: '100%',
  maxWidth: '500px',
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

export const selectFieldStyles = {
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
  '& .MuiFormControl-root': {
    '& .MuiInputBase-root': {
      '&::before, &::after': {
        display: 'none !important',
      },
    },
  },
};

export const labelProps = {
  sx: { 
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
  }
};
