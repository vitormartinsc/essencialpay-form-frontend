const config = {
  development: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://essencialpay-form-backend-production.up.railway.app',
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://essencialpay-form-backend-production.up.railway.app',
  },
};

const environment = import.meta.env.MODE || 'development';

export default config[environment as keyof typeof config];
