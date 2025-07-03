# Configuração do Frontend com Backend Railway

## ✅ Backend Railway Funcionando
- **URL:** https://essencialpay-form-backend-production.up.railway.app
- **Health Check:** ✅ Funcionando
- **Resposta:** `{"success": true, "message": "Backend funcionando!", "timestamp": "2025-07-03T20:34:18.910Z"}`

## 🔧 Configurações Atualizadas

### Frontend (.env)
```bash
# URL do Backend em Produção
VITE_API_URL=https://essencialpay-form-backend-production.up.railway.app

# URL do Backend em Desenvolvimento
VITE_API_URL_DEV=http://localhost:8080
```

### Frontend (.env.production)
```bash
VITE_API_URL=https://essencialpay-form-backend-production.up.railway.app
```

### Frontend (src/config/index.ts)
```typescript
const config = {
  development: {
    apiUrl: 'http://localhost:8080',
  },
  production: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://essencialpay-form-backend-production.up.railway.app',
  },
};
```

## 🌐 Próximos Passos

1. **Deploy do Frontend no Vercel:**
   - Configurar variável de ambiente `VITE_API_URL` no Vercel
   - Fazer deploy do frontend

2. **Configurar CORS no Backend:**
   - Adicionar a URL do frontend Vercel na variável `FRONTEND_URL` do Railway
   - Atualizar `CORS_ALLOWED_ORIGINS` com a URL do Vercel

3. **Testar Integração:**
   - Testar formulário completo
   - Verificar upload de arquivos
   - Confirmar salvamento no banco de dados

## 📋 Variáveis de Ambiente para o Railway (Backend)

Certifique-se de que estas variáveis estão configuradas no Railway:

```bash
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://postgres:LZIjjUhtSyUllFmChEPrImDOuOOwFtkI@postgres.railway.internal:5432/railway
AWS_ACCESS_KEY_ID=AKIAR7GCOJBDZLQM2CIW
AWS_SECRET_ACCESS_KEY=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
AWS_STORAGE_BUCKET_NAME=essencial-form-files
AWS_S3_REGION_NAME=us-east-2
FRONTEND_URL=https://sua-url-do-vercel.vercel.app
```

## 🔗 URLs dos Serviços

- **Backend Railway:** https://essencialpay-form-backend-production.up.railway.app
- **Frontend Vercel:** (A ser configurado)
- **Health Check:** https://essencialpay-form-backend-production.up.railway.app/health
