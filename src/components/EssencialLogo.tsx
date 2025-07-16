import React from 'react';
import payLogo from '../assets/Pay 0033ff (1).png';

interface EssencialLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const EssencialLogo: React.FC<EssencialLogoProps> = ({ className, style }) => {
  const handleLogoClick = () => {
    window.open('https://creditoessencial.com.br/', '_blank');
  };

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
        cursor: 'pointer',
        transition: 'opacity 0.3s ease',
        ...style 
      }}
      onClick={handleLogoClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.8';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    />
  );
};

export default EssencialLogo;
