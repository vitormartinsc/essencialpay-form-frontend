# Essencial Pay Form

Um formulário moderno e responsivo desenvolvido em TypeScript com React, Vite e Material-UI, seguindo a identidade visual do projeto Essencial.

## 🎨 Design e Identidade Visual

Este projeto foi desenvolvido para seguir fielmente a identidade visual do projeto original `essencial-form-frontend`, incluindo:

- **Logo Essencial**: Header com a logo oficial da Essencial
- **Cores**: Paleta azul (#0033ff) com detalhes em dourado (#FFD700)
- **Tipografia**: Fonte Poppins para uma aparência moderna
- **Fundo**: Azul Essencial (#0033ff) como fundo principal
- **Formulário**: Container branco com sombra e bordas arredondadas
- **Botão WhatsApp**: Floating action button para contato direto

## 🚀 Funcionalidades

### Formulário de Cadastro Completo
- **Informações Pessoais**: Nome, CPF, CNPJ (opcional), RG, Email, Telefone
- **Endereço Completo**: CEP (com busca automática), Estado, Cidade, Bairro, Rua, Número, Complemento
- **Dados Bancários**: Nome do Banco, Tipo de Conta, Agência, Conta, Chave PIX (opcional)

### Validações e Formatações
- **CPF**: Validação e formatação automática (000.000.000-00)
- **CNPJ**: Validação e formatação automática (opcional) (00.000.000/0000-00)
- **Telefone**: Formatação automática ((00) 00000-0000)
- **CEP**: Formatação automática (00000-000) com integração ViaCEP
- **Email**: Validação de formato de email
- **Agência**: Formatação numérica (0000)
- **Conta**: Permitir dígitos e traço (00000-0)
- **Chave PIX**: Validação para CPF, CNPJ, email, telefone ou chave aleatória
- **Campos obrigatórios**: Validação em tempo real

### Experiência do Usuário
- **Design Responsivo**: Funciona perfeitamente em mobile e desktop
- **Feedback Visual**: Estados de loading, erro e sucesso
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado
- **Performance**: Carregamento rápido com Vite

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna e rápida
- **Material-UI (MUI)** - Componentes de interface
- **ViaCEP API** - Busca automática de endereços

## 📱 Design Responsivo

O formulário foi desenvolvido com abordagem mobile-first:

- **Mobile (até 768px)**: Layout em coluna única, campos ocupam largura total
- **Desktop (769px+)**: Layout otimizado com campos em duas colunas quando apropriado
- **Inputs**: Altura e fonte ajustadas para cada dispositivo
- **Botões**: Tamanho apropriado para toque em dispositivos móveis

## 🎯 Identidade Visual Essencial

### Cores Principais
- **Azul Principal**: #0033ff (fundo e textos principais)
- **Azul Hover**: #0022aa (estados de hover)
- **Dourado**: #FFD700 (alertas e placeholders)
- **Branco**: #FFFFFF (fundo do formulário)

### Componentes Customizados
- **Header**: Logo Essencial em SVG responsivo
- **Formulário**: Container branco com sombras e bordas arredondadas
- **Campos**: Estilo customizado seguindo o padrão Essencial
- **Botões**: Design arredondado com estados hover/disabled
- **WhatsApp Button**: Floating action button para contato

## 🔧 Instalação e Uso

```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview
```

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── UserForm.tsx          # Formulário principal
│   ├── Header.tsx            # Header com logo
│   ├── EssencialLogo.tsx     # Componente SVG da logo
│   ├── WhatsAppFloatButton.tsx # Botão WhatsApp flutuante
│   └── EssencialForm.css     # Estilos específicos do Essencial
├── types/
│   └── index.ts              # Interfaces TypeScript
├── utils/
│   └── formatters.ts         # Funções de formatação e validação
├── assets/
│   └── Barra header.svg      # Logo Essencial
├── App.tsx                   # Componente principal
├── App.css                   # Estilos globais
└── index.css                 # Reset CSS e estilos base
```

## 🌟 Características Especiais

### Integração ViaCEP
- Busca automática de endereço por CEP
- Preenchimento automático de cidade, estado e bairro
- Tratamento de erros para CEPs inválidos

### Validação em Tempo Real
- Validação de CPF com dígitos verificadores
- Formatação automática durante a digitação
- Mensagens de erro contextuais

### Acessibilidade
- Labels apropriados para leitores de tela
- Navegação por teclado
- Contraste adequado entre cores
- Estados focus visíveis

### Performance
- Lazy loading de componentes
- Otimização de bundle com Vite
- Memoização de funções custosas

## 📝 Próximos Passos

- [ ] Integração com backend para submissão dos dados
- [ ] Implementação de multi-step form
- [ ] Adição de upload de documentos
- [ ] Implementação de testes unitários
- [ ] Deploy em produção

## 📞 Contato

Para mais informações sobre o projeto Essencial, entre em contato via WhatsApp através do botão flutuante na aplicação.

---

**Desenvolvido com ❤️ seguindo a identidade visual Essencial**
