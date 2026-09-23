# Sistema de Solicitações

**Nome:** Ingridy Luzia Silva Candido
**Matrícula:** 20251038060006

## 📋 Sobre o projeto

API para gerenciamento de solicitações, com autenticação de usuários e controle de acesso por perfil.

O projeto utiliza Docker para facilitar a instalação das dependências e a execução da aplicação.

## 🚀 Como executar o projeto

### 1. Clonar o repositório

Clone o repositório para sua máquina:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd NOME_DA_PASTA
```

### 2. Configurar as variáveis de ambiente

Crie o arquivo `.env` a partir do arquivo `.env.example`:

```bash
cp .env.example .env
```

No Windows, caso o comando acima não funcione, você pode simplesmente copiar o arquivo `.env.example`, renomeá-lo para `.env` e preencher os valores necessários.

Defina principalmente o valor da variável:

```env
JWT_SECRET=sua_chave_secreta
```

> A `JWT_SECRET` deve ser uma chave utilizada pela aplicação para assinar e validar os tokens JWT.

### 3. Iniciar a aplicação

Execute:

```bash
docker compose up
```

O Docker irá instalar as dependências necessárias e iniciar a aplicação.

Após a inicialização, a API estará disponível em:

```text
http://localhost:3000
```

## 🔐 Usuários para teste

Utilize os seguintes usuários para testar os diferentes perfis da aplicação:

| E-mail                | Perfil      |
| --------------------- | ----------- |
| `ingridy@empresa.com` | Gestor      |
| `bruno@empresa.com`   | Solicitante |
| `candido@empresa.com` | Auditor     |

### Senhas

Para o usuário **Gestor**, utilize a senha definida de acordo com a regra de senha solicitada no projeto.

Os demais usuários podem ser utilizados conforme as credenciais configuradas na aplicação.

## 🧪 Testando a API

Você pode utilizar ferramentas como **Postman** ou **Thunder Client** para realizar os testes das rotas.

### Login

**POST**

```text
http://localhost:3000/auth/login
```

Utilize as credenciais de um dos usuários cadastrados.

Após realizar o login, utilize o token JWT retornado para acessar as rotas protegidas.

### Consultar perfil

**GET**

```text
http://localhost:3000/auth/perfil
```

Essa rota permite consultar as informações do usuário autenticado.

### Relatório de solicitações

**GET**

```text
http://localhost:3000/solicitacoes/relatorio
```

Essa rota permite consultar o relatório de solicitações de acordo com as permissões do usuário autenticado.

### Aprovar solicitação

**PATCH**

```text
http://localhost:3000/solicitacoes/:id/aprovar
```

Substitua `:id` pelo identificador da solicitação que deseja aprovar.

Exemplo:

```text
http://localhost:3000/solicitacoes/1/aprovar
```

## 📌 Rotas principais

| Método | Rota                        | Descrição                                |
| ------ | --------------------------- | ---------------------------------------- |
| POST   | `/auth/login`               | Realiza o login                          |
| GET    | `/auth/perfil`              | Consulta o perfil do usuário autenticado |
| GET    | `/solicitacoes/relatorio`   | Consulta o relatório de solicitações     |
| PATCH  | `/solicitacoes/:id/aprovar` | Aprova uma solicitação                   |

## 🛑 Encerrando a aplicação

Para encerrar a aplicação executada pelo Docker, pressione:

```text
Ctrl + C
```

Caso queira remover os containers após a execução:

```bash
docker compose down
```
