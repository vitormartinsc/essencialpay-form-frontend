const config = {
  development: {
    apiUrl: 'http://localhost:8080',
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://seu-backend.railway.app',
  },
};

const environment = import.meta.env.MODE || 'development';

export default config[environment as keyof typeof config];
