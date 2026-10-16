# Airbnb — comparação de estadias

Lista de seis hospedagens em Natal para 18–19/10/2026, com galerias, detalhes e avaliações de Samuel e Alicia.

## Executar localmente

Requer Node.js 22.13 ou superior.

```sh
npm install
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_flippant_liz_osborn.sql
npm run dev
```

Abra http://127.0.0.1:5173/. A migração deve ser aplicada apenas uma vez em cada banco local novo.

## Dados

- `data/stays.json`: anúncios cadastrados, para importar em um banco novo. Não inclui votos.
- `app/galleries.json`: URLs das fotos de cada anúncio.
- `drizzle/`: migrações do banco D1.
- `app/api/stays/route.ts`: cadastro, consulta e votação.

Para importar os anúncios com o servidor local aberto, execute `node scripts/seed-stays.mjs`. O script evita duplicados pelo ID do anúncio.

Os votos e cadastros do site publicado ficam no D1 e não são versionados no Git. Imagens são carregadas das URLs do Airbnb. Acesso e publicação usam a configuração do Sites em `.openai/hosting.json`.
