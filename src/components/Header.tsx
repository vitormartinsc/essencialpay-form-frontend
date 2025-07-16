import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Instagram } from '@mui/icons-material';
import EssencialLogo from './EssencialLogo';

const Header: React.FC = () => {
  const handleInstagramClick = () => {
    window.open('https://instagram.com/essencial.ai', '_blank');
  };

  return (
    <Box 
      sx={{
        width: '100%',
        height: '60px',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Logo centralizada */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <EssencialLogo 
          style={{
            display: 'block',
            width: 'auto',
            height: '40px',
            objectFit: 'contain',
            margin: 0,
            padding: 0,
          }}
        />
      </Box>
      
      {/* Instagram no canto direito */}
      <Box sx={{ 
        position: 'absolute',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
      }}>
        <Button
          onClick={handleInstagramClick}
          startIcon={<Instagram />}
          sx={{
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'none',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease',
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            '@media (max-width: 768px)': {
              padding: '6px 8px',
              fontSize: '12px',
            },
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: '#ffffff',
              '@media (max-width: 768px)': {
                display: 'none',
              },
            }}
          >
            @essencial.ai
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
