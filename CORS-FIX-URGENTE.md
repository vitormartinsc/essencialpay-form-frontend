# 🚨 CORREÇÃO URGENTE - CORS ERROR

## Problema
O frontend em `https://www.essencialpay.com.br` está sendo bloqueado pelo CORS do backend.

**Erro:**
```
Access to fetch at 'https://essencialpay-form-backend-production.up.railway.app/api/cep/30140080' 
from origin 'https://www.essencialpay.com.br' has been blocked by CORS policy: 
The 'Access-Control-Allow-Origin' header has a value 'https://railway.com' 
that is not equal to the supplied origin.
```

## ✅ SOLUÇÃO IMEDIATA

### 1. Configurar Variáveis de Ambiente no Railway

Acesse o Railway Dashboard e configure estas variáveis:

```bash
# Frontend URL principal
FRONTEND_URL=https://www.essencialpay.com.br

# CORS permitindo múltiplas origens
CORS_ALLOWED_ORIGINS=https://www.essencialpay.com.br,http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:8080

# Outras variáveis necessárias
NODE_ENV=production
PORT=8080
DATABASE_URL=postgresql://postgres:LZIjjUhtSyUllFmChEPrImDOuOOwFtkI@postgres.railway.internal:5432/railway
AWS_ACCESS_KEY_ID=AKIAR7GCOJBDZLQM2CIW
AWS_SECRET_ACCESS_KEY=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
AWS_STORAGE_BUCKET_NAME=essencial-form-files
AWS_S3_REGION_NAME=us-east-2
```

### 2. Verificar Configuração do Backend

O arquivo `server.js` deve estar usando:

```javascript
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ALLOWED_ORIGINS?.split(',') || [process.env.FRONTEND_URL] 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:8080'],
  credentials: true,
}));
```

### 3. Reiniciar o Serviço

Após configurar as variáveis, reinicie o serviço no Railway para aplicar as mudanças.

## 🧪 Teste

Após a configuração, teste:

```bash
# Health check
curl https://essencialpay-form-backend-production.up.railway.app/health

# Teste de CORS
curl -H "Origin: https://www.essencialpay.com.br" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://essencialpay-form-backend-production.up.railway.app/api/cep/30140080
```

## 📋 Checklist de Verificação

- [ ] Variável `FRONTEND_URL` configurada no Railway
- [ ] Variável `CORS_ALLOWED_ORIGINS` configurada no Railway
- [ ] Serviço reiniciado no Railway
- [ ] Teste de CORS passou
- [ ] Formulário funcionando em produção
