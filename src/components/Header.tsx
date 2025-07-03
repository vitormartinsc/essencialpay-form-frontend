import React from 'react';
import { Box } from '@mui/material';
import EssencialLogo from './EssencialLogo';

const Header: React.FC = () => {
  return (
    <Box 
      className="App-header-full"
      sx={{
        width: '100vw',
        minWidth: '100vw',
        maxWidth: '100vw',
        height: '60px',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: '10px 0',
        position: 'relative',
        left: 0,
        right: 0,
        transform: 'none',
        boxSizing: 'border-box',
        zIndex: 10,
      }}
    >
      <Box 
        className="App-header-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <EssencialLogo 
          className="App-header-ruler"
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
    </Box>
  );
};

export default Header;
