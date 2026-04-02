# Assistente de Agenda

Projeto base em Next.js para check-in de pacientes em clínicas médicas.

## O que já vem pronto

- estrutura inicial em Next.js
- Tailwind configurado
- Prisma configurado
- schema inicial do banco
- seed com dados de teste
- rota de busca de agendamento
- rota de confirmação de check-in
- página de totem do paciente
- páginas iniciais de admin e médico

## Como rodar localmente

1. copie `.env.example` para `.env`
2. instale as dependências
3. rode as migrations do Prisma
4. rode o seed
5. inicie o projeto

```bash
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

## Dados de teste

- Paciente: Maria Silva
- CPF: 12345678901
- Data de nascimento: 1985-03-14

## Rotas

- `/` home
- `/kiosk` totem de check-in
- `/login` página de login inicial
- `/doctor` painel médico
- `/admin` painel administrativo

## Próximos passos sugeridos

- conectar o formulário de login ao Auth.js
- proteger rotas por perfil
- criar CRUD real de agendamentos no admin
- filtrar painel médico por usuário autenticado
- publicar no GitHub e depois na Vercel
