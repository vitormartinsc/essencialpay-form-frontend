# 🚀 Guia de Deploy - Essencial Pay Form

## Ordem Recomendada:

### 1. **Deploy do Backend (Railway) - PRIMEIRO**
### 2. **Deploy do Frontend (Vercel) - SEGUNDO**

---

## 📋 Variáveis de Ambiente para o Railway

**Sim, você pode usar essas variáveis no Railway:**

```bash
# Configurações do App
NODE_ENV=production
PORT=8080

# Configurações do Banco de Dados
DATABASE_URL=postgresql://username:password@host:port/database

# Configurações da AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=your-region

# Configurações do Frontend (URL que será gerada pelo Vercel)
FRONTEND_URL=https://your-frontend-url.vercel.app
CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:5173,http://localhost:5176
```

---

## 🛠️ Passos para Deploy

### **Passo 1: Deploy do Backend (Railway)**

1. **Acesse:** https://railway.app
2. **Conecte** seu repositório do backend
3. **Adicione as variáveis de ambiente** acima no Railway
4. **Aguarde** o deploy finalizar
5. **Copie** a URL gerada pelo Railway (ex: `https://your-backend-name.railway.app`)

### **Passo 2: Deploy do Frontend (Vercel)**

1. **Acesse:** https://vercel.com
2. **Conecte** seu repositório do frontend
3. **Adicione** a variável de ambiente:
   ```
   VITE_API_URL=https://your-backend-name.railway.app
   ```
   (Use a URL do seu backend do Railway)
4. **Deploy** o frontend

### **Passo 3: Atualizar CORS no Backend**

1. **Volte** ao Railway
2. **Atualize** as variáveis:
   ```
   FRONTEND_URL=https://your-vercel-url.vercel.app
   CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app,http://localhost:5173,http://localhost:5176
   ```

---

## ✅ Verificações Pós-Deploy

1. **Teste** o formulário no frontend
2. **Verifique** se os dados estão sendo salvos no banco
3. **Teste** o upload de arquivos
4. **Verifique** os logs de erro

---

## 🔧 Comandos Úteis

**Testar conexão com banco:**
```bash
node init-database.js
```

**Criar bucket S3:**
```bash
node create-bucket.js
```

**Ver logs do Railway:**
Railway Dashboard > Logs

**Ver logs do Vercel:**
Vercel Dashboard > Functions > Logs

---

## 🚨 Problemas Comuns

1. **CORS Error**: Verifique se a URL do frontend está correta no CORS
2. **Database Error**: Verifique se o DATABASE_URL está correto
3. **S3 Upload Error**: Verifique as credenciais AWS
4. **Build Error**: Verifique se todas as dependências estão instaladas

---

## 📝 Notas Importantes

- **Database_URL**: Use a URL interna do Railway (`postgres.railway.internal`)
- **CORS**: Sempre atualize após o deploy do frontend
- **S3**: Verifique se o bucket existe e tem as permissões corretas
- **Environment**: NODE_ENV deve ser "production" no Railway
