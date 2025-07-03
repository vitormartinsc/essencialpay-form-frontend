import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EssencialLogo from './EssencialLogo';

const Footer: React.FC = () => {
  return (
    <Box 
      className="App-footer-full"
      sx={{
        width: '100vw',
        minWidth: '100vw',
        maxWidth: '100vw',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: '20px 0',
        position: 'relative',
        left: 0,
        right: 0,
        transform: 'none',
        boxSizing: 'border-box',
        zIndex: 10,
        marginTop: 'auto',
      }}
    >
      <Box 
        className="App-footer-container"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '800px',
          padding: '0 20px',
        }}
      >
        {/* Logo */}
        <EssencialLogo 
          className="App-footer-logo"
          style={{
            display: 'block',
            width: 'auto',
            height: '35px',
            objectFit: 'contain',
            margin: '0 0 15px 0',
            padding: 0,
          }}
        />
        
        {/* Company Info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '5px',
          }}
        >
    
          
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontSize: '12px',
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              margin: 0,
            }}
          >
            CNPJ: 50.447.111/0001-19
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontSize: '12px',
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              margin: '8px 0 0 0',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Alameda Vicente Pinzon, 54 – 8º andar – Vila Olímpia, São Paulo – SP, 04547-130
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontSize: '12px',
              fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
              margin: '5px 0 0 0',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Av. do Contorno, 6321 – São Pedro Belo Horizonte/MG, Brasil
          </Typography>

          {/* Links para Termos e Política */}
          <Box sx={{ mt: 2, display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              component={RouterLink}
              to="/termos-de-uso"
              sx={{
                color: '#ffffff',
                fontSize: '12px',
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#cccccc',
                },
              }}
            >
              Termos de Uso
            </Link>
            <Link
              component={RouterLink}
              to="/politica-de-privacidade"
              sx={{
                color: '#ffffff',
                fontSize: '12px',
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#cccccc',
                },
              }}
            >
              Política de Privacidade
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
