# 🚗 LocaCar - Sistema de Locadora de Carros

<div align="center">

![LocaCar](https://img.shields.io/badge/LocaCar-Sistema%20de%20Locadora-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)

**Sistema completo de gerenciamento de locação de veículos desenvolvido com tecnologias modernas**

[Features](#-funcionalidades) • [Instalação](#-instalação) • [Uso](#-como-usar) • [Tecnologias](#-tecnologias)

</div>

---

## 📋 Sobre o Projeto

O **LocaCar** é uma aplicação web completa para gerenciamento de locação de veículos, desenvolvida com React, TypeScript e Node.js. O sistema permite cadastrar carros, gerenciar usuários, controlar status de veículos e muito mais.

### ✨ Funcionalidades

- 🔐 **Autenticação completa** - Sistema de login e registro de usuários
- 🚙 **Gerenciamento de Carros** - Cadastro, edição, exclusão e visualização de veículos
- 📸 **Fotos de Veículos** - Upload e visualização de imagens dos carros
- 📊 **Status de Veículos** - Controle de disponibilidade (Disponível, Indisponível, Em Uso)
- 🔍 **Busca Avançada** - Pesquisa por modelo, cor ou ano
- 🎨 **Interface Moderna** - Design dark mode com animações suaves
- 📱 **Responsivo** - Funciona perfeitamente em desktop e mobile

---

## 🚀 Tecnologias

### Frontend
- **React 18.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.3.3** - Superset do JavaScript com tipagem estática
- **Vite 5.4.21** - Build tool rápida e moderna
- **React Router 6.20.0** - Roteamento para aplicações React
- **Axios 1.6.2** - Cliente HTTP para requisições
- **SCSS** - Pré-processador CSS para estilos avançados

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express 4.18.2** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose 8.0.3** - ODM para MongoDB
- **JWT** - Autenticação baseada em tokens
- **bcryptjs** - Criptografia de senhas
- **CORS** - Configuração de políticas de origem cruzada

---

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (instalado e rodando)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório** (ou navegue até a pasta do projeto)
   ```bash
   cd LocaCar
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   MONGO_URI=mongodb://localhost:27017/locacar
   JWT_SECRET=k3t1102
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

4. **Inicialize o usuário administrador**
   ```bash
   npm run init:admin
   ```
   
   Isso criará o usuário:
   - **Email:** `admin@locacar.com`
   - **Senha:** `admin123`

---

## 🏃 Como Usar

### Desenvolvimento

#### Opção 1: Rodar tudo junto (Recomendado)
```bash
npm run dev:all
```
Isso inicia o backend e frontend simultaneamente.

#### Opção 2: Rodar separadamente

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Acessar a Aplicação

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **Status da API:** http://localhost:3000/api (retorna `{"message": "API funcionando"}`)

### Credenciais de Acesso

- **Email:** `admin@locacar.com`
- **Senha:** `admin123`

---

## 🎨 Tema e Design

O projeto utiliza um tema **dark mode** moderno com:

- **Cores principais:**
  - 🟣 Purple (`#6B46C1`) - Cor primária
  - 🟢 Green (`#10B981`) - Cor de destaque/accent
  - ⚫ Dark backgrounds - Fundos escuros elegantes

- **Características:**
  - Animações suaves e transições
  - Interface responsiva
  - Feedback visual em todas as ações
  - Design moderno e profissional

---

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o frontend em modo desenvolvimento |
| `npm run dev:server` | Inicia o backend em modo desenvolvimento |
| `npm run dev:all` | Inicia backend e frontend simultaneamente |
| `npm run build` | Compila o projeto para produção |
| `npm run preview` | Preview da build de produção |
| `npm run server` | Inicia o servidor backend |
| `npm run init:admin` | Cria o usuário administrador inicial |

---

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Senhas criptografadas com bcrypt
- ✅ Validação de dados no frontend e backend
- ✅ CORS configurado
- ✅ Rotas protegidas com middleware de autenticação

---

## 🛠️ Funcionalidades Detalhadas

### Autenticação
- Login com email e senha
- Registro de novos usuários (fictício, apenas frontend)
- Validação de email com domínio `@locacar.com`
- Tokens JWT para sessão

### Gerenciamento de Carros
- ✅ Cadastro completo (modelo, ano, cor, valor, status, foto)
- ✅ Edição de informações
- ✅ Exclusão de veículos
- ✅ Visualização em tabela
- ✅ Busca por modelo, cor ou ano
- ✅ Status: Disponível, Indisponível, Em Uso
- ✅ Upload de foto via URL

---

## 🐛 Troubleshooting

### Erro de conexão com MongoDB
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no arquivo `.env`

### Erro 401 (Não autorizado)
- Verifique se está logado
- Limpe o localStorage e faça login novamente

### Erro ao salvar carro
- Verifique se está autenticado
- Confira o console do navegador para erros específicos

---

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional.

---

## 👨‍💻 Desenvolvido com

<div align="center">

Feito com ❤️ usando React, TypeScript e Node.js

</div>

---

## 📞 Suporte

Para dúvidas ou problemas, verifique:
- Arquivo `SETUP.md` para instruções detalhadas
- Console do navegador para erros
- Logs do servidor backend

---

<div align="center">

**LocaCar** - Sistema de Locadora de Carros 🚗

</div>

---

<div align="center">

Desenvolvido por -> João Valdivino e Isaque Lael

</div>
