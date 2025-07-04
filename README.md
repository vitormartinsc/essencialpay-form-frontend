# Essencial Pay - Formulário de Cadastro

> Plataforma de cadastro para vinculação de maquininhas de cartão e serviços de pagamento

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** - Build tool moderna
- **Material-UI (MUI) v5** - Componentes de UI
- **React Router** - Roteamento SPA
- **LGPD Compliant** - Termos de uso e política de privacidade

## 📦 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🌐 Deploy

O projeto está configurado para deploy automático no **Vercel**.

## 📄 Páginas

- `/` - Redireciona para `/cadastro`
- `/cadastro` - Formulário principal
- `/termos-de-uso` - Termos de uso detalhados
- `/politica-de-privacidade` - Política de privacidade (LGPD)

## 💼 Funcionalidades

### Formulário de Cadastro
- **Dados Pessoais**: Nome, CPF, email, telefone
- **Endereço**: CEP com busca automática
- **Dados Bancários**: Banco, agência, conta
- **Documentos**: Upload de RG/CNH e comprovante de residência
- **Validação**: Campos obrigatórios e formatos corretos
- **Consentimento**: Checkbox obrigatória para LGPD

### Recursos Técnicos
- ✅ Responsivo (mobile-first)
- ✅ Formatação automática (CPF, telefone, CEP)
- ✅ Validação em tempo real
- ✅ Upload de arquivos
- ✅ Busca automática de endereço por CEP
- ✅ Conformidade com LGPD

## � Componentes Principais

- `UserForm` - Formulário principal
- `Header` - Cabeçalho com logo
- `Footer` - Rodapé com links legais
- `WhatsAppFloatButton` - Botão flutuante de contato
- `TermsOfUse` - Página de termos
- `PrivacyPolicy` - Página de política de privacidade

## 🎨 Design System

- **Cores primárias**: #0033ff, #0056FF
- **Tipografia**: Poppins
- **Componentes**: Material-UI customizados
- **Responsividade**: Mobile-first approach
- Telefone/Celular (com formatação)
- Data de nascimento
- Gênero
- Estado civil

### Endereço
- CEP (com formatação)
- Estado (UF)
- Cidade
- Bairro
- Rua
- Número
- Complemento (opcional)

## 🎨 Design System

### Cores
- **Primary**: #0056FF / #0033ff
- **Hover**: #0022aa / #003f8a
- **Background**: #ffffff
- **Page Background**: #f5f5f5

### Componentes
- Input fields com altura de 56px e fonte de 17px
- Botões full-width com bordas arredondadas
- Container responsivo com sombra suave
- Design mobile-first

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 📱 Responsividade

O formulário é totalmente responsivo e otimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🔧 Tecnologias Utilizadas

- **React** 18.3.1
- **TypeScript** 5.5.3
- **Vite** 5.4.10
- **Material-UI** 6.1.9
- **Emotion** (styled-components)

## 📂 Estrutura do Projeto

```
src/
├── components/
│   └── UserForm.tsx       # Componente principal do formulário
├── types/
│   └── index.ts          # Interfaces TypeScript
├── utils/
│   └── formatters.ts     # Funções de formatação e validação
├── App.tsx               # Componente principal
├── App.css              # Estilos da aplicação
├── index.css            # Estilos globais
└── main.tsx             # Entry point
```

## 🎯 Funcionalidades

### Formatação Automática
- **CPF**: XXX.XXX.XXX-XX
- **Telefone**: (XX) XXXXX-XXXX
- **CEP**: XXXXX-XXX

### Validação
- Validação de CPF com dígitos verificadores
- Validação de email
- Validação de telefone brasileiro
- Validação de CEP
- Campos obrigatórios

### UX/UI
- Loading states nos botões
- Feedback visual de erros
- Labels flutuantes
- Transições suaves
- Acessibilidade (WCAG)

## 📄 Licença

Este projeto é privado e propriedade da EssentialPay.

## 👨‍💻 Desenvolvimento

Desenvolvido seguindo as melhores práticas de:
- Clean Code
- TypeScript strict mode
- React Hooks
- Component composition
- Responsive design
- Accessibility guidelines
