
# Biblioteca API

Uma aplicação para gerenciar um sistema de biblioteca utilizando Node.js, Prisma e PostgreSQL.

---

## Índice
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Banco de Dados](#banco-de-dados)
- [Execução](#execução)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **PostgreSQL** (banco de dados)
- **DBBeaver** ou **PgAdmin** (opcional, para gerenciar o banco de dados)

---

## Instalação

1. Clone este repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-usuario/biblioteca-api.git
   cd biblioteca-api
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

---

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/biblioteca"
   DB_USER=postgres
   DB_HOST=localhost
   DB_DATABASE=biblioteca
   DB_PASSWORD=postgres
   DB_PORT=5432
   ```

2. Certifique-se de que as credenciais de acesso ao banco de dados sejam compatíveis com sua configuração local.

---

## Banco de Dados

1. Abra o **DBBeaver** ou **PgAdmin**.
2. Crie um banco de dados chamado `biblioteca` com as credenciais correspondentes:
   - **Usuário**: `postgres`
   - **Senha**: `postgres`
   - **Host**: `localhost`
   - **Porta**: `5432`

3. Certifique-se de que o banco de dados está rodando corretamente.

4. Utilize o Prisma para configurar o esquema do banco:
   ```bash
   npx prisma migrate dev
   ```

---

## Execução

Inicie a aplicação:
```bash
npm start
```

A aplicação estará disponível no endereço [http://localhost:3000](http://localhost:3000) por padrão (se configurado dessa forma).

---

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org) - Plataforma para execução de código JavaScript no servidor.
- [Prisma](https://www.prisma.io) - ORM para modelagem e manipulação do banco de dados.
- [PostgreSQL](https://www.postgresql.org) - Banco de dados relacional.
- [dotenv](https://github.com/motdotla/dotenv) - Gerenciamento de variáveis de ambiente.

---

