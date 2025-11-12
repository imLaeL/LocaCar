# Instruções para Resolver Problemas de Login e Cadastro de Carros

## Problemas Identificados e Corrigidos

1. ✅ **CORS configurado** - Adicionado suporte CORS no backend
2. ✅ **Script de inicialização do admin** - Criado script para criar usuário admin
3. ✅ **JWT_SECRET padronizado** - Corrigido para usar o mesmo secret em todos os lugares
4. ✅ **Tratamento de erros melhorado** - Melhor tratamento de erros nos controllers

## Passos para Resolver

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
MONGO_URI=mongodb://localhost:27017/locacar
JWT_SECRET=k3t1102
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Inicializar Usuário Admin

Execute o script para criar o usuário admin:

```bash
npm run init:admin
```

Isso criará o usuário:
- **Email:** admin@locacar.com
- **Senha:** admin123

### 4. Iniciar o Servidor Backend

Em um terminal, execute:

```bash
npm run dev:server
```

Ou para rodar backend e frontend juntos:

```bash
npm run dev:all
```

### 5. Iniciar o Frontend (se não estiver usando dev:all)

Em outro terminal, execute:

```bash
npm run dev
```

## Verificações

1. **MongoDB deve estar rodando** - Certifique-se de que o MongoDB está instalado e rodando na porta 27017
2. **Backend na porta 3000** - O servidor backend deve estar rodando em http://localhost:3000
3. **Frontend na porta 5173** - O frontend deve estar rodando em http://localhost:5173

## Testando

1. Acesse http://localhost:5173
2. Faça login com:
   - Email: `admin@locacar.com`
   - Senha: `admin123`
3. Tente adicionar um carro na página de Carros

## Problemas Comuns

### Erro de conexão com MongoDB
- Verifique se o MongoDB está rodando
- Verifique a string de conexão no arquivo `.env`

### Erro 401 (Não autorizado)
- Verifique se o token está sendo salvo no localStorage
- Verifique se o JWT_SECRET está configurado corretamente

### Erro ao salvar carro
- Verifique se está logado
- Verifique o console do navegador para ver erros específicos
- Verifique se o backend está rodando

