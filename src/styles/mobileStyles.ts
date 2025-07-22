export const mobileStyles = {
  // Tamanhos de fonte
  fontSize: {
    h1: { desktop: '2.2rem', mobile: '1.5rem' },
    h2: { desktop: '1.8rem', mobile: '1.3rem' },
    h3: { desktop: '1.5rem', mobile: '1.1rem' },
    body1: { desktop: '1rem', mobile: '0.875rem' },
    body2: { desktop: '0.875rem', mobile: '0.8rem' },
    caption: { desktop: '0.75rem', mobile: '0.7rem' },
  },
  
  // Espaçamentos
  spacing: {
    containerPadding: { desktop: '40px 32px', mobile: '24px 16px' },
    fieldSpacing: { desktop: 2, mobile: 1.5 },
    sectionMargin: { desktop: 4, mobile: 2.5 },
  },
  
  // Alturas
  heights: {
    input: { desktop: '56px', mobile: '48px' },
    button: { desktop: '56px', mobile: '48px' },
  },
  
  // Media queries
  breakpoints: {
    mobile: '@media (max-width:600px)',
    tablet: '@media (max-width:768px)',
    desktop: '@media (min-width:769px)',
  },
};

// Helper function para aplicar estilos responsivos
export const responsiveStyle = (desktop: any, mobile: any) => ({
  ...desktop,
  '@media (max-width:600px)': mobile,
});

// Constantes para otimização mobile
export const MOBILE_OPTIMIZATIONS = {
  // Reduzir espaçamentos
  reducedMargin: { desktop: 4, mobile: 2.5 },
  reducedPadding: { desktop: 3, mobile: 2 },
  
  // Tamanhos de ícones
  iconSizes: { desktop: '1.5rem', mobile: '1.25rem' },
  
  // Altura mínima dos campos
  fieldHeight: { desktop: '56px', mobile: '48px' },
};
