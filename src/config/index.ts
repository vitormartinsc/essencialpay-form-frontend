const config = {
  development: {
    // Se acessando via IP (mobile), usar o IP da máquina, senão localhost
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:8080'
      : `http://${window.location.hostname}:8080`,
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://essencialpay-form-backend-production.up.railway.app',
  },
};

const environment = import.meta.env.MODE || 'development';

export default config[environment as keyof typeof config];
