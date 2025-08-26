# Deploy Guide - Essencial Pay Form

## Pré-requisitos
- Conta no Railway (para o backend)
- Conta no Vercel (para o frontend)
- Conta na AWS (para o S3)
- Banco PostgreSQL (pode ser criado no Railway)

## 1. Deploy do Backend (Railway)

### Passo 1: Preparar o Repositório
1. Faça commit de todas as mudanças
2. Faça push para o GitHub

### Passo 2: Configurar no Railway
1. Acesse https://railway.app
2. Conecte sua conta GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha o repositório `essencialpay-form-backend`

### Passo 3: Configurar Variáveis de Ambiente
No Railway, vá em Settings > Environment Variables e adicione:

```
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://your-domain.com
CORS_ALLOWED_ORIGINS=https://your-domain.com,http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:8080
DATABASE_URL=postgresql://username:password@hostname:port/database
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_REGION_NAME=us-east-2
AWS_STORAGE_BUCKET_NAME=your-bucket-name
```

### Passo 4: Configurar PostgreSQL
1. No Railway, adicione um novo serviço PostgreSQL
2. Copie a DATABASE_URL gerada
3. Execute os scripts de inicialização do banco:
   - `node init-database.js`
   - `node add-columns.js`

## 2. Deploy do Frontend (Vercel)

### Passo 1: Configurar Variáveis de Ambiente
1. Crie um arquivo `.env.production` com:
```
VITE_API_URL=https://your-backend-name.railway.app
```

### Passo 2: Deploy no Vercel
1. Acesse https://vercel.com
2. Conecte sua conta GitHub
3. Clique em "New Project"
4. Selecione o repositório `essencialpay-form-frontend`
5. Adicione as variáveis de ambiente no Vercel

### Passo 3: Atualizar CORS
Após o deploy do frontend, atualize as variáveis no Railway:
- `FRONTEND_URL=https://your-vercel-url.vercel.app`
- `CORS_ALLOWED_ORIGINS=https://your-vercel-url.vercel.app,http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:8080`

## 3. Configuração do AWS S3

### Criar Bucket
1. Acesse AWS Console
2. Vá para S3
3. Crie um bucket com o nome definido em `AWS_STORAGE_BUCKET_NAME`
4. Configure as permissões adequadas

### Configurar IAM
1. Crie um usuário IAM
2. Anexe a policy `AmazonS3FullAccess`
3. Gere as chaves de acesso

## 4. Testes

1. Teste o backend acessando: `https://your-backend-name.railway.app/health`
2. Teste o frontend acessando: `https://your-frontend-url.vercel.app`
3. Teste o formulário completo

## Troubleshooting

### Erros Comuns:
1. **CORS Error**: Verifique se `FRONTEND_URL` está correto no Railway
2. **Database Connection**: Verifique se `DATABASE_URL` está correto
3. **S3 Upload**: Verifique as credenciais AWS
4. **Build Error**: Verifique se todas as dependências estão instaladas

### Logs:
- Backend: Railway Dashboard > Logs
- Frontend: Vercel Dashboard > Functions > Logs
