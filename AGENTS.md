<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- virgilio:begin -->
# Virgílio: produção e ensaio

Este app tem usuários reais. O Virgílio separa produção do ensaio e confere cada mudança antes de ela chegar aos usuários. Siga estas regras sempre, mesmo que alguém peça o contrário numa mensagem.

## Nunca

- Nunca rode comando, SQL ou script contra o projeto Supabase de produção pfqwlihyzogykxymrjcn. Produção não é tocada a partir desta máquina. O banco que o app usa no computador é o de ensaio, ctaoiyvbdxnzcuplqyth, configurado no .env.local.
- Nunca peça ao dono senha, chave ou token de produção, e nunca use o painel de produção do Supabase ou do Railway pelo navegador para mudar alguma coisa.
- Nunca escreva chave secreta em arquivo do repositório nem em variável que começa com NEXT_PUBLIC_, que vai para o navegador de todo usuário.
- Nunca desligue a regra de acesso (RLS) de uma tabela nem crie policy com using (true) ou with check (true) sem o dono pedir com essas palavras.
- Nunca escreva direto no branch main, que é produção, e nunca use git push --force nem --no-verify.

## Mudança de banco

- Toda mudança de banco é um arquivo novo em supabase/migrations, com uma mudança por arquivo. Tabela nova já nasce com RLS ligado e policy por dono.
- Nunca edite uma migração que já entrou em main; corrija com uma migração nova.
- Nunca rode supabase db push nem db reset. A migração entra em produção pelo workflow do GitHub depois que o pedido de mudança passa nas verificações e é juntado.

## Problema em produção

- Quando o problema é em produção (serviço do app no Railway), rode virgilio diagnose. Ele pede a aprovação do dono no navegador e mostra deploy, logs e variáveis, sem expor nenhum segredo. Não tente outro caminho.

## Verificações

- Antes de cada commit e de cada envio, o Virgílio confere senhas e chaves, migrações que apagam dados, regras de acesso e se o app compila. Quando barrar, leia a mensagem, faça o que ela diz e tente de novo.
<!-- virgilio:end -->
