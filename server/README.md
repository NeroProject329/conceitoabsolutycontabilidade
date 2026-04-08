# API do Painel (troca de números + cliques)

Backend em Node + Express com SQLite.

## Uso

Na **raiz do projeto**, um único comando sobe o site e a API:

```bash
npm install   # uma vez (instala deps do site e do servidor)
npm run dev   # sobe o Vite + API juntos
```

- **Site:** http://localhost:8080 (ou outra porta se 8080 estiver em uso)
- **API:** http://localhost:3001

O Vite faz proxy de `/api` para a porta 3001 em desenvolvimento.

Para rodar só a API (ex.: debug): `npm run dev:server`.  
Para rodar só o site: `npm run dev:site`.

## Credenciais padrão

- **Usuário:** `admin`
- **Senha:** `admin123`

(O banco cria esse usuário na primeira execução. Troque a senha em produção.)

## Banco de dados

- Arquivo: `server/data/painel.db` (SQLite)
- Tabelas: `users`, `numbers`

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/login | Login (body: username, password) |
| POST | /api/logout | Logout (header: Authorization Bearer) |
| GET | /api/numbers | Listar números (auth) |
| POST | /api/numbers | Adicionar número (auth) |
| PATCH | /api/numbers/:id | Ativar/desativar (auth) |
| DELETE | /api/numbers/:id | Excluir número (auth) |
| GET | /api/active-number | Número ativo e link WhatsApp (público) |
| POST | /api/click | Registrar clique no ativo e retornar URL (público) |

## Painel no front

- Login: `/painel/login`
- Dashboard: `/painel` (após login)

Os botões "Consultar Grátis" e o FAB do WhatsApp registram um clique no número ativo e abrem o link do WhatsApp.
