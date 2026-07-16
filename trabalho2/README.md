# Miraculous Wiki - Trabalho de Programação IV

Aplicação full-stack que transforma a wiki estática do primeiro trabalho em um sistema dinâmico. O front-end usa `fetch` para consumir uma API REST desenvolvida em NestJS. Os conteúdos e usuários são persistidos no MySQL e todas as rotas de conteúdo exigem autenticação JWT.

## Requisitos atendidos

- Entidade `Content` com título, texto, URL de imagem e ordem de apresentação.
- CRUD completo: criar, listar, buscar por id, editar e excluir.
- Ordenação crescente por `displayOrder`, com `id` como desempate.
- Front-end sem array de conteúdos estáticos: os cards são renderizados a partir da API.
- Área administrativa para cadastrar, editar e excluir conteúdos.
- Entidade `User`, cadastro, login, hash de senha com bcrypt e emissão de JWT.
- Todas as rotas `/api/contents` protegidas pelo `JwtAuthGuard`.
- Validação de entrada com `class-validator` e tratamento de erros HTTP.
- Migração versionada para criação das tabelas.
- Seed opcional com usuário e conteúdos iniciais.
- Testes unitários das regras de negócio, autenticação e rotas do controller.

## Tecnologias

- Front-end: HTML5, CSS3 e JavaScript assíncrono (`fetch`, `async/await`).
- Back-end: Node.js, TypeScript e NestJS.
- Banco de dados: MySQL 8 e TypeORM no padrão Data Mapper.
- Segurança: Passport, JWT e bcrypt.
- Testes: Jest e utilitários de teste do NestJS.

## Pré-requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.
- Docker Desktop, ou uma instalação local do MySQL 8.

## Instalação e execução

Na raiz do projeto, execute:

```bash
docker compose up -d
npm run install:all
```

Crie o arquivo de ambiente do back-end:

```bash
cp backend/.env.example backend/.env
```

Antes de entregar ou publicar, substitua `JWT_SECRET` no arquivo `backend/.env` por uma chave longa e particular.

Crie as tabelas e insira dados iniciais:

```bash
npm run migration:run
npm run seed
```

Inicie a aplicação:

```bash
npm start
```

Acesse `http://localhost:3000`. O NestJS serve tanto a API quanto o front-end, portanto não é necessário usar Live Server.

### Usuário inicial do seed

- E-mail: `admin@miraculous.com`
- Senha: `Miraculous123!`

O cadastro de novos usuários também está disponível na própria tela inicial. A credencial acima é apenas para desenvolvimento e demonstração.

## Configuração do ambiente

| Variável | Exemplo | Finalidade |
|---|---|---|
| `PORT` | `3000` | Porta HTTP da aplicação |
| `DB_HOST` | `localhost` | Servidor MySQL |
| `DB_PORT` | `3306` | Porta do MySQL |
| `DB_USERNAME` | `miraculous` | Usuário do banco |
| `DB_PASSWORD` | `miraculous123` | Senha do banco |
| `DB_DATABASE` | `miraculous_wiki` | Nome do banco |
| `JWT_SECRET` | chave longa | Assinatura dos tokens |
| `JWT_EXPIRES_IN` | `1h` | Validade do token |

## Endpoints da API

URL-base: `http://localhost:3000/api`

| Método | Endpoint | Autenticação | Função |
|---|---|---|---|
| `POST` | `/auth/register` | Não | Cadastra usuário e devolve token |
| `POST` | `/auth/login` | Não | Valida credenciais e devolve token |
| `GET` | `/contents` | Bearer JWT | Lista conteúdos ordenados |
| `GET` | `/contents/:id` | Bearer JWT | Busca um conteúdo |
| `POST` | `/contents` | Bearer JWT | Cria conteúdo |
| `PATCH` | `/contents/:id` | Bearer JWT | Atualiza campos do conteúdo |
| `DELETE` | `/contents/:id` | Bearer JWT | Exclui conteúdo |

### Exemplo de cadastro

```json
POST /api/auth/register
{
  "name": "Vitória",
  "email": "vitoria@email.com",
  "password": "senha123"
}
```

### Exemplo de criação de conteúdo

Envie o cabeçalho `Authorization: Bearer SEU_TOKEN`.

```json
POST /api/contents
{
  "title": "Ladybug",
  "text": "Texto com pelo menos dez caracteres.",
  "image": "https://exemplo.com/ladybug.jpg",
  "displayOrder": 1
}
```

## Testes

Execute toda a suíte:

```bash
npm test
```

Para gerar o relatório de cobertura:

```bash
cd backend
npm run test:cov
```

Os testes usam repositórios simulados (mocks), então não precisam de uma conexão ativa com o MySQL.

## Estrutura principal

```text
miraculous-wiki/
├── backend/
│   ├── src/auth/          # usuários, login, JWT e guard
│   ├── src/contents/      # entidade, DTOs, controller, service e testes
│   └── src/database/      # conexão, migration e seed
├── frontend/              # HTML, CSS, JavaScript e cursor
├── docker-compose.yml     # MySQL de desenvolvimento
└── README.md              # documentação do projeto
```

## Decisões importantes

- `synchronize` fica desativado para evitar alterações automáticas e destrutivas no esquema; a estrutura é criada por migration.
- A senha nunca é salva em texto puro. Apenas o hash do bcrypt é persistido.
- A interface monta título e texto com `textContent`, reduzindo o risco de injeção de HTML.
- O token fica em `sessionStorage` e é apagado ao fechar a sessão do navegador ou clicar em **Sair**.
