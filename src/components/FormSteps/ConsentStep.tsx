import React from 'react';
import { Typography, Box, FormControlLabel, Checkbox, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import type { FormErrors } from '../../types';

interface ConsentStepProps {
  consentAccepted: boolean;
  setConsentAccepted: (accepted: boolean) => void;
  errors: FormErrors;
}

const ConsentStep: React.FC<ConsentStepProps> = ({
  consentAccepted,
  setConsentAccepted,
  errors
}) => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={consentAccepted}
            onChange={(e) => setConsentAccepted(e.target.checked)}
            sx={{
              color: errors.consent ? '#d32f2f' : '#0033ff',
              '&.Mui-checked': {
                color: '#0033ff',
              },
            }}
          />
        }
        label={
          <Typography variant="body2" sx={{ color: errors.consent ? '#d32f2f' : '#555' }}>
            Eu li e concordo com os{' '}
            <Link
              component={RouterLink}
              to="/termos-de-uso"
              target="_blank"
              sx={{ color: '#0033ff', textDecoration: 'underline' }}
            >
              Termos de Uso
            </Link>{' '}
            e a{' '}
            <Link
              component={RouterLink}
              to="/politica-de-privacidade"
              target="_blank"
              sx={{ color: '#0033ff', textDecoration: 'underline' }}
            >
              Política de Privacidade
            </Link>
          </Typography>
        }
      />
      {errors.consent && (
        <Typography variant="body2" sx={{ color: '#d32f2f', mt: 1, ml: 4 }}>
          {errors.consent}
        </Typography>
      )}
    </Box>
  );
};

export default ConsentStep;
