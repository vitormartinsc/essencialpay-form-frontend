import React from 'react';
import payLogo from '../assets/Pay 0033ff (1).png';

interface EssencialLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const EssencialLogo: React.FC<EssencialLogoProps> = ({ className, style }) => {
  return (
    <img 
      src={payLogo}
      alt="Pay Logo"
      className={className}
      style={{ 
        width: 'auto', 
        height: '40px', 
        maxWidth: '200px',
        objectFit: 'contain',
        ...style 
      }}
    />
  );
};

export default EssencialLogo;
