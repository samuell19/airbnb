# Airbnb — Render + Postgres

Comparação de seis hospedagens, com galerias, detalhes e votos de Samuel e Alicia.

## Configurar o serviço existente no Render

1. Crie **New → Postgres**, na mesma região do Web Service. Copie o **Internal Database URL**.
2. No Web Service → **Environment**, configure:
   - `DATABASE_URL`: Internal Database URL do Postgres.
   - `APP_ORIGIN`: URL pública exata do serviço, sem barra final, por exemplo `https://airbnb-xxxx.onrender.com`.
   - `NODE_VERSION`: `22.16.0`.
3. Em **Settings → Build & Deploy**:
   - Root Directory: vazio (package.json está na raiz do repositório).
   - Build Command: `npm ci && npm run build`
   - Start Command: `npm start`
   - Pre-Deploy Command: vazio.
4. Clique **Manual Deploy → Deploy latest commit**. Se necessário, use **Clear build cache & deploy** para descartar o build antigo da Cloudflare.

O start prepara o banco e importa os seis anúncios sem duplicar ou apagar registros. Os votos ficam no Postgres e sobrevivem a reinícios e deploys. O serviço falha com uma mensagem clara se DATABASE_URL estiver ausente; não usa armazenamento temporário como banco.

`render.yaml` também permite criar um novo serviço e banco via Blueprint. Revise os planos escolhidos no Render antes de criar recursos. O site no Render ficará acessível pela URL pública; os nomes Samuel/Alicia são perfis de votação simples, sem autenticação.

## Local

Requer Node 22.13+ e Postgres. Copie `.env.example` para `.env.local` e preencha as variáveis. Para executar o setup, exporte DATABASE_URL no terminal, depois:

```sh
npm ci
npm run db:setup
npm run dev
```

Para verificar a versão de produção: `npm run build` e `npm start` (com DATABASE_URL configurada). O servidor usa `0.0.0.0` e a variável `PORT` fornecida pelo Render.

## Dados e código

- `data/stays.json`: snapshot dos seis anúncios publicados, com IDs preservados.
- `data/votes.json`: snapshot de referência da migração (nenhum voto existia no site publicado na exportação).
- `app/galleries.json`: galerias dos anúncios.
- `db/postgres.mjs`: conexão, preparação transacional e seed idempotente.
- `app/api/stays/route.ts`: API Node/Postgres.

Arquivos legados da hospedagem Sites/Cloudflare permanecem como referência, mas não são usados por `dev`, `build` ou `start`. A instância Cloudflare já publicada é independente; esta adaptação tem como destino o Render.
