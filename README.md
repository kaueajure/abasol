# Aba Sol Energia Solar

Site institucional da Aba Sol, construído com React, vinext e Cloudflare Workers.

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

## Recebimento de leads

O simulador e o formulário de contato enviam os dados para `POST /api/leads`. O endpoint valida e sanitiza os campos, aplica proteção básica contra spam e só confirma sucesso quando o destino responde com sucesso.

Copie `.env.example` para `.env.local` e configure:

```text
LEADS_WEBHOOK_URL=https://seu-endpoint-de-leads.example/webhook
LEADS_WEBHOOK_SECRET=segredo-opcional
```

O webhook recebe tipo de imóvel, cidade, valor aproximado da conta quando aplicável, concessionária, nome, WhatsApp, e-mail, mensagem, consentimento, origem e horário do envio. Sem `LEADS_WEBHOOK_URL`, a API responde com indisponibilidade e o formulário preserva os dados para nova tentativa; nenhuma confirmação falsa é exibida.

## Conteúdo futuro

O modelo de projetos está em `app/content/projects.ts`. A lista pública permanece vazia até existirem dados técnicos confirmados, fotografias autorizadas e autorização de publicação.
