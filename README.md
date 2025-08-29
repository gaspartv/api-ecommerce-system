# API E-commerce System

Uma API REST robusta desenvolvida em Node.js com TypeScript para gerenciar sistemas de e-commerce multi-tenant com suporte a subdomínios.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset JavaScript com tipagem estática
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação baseada em tokens
- **Zod** - Validação de esquemas TypeScript-first
- **bcrypt** - Hash de senhas
- **PM2** - Gerenciador de processos para aplicações Node.js
- **CORS** - Controle de acesso entre origens

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- PostgreSQL
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd api-ecommerce-system
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
API_NAME=api-ecommerce-system
NODE_ENV=develop
PORT=4002
FRONT_URL=http://localhost:3000
FRONT_DEV_URL=http://localhost:3001
DATABASE_URL=postgresql://usuario:senha@localhost:5432/database_name
JWT_SECRET=seu_jwt_secret_super_secreto
JWT_EXPIRES_IN_TIME=3600000
```

4. **Execute as migrações do banco de dados**

```bash
npm run migration:execute
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run start:dev
```

## 🎯 Scripts Disponíveis

| Script                      | Descrição                                                |
| --------------------------- | -------------------------------------------------------- |
| `npm run start:dev`         | Inicia o servidor em modo desenvolvimento com hot-reload |
| `npm run build`             | Compila o TypeScript para JavaScript                     |
| `npm run start`             | Inicia o servidor em modo produção                       |
| `npm run pm2`               | Inicia a aplicação usando PM2                            |
| `npm run migration:create`  | Cria uma nova migração                                   |
| `npm run migration:execute` | Executa as migrações pendentes                           |

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **businesses** - Informações dos negócios/empresas
- **businesses_addresses** - Endereços dos negócios
- **users_system** - Usuários do sistema
- **users_admin** - Usuários administrativos

### Migrações

As migrações estão localizadas em `src/database/migrations/` e incluem:

- Criação da tabela de negócios
- Criação da tabela de usuários do sistema
- Adição de colunas em negócios
- Criação da tabela de endereços dos negócios
- Criação da tabela de usuários administrativos

## 📡 API Endpoints

Base URL: `http://localhost:4002/as`

### 🔐 Autenticação

#### POST `/signin`

Realiza login no sistema

**Body:**

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Response:**

```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "user_id",
    "email": "usuario@exemplo.com"
  }
}
```

### 🏢 Negócios (Businesses)

#### POST `/business`

Cria um novo negócio (requer autenticação)

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Body:**

```json
{
  "name": "Nome do Negócio",
  "description": "Descrição do negócio"
  // outros campos conforme schema
}
```

#### PUT `/business`

Atualiza um negócio existente (requer autenticação)

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Body:**

```json
{
  "id": "business_id",
  "name": "Novo Nome do Negócio",
  "description": "Nova descrição"
  // outros campos para atualização
}
```

#### GET `/business`

Lista negócios com paginação (requer autenticação)

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**

- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10)
- Outros parâmetros de filtro conforme schema

### 📍 Endereços dos Negócios

#### PUT `/business-address`

Cria ou atualiza endereço de um negócio

**Body:**

```json
{
  "businessId": "business_id",
  "street": "Rua Exemplo",
  "number": "123",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01234-567"
  // outros campos de endereço
}
```

### 👥 Usuários

#### GET `/users/profile`

Obtém perfil do usuário autenticado

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "id": "user_id",
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário"
  // outros dados do perfil
}
```

## 🔒 Autenticação e Autorização

A API utiliza JWT (JSON Web Tokens) para autenticação. Algumas rotas são protegidas e requerem o token de autenticação no header:

```
Authorization: Bearer <seu_jwt_token>
```

## 🌐 Suporte Multi-tenant com Subdomínios

A API possui middleware de validação de subdomínio (`ValidateSubdomainMiddleware`) que permite operação multi-tenant baseada em subdomínios.

## 📝 Validação de Dados

Todas as requisições são validadas usando Zod schemas localizados em `src/schemas/SchemaZod.ts`. Isso garante:

- Tipagem forte dos dados
- Validação automática das requisições
- Mensagens de erro padronizadas

## 🔧 Middlewares

### ValidateSubdomainMiddleware

Valida e processa subdomínios para suporte multi-tenant.

### ValidationSchemaZodMiddleware

Valida dados de entrada (body, query, params) usando schemas Zod.

### VerifyTokenMiddleware

Verifica e valida tokens JWT para rotas protegidas.

## 🏗️ Arquitetura

A aplicação segue uma arquitetura em camadas:

```
src/
├── modules/          # Módulos de negócio (controllers, services)
├── database/         # Configuração DB, migrações, repositories
├── common/           # Middlewares, utilitários compartilhados
├── factory/          # Factories para injeção de dependências
├── schemas/          # Validação com Zod
├── configs/          # Configurações da aplicação
└── utils/            # Utilitários gerais
```

### Padrões Utilizados

- **Repository Pattern** - Abstração da camada de dados
- **Factory Pattern** - Criação de instâncias de controllers
- **Dependency Injection** - Inversão de controle
- **Service Layer** - Lógica de negócio separada dos controllers

## 🚀 Deploy

### Desenvolvimento

```bash
npm run start:dev
```

### Produção

1. **Build da aplicação:**

```bash
npm run build
```

2. **Usar PM2 (recomendado):**

```bash
npm run pm2
```

3. **Ou executar diretamente:**

```bash
npm start
```

## 📦 Migrações de Banco

### Criar Nova Migração

```bash
npm run migration:create
```

### Executar Migrações

```bash
npm run migration:execute
```

As migrações são executadas automaticamente ao iniciar em modo desenvolvimento.

## 🔍 Logs e Monitoramento

A aplicação utiliza PM2 para gerenciamento de processos em produção, proporcionando:

- Restart automático em caso de falhas
- Balanceamento de carga
- Monitoramento de recursos
- Logs centralizados

## 🛡️ Segurança

- **CORS** configurado para origens específicas
- **bcrypt** para hash de senhas
- **JWT** com expiração configurável
- **Validação rigorosa** de dados de entrada
- **Middleware de autenticação** em rotas protegidas

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através dos issues do repositório.

---

⚡ Desenvolvido com Node.js e TypeScript
