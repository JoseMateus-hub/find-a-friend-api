# 🐾 Find A Friend API

API para adoção de animais desenvolvida com Node.js, Fastify, TypeScript e PostgreSQL.

## 📋 Sobre o projeto

Sistema de adoção de animais que permite o cadastro de ORGs e pets, listagem de animais por cidade com filtros por características. O contato para adoção é feito via WhatsApp diretamente com a ORG responsável pelo pet.

## 🚀 Tecnologias

- Node.js
- Fastify
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- JWT
- Zod
- Vitest

## 📌 Funcionalidades

- Cadastro de ORG
- Autenticação de ORG com JWT
- Cadastro de pet (rota protegida)
- Listagem de pets por cidade com filtros

## 🔧 Como rodar o projeto

### Pré-requisitos

- Node.js
- Docker

### Instalação

```bash
# Clone o repositório
git clone https://github.com/JoseMateus-hub/find-a-friend-api.git

# Entre na pasta
cd find-a-friend-api

# Instale as dependências
npm install

# Suba o banco de dados
docker-compose up -d

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
```

## 🧪 Testes

```bash
npm run test
```

## 📝 Rotas

### ORGs
| Método | Rota | Descrição |
|---|---|---|
| POST | /orgs | Cadastro de ORG |
| POST | /sessions | Autenticação de ORG |

### Pets
| Método | Rota | Descrição |
|---|---|---|
| POST | /pets | Cadastro de pet (autenticado) |
| GET | /pets?city= | Listagem de pets por cidade |
