Nome: Ingridy Luzia Silva Candido
Matricula: 20261038060006

Clone o repositorio, clone as varias de ambiente do .envexample e defina o valor da JWT_SECRET em seguida der o comando no terminal: 
docker compose up
para instalar o node_modules e iniciar a aplicação;
Entre no Postman ou Thunder para testar as rotas: 

POST http://localhost:3000/auth/login
GET http://localhost:3000/auth/perfil
GET http://localhost:3000/solicitacoes/relatorio
PATCH http://localhost:3000/solicitacoes/:id/aprovar

Para tal utilize os perfis: 
ingridy@empresa.com
Gestor

bruno@empresa.com
Solicitante
segui a regra de senha do gestor

candido@empresa.com
auditor

para encerrar Ctrl+C
