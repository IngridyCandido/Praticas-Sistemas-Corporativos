# 📋 Sistema de Solicitações

API para gerenciamento de solicitações, desenvolvida como atividade prática da disciplina de **Práticas de Sistemas Corporativos**.

O sistema possui autenticação de usuários, controle de acesso por perfil, gerenciamento de solicitações, aprovação e rejeição, controle de versão, auditoria e relatório.

---

## 👩‍💻 Identificação

**Nome:** Ingridy Luzia Silva Candido
**Matrícula:** 20251038060006

---

## 📌 Sobre o projeto

O **Sistema de Solicitações** é uma API REST desenvolvida para simular o fluxo de solicitações de uma organização.

O sistema permite:

* 🔐 Autenticação de usuários;
* 👥 Controle de acesso por perfil;
* 📝 Criação de solicitações;
* 📋 Listagem e consulta de solicitações;
* 🔎 Filtragem por status, centro de custo e prioridade;
* ✅ Aprovação de solicitações;
* ❌ Rejeição de solicitações com justificativa;
* 🔄 Controle de versão para evitar alterações concorrentes;
* 🧾 Registro de ações em auditoria;
* 📊 Relatório de solicitações;
* 🗄️ Persistência dos dados em PostgreSQL;
* 🐳 Execução do ambiente utilizando Docker.

---

## 🛠️ Tecnologias utilizadas

* **Node.js**
* **NestJS**
* **TypeScript**
* **TypeORM**
* **PostgreSQL**
* **Docker**
* **Docker Compose**
* **JWT**
* **bcrypt**
* **class-validator**
* **Vitest**

---

# 🚀 Como executar o projeto

## 1. Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

O projeto utiliza Docker para executar a API e o banco de dados, portanto o Docker Desktop deve estar em execução.

Para verificar a instalação:

```bash
git --version
docker --version
docker compose version
```

---

## 2. Clonar o repositório

Clone o projeto:

```bash
git clone https://github.com/IngridyCandido/Praticas-Sistemas-Corporativos.git
```

Entre na pasta:

```bash
cd Praticas-Sistemas-Corporativos
```

---

## 3. Configurar as variáveis de ambiente

Crie o arquivo `.env` a partir do `.env.example`.

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

### Linux/macOS

```bash
cp .env.example .env
```

Depois, abra o arquivo `.env` e confira as variáveis necessárias.

A aplicação utiliza, entre outras, uma chave secreta para autenticação JWT:

```env
JWT_SECRET=sua_chave_secreta
```

> ⚠️ O arquivo `.env` não deve ser enviado para o GitHub. Utilize o `.env.example` para documentar as variáveis necessárias.

---

## 4. Iniciar o projeto com Docker

Execute:

```bash
docker compose up --build
```

Na primeira execução, o Docker poderá baixar as imagens e instalar as dependências necessárias.

Quando a aplicação estiver funcionando, será exibida uma mensagem semelhante a:

```text
Nest application successfully started
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

# 🗄️ Banco de dados e migrations

O projeto utiliza **PostgreSQL** executado através do Docker.

As alterações estruturais do banco devem ser realizadas por meio de **migrations**.

Para executar as migrations:

```bash
docker compose run --rm api npm run migration:run
```

Para desfazer a última migration:

```bash
docker compose run --rm api npm run migration:revert
```

> As migrations são importantes principalmente ao executar o projeto pela primeira vez em outro computador.

---

# 🌱 Dados iniciais

Caso seja necessário carregar os dados iniciais disponibilizados pelo projeto, execute:

```bash
docker compose run --rm api npm run seed
```

> O seed deve ser executado conforme a necessidade do ambiente. Ele é utilizado para inserir dados iniciais de solicitações.

---

# 🔐 Usuários para teste

O sistema possui diferentes perfis de usuário.

| E-mail                | Perfil      |
| --------------------- | ----------- |
| `ingridy@empresa.com` | Gestor      |
| `bruno@empresa.com`   | Solicitante |
| `candido@empresa.com` | Auditor     |

### 🔑 Senhas

As senhas utilizadas pelos usuários seguem as configurações definidas no projeto.

> Para testes locais, utilize as credenciais configuradas no banco/seed do projeto.

---

# 🧪 Testando a API

A API pode ser testada utilizando ferramentas como:

* Postman
* Thunder Client
* Insomnia

## 🔐 Login

**POST**

```text
http://localhost:3000/auth/login
```

Envie as credenciais do usuário no corpo da requisição.

Exemplo:

```json
{
  "email": "ingridy@empresa.com",
  "senha": "SENHA_DO_USUARIO"
}
```

Após o login, a API retorna o token utilizado para acessar as rotas protegidas.

No Postman ou Thunder Client, envie o token no cabeçalho:

```text
Authorization: Bearer SEU_TOKEN
```

---

## 👤 Consultar perfil

**GET**

```text
http://localhost:3000/auth/perfil
```

Essa rota retorna as informações do usuário autenticado.

É necessário enviar o token JWT.

---

# 📝 Solicitações

## Criar solicitação

**POST**

```text
http://localhost:3000/solicitacoes
```

Exemplo de corpo:

```json
{
  "titulo": "Compra de equipamentos",
  "centroCusto": "TI",
  "prioridade": "normal"
}
```

A solicitação é criada inicialmente com o status:

```text
pendente
```

---

## 📋 Listar solicitações

**GET**

```text
http://localhost:3000/solicitacoes
```

A listagem permite consultar as solicitações cadastradas.

Também é possível utilizar filtros por:

* Status;
* Centro de custo;
* Prioridade.

---

## 🔎 Consultar uma solicitação

**GET**

```text
http://localhost:3000/solicitacoes/:id
```

Exemplo:

```text
http://localhost:3000/solicitacoes/1
```

---

## 📊 Relatório de solicitações

**GET**

```text
http://localhost:3000/solicitacoes/relatorio
```

Retorna informações consolidadas das solicitações, incluindo seus diferentes status.

---

# ✅ Aprovar solicitação

A aprovação é uma operação restrita ao perfil autorizado.

**PATCH**

```text
http://localhost:3000/solicitacoes/:id/aprovar
```

Exemplo:

```text
http://localhost:3000/solicitacoes/1/aprovar
```

A aprovação utiliza controle de versão para evitar que uma solicitação seja alterada simultaneamente por operações concorrentes.

Exemplo de corpo:

```json
{
  "versao": 1
}
```

Após a aprovação, a versão da solicitação é incrementada.

---

# ❌ Rejeitar solicitação

**PATCH**

```text
http://localhost:3000/solicitacoes/:id/rejeitar
```

Exemplo:

```text
http://localhost:3000/solicitacoes/1/rejeitar
```

A rejeição também utiliza controle de versão e exige uma justificativa.

Exemplo:

```json
{
  "versao": 1,
  "justificativa": "Solicitação não aprovada neste momento."
}
```

---

# 🧾 Auditoria

As operações relevantes realizadas no sistema são registradas em uma estrutura de auditoria.

Entre as ações registradas estão:

* Aprovação de solicitação;
* Rejeição de solicitação;
* Identificação do usuário responsável;
* Recurso afetado;
* Versão anterior;
* Informações adicionais da operação.

Isso permite manter um histórico das alterações realizadas no sistema.

---

# 🔒 Controle de acesso

O sistema possui diferentes perfis de usuário e as operações disponíveis dependem das permissões associadas a cada perfil.

### 👤 Solicitante

Pode realizar operações relacionadas ao fluxo de criação e consulta de solicitações conforme as permissões definidas pela aplicação.

### 👨‍💼 Gestor

Possui permissões relacionadas à análise das solicitações, incluindo:

* Aprovação;
* Rejeição;
* Consulta de informações do processo.

### 🧾 Auditor

Possui acesso relacionado à consulta e acompanhamento das informações do sistema conforme as permissões definidas na aplicação.

---

# 🧪 Testes automatizados

O projeto utiliza **Vitest** para os testes automatizados.

Para executar os testes:

```bash
npm test
```

Para executar os testes em modo de observação:

```bash
npm run test:watch
```

Para executar os testes E2E:

```bash
npm run test:e2e
```

Os testes E2E verificam o funcionamento dos principais fluxos da aplicação.

---

# 📌 Principais rotas

| Método | Rota                         | Descrição                     |
| ------ | ---------------------------- | ----------------------------- |
| POST   | `/auth/login`                | Realiza login                 |
| GET    | `/auth/perfil`               | Consulta o perfil autenticado |
| POST   | `/solicitacoes`              | Cria uma solicitação          |
| GET    | `/solicitacoes`              | Lista solicitações            |
| GET    | `/solicitacoes/:id`          | Consulta uma solicitação      |
| GET    | `/solicitacoes/relatorio`    | Consulta o relatório          |
| PATCH  | `/solicitacoes/:id/aprovar`  | Aprova uma solicitação        |
| PATCH  | `/solicitacoes/:id/rejeitar` | Rejeita uma solicitação       |

> As rotas protegidas exigem autenticação e podem possuir restrições de acordo com o perfil do usuário.

---

# 🐳 Comandos Docker úteis

### Iniciar a aplicação

```bash
docker compose up
```

### Iniciar reconstruindo a imagem

```bash
docker compose up --build
```

### Executar em segundo plano

```bash
docker compose up -d
```

### Visualizar os logs

```bash
docker compose logs -f
```

### Executar um comando dentro de um novo container da API

```bash
docker compose run --rm api COMANDO
```

Exemplo:

```bash
docker compose run --rm api npm run migration:run
```

### Parar a aplicação

```bash
docker compose down
```

### Parar e remover os volumes

⚠️ Este comando remove também os dados persistidos nos volumes do Docker.

```bash
docker compose down -v
```

---

# 🛑 Encerrando a aplicação

Se a aplicação estiver rodando diretamente no terminal:

```text
Ctrl + C
```

Para parar os containers:

```bash
docker compose down
```

---

# 📂 Estrutura principal

```text
Praticas-Sistemas-Corporativos/
│
├── src/
│   ├── auth/
│   ├── usuarios/
│   ├── solicitacoes/
│   ├── auditoria/
│   └── estado/
│
├── test/
│
├── migrations/
│
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

---

## 👩‍💻 Desenvolvedora

**Ingridy Luzia Silva Candido**

Projeto desenvolvido para fins acadêmicos na formação em **Tecnologia em Sistemas para Internet (TSI)**.

[GitHub](https://github.com/IngridyCandido)
