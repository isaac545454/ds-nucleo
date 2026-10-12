# Nucleus para agentes: rules e MCP

Spike do [TES-5](https://linear.app/teste-arquitetura/issue/TES-5/avaliar-como-deixar-o-nucleus-mais-amigavel-para-ai-rules-vs-mcp-via).

## Recomendação

Usar os dois, com papéis separados.

- **Rules** (`AGENTS.md` na raiz) guardam só convenção estável: de onde importar, CSS e preset do Tailwind, tokens semânticos, qual overlay usar e o que não reinventar.
- **MCP do Storybook** é a fonte do catálogo: componente, props, variants e exemplo. O agente lê o manifesto gerado das stories. Ninguém mantém uma segunda lista.

Rules sozinhas envelhecem no primeiro `variant` novo. MCP sozinho não diz como instalar o pacote nem escolhe entre `Dialog` e `AlertDialog`, e exige um servidor no ar.

Não criar `.cursor/rules` além do `AGENTS.md`. Os dois arquivos diriam a mesma coisa, e o `AGENTS.md` vale para outros agentes, não só para o Cursor.

## O que cada abordagem cobre

| Critério | Só rules | Só MCP | Os dois |
|---|---|---|---|
| Componente e variant que a story documenta | Só se a rule copiar o catálogo | `docs-list`, `docs-show`, `docs-show-story` | MCP |
| Fonte de verdade única | Não: a rule vira um catálogo congelado | Sim: manifesto sai do CSF | Sim |
| Custo quando nasce uma prop ou story | Editar a rule | Nenhum, no próximo publish | Nenhum no catálogo; a rule só muda se a convenção mudar |
| Quem consome `@isaac545454/nucleus` | A rule deste repo não viaja no pacote | Sim, se o MCP de docs estiver publicado | Convenção curta copiada uma vez + MCP publicado |
| Setup | Zero | Servidor e, no remoto, auth do Chromatic | Igual ao MCP, mais um arquivo de convenção |

## Por que o MCP não substitui a rule

O addon oficial é [`@storybook/addon-mcp`](https://storybook.js.org/docs/ai/mcp/overview) `10.6.1`, o mesmo major do `storybook` e do `@storybook/react-vite` deste repo (`^10.6.1`). O peer `@storybook/addon-vitest` é opcional.

Três toolsets, papéis diferentes:

- **docs** (`docs-list`, `docs-show`, `docs-show-story`) lê o manifesto de componentes. É o que o consumidor precisa. No React ele existe quando `features.componentsManifest` está ligado. Hoje está desligado em `.storybook/main.ts`.
- **dev** (`get-storybook-story-instructions`, `stories-preview`, e outros) serve para quem escreve story neste repositório. Não ajuda a app que só instala o pacote.
- **test** (`test-run`) exige `@storybook/addon-vitest`, que este repo não tem. Fica de fora.

O servidor local sobe junto com `pnpm run storybook`, em `http://localhost:6006/mcp`. Isso só existe para quem está com este repo aberto.

Para quem consome o pacote, a documentação do Storybook separa o toolset de docs e manda [publicá-lo](https://storybook.js.org/docs/ai/mcp/sharing). O caminho mais barato aqui é o que o CI já faz: publicar o Storybook no Chromatic. Com o manifesto ligado, o Chromatic publica o MCP de docs no mesmo projeto. Projeto privado continua privado (convite do Chromatic). Não há servidor nosso para operar.

`@storybook/mcp@10.6.1` existe para self-host a partir de `components.json` / `docs.json`. Não vale a pena enquanto o Chromatic já publica o Storybook.

O `AGENTS.md` não entra no `files` do `package.json`. Instalar `@isaac545454/nucleus` não entrega a rule. O consumidor cola o bloco de convenção no `AGENTS.md` da app dele e aponta o agente para a URL publicada do MCP. A URL ainda não existe: o manifesto não está ligado e o `chromatic.config.json` não guarda o id do projeto.

## O que foi verificado

- 28 stories em `src/components/ui/**/*.stories.tsx`, uma por componente exportado em `src/index.ts`, com `tags: ["autodocs"]`. Não há MDX.
- Não existe `AGENTS.md` nem `.cursor/rules`. O `README.md` tem uma tabela de componentes: é o tipo de catálogo que este spike evita crescer.
- `Button`: as variants e os sizes de `button.tsx` (`cva`) são os mesmos do `argTypes` da story (`default`, `secondary`, `destructive`, `outline`, `ghost`, `link` e `default`, `sm`, `lg`, `icon`). Uma rule que copiasse essa lista mentiria no próximo variant.
- `.storybook/main.ts` não registra `@storybook/addon-mcp` e não liga `componentsManifest`.
- No npm, `@storybook/addon-mcp@10.6.1` declara peer `storybook@^10.6.1`. `@storybook/addon-vitest` é peer opcional. `@storybook/mcp@10.6.1` é o pacote de self-host.
- O job `chromatic` do CI em `master` publica o Storybook com `CHROMATIC_PROJECT_TOKEN`. É o gancho do MCP remoto. O id do projeto não está no repositório.

## O que ficou de fora

- Não subimos o Storybook com o addon nem chamamos `docs-list`. A API do MCP ainda está em preview.
- Não publicamos a URL do MCP no Chromatic. Falta o manifesto e o id do projeto; o token fica no secret do CI.
- Não ligamos o toolset de teste nem instalamos `@storybook/addon-vitest`.
- Não fizemos self-host com `@storybook/mcp`.
- Não colocamos `storybook.url` no `package.json` para composition. Isso pede a URL publicada, que este spike não tem.

## Próximo passo

Quando for ligar o catálogo ao vivo, nesta ordem:

1. Registrar `@storybook/addon-mcp` e `features.componentsManifest: true` em `.storybook/main.ts`.
2. Deixar o toolset `test` desligado até existir `@storybook/addon-vitest`.
3. Publicar pelo Chromatic que o CI já roda e anotar a URL do MCP para os consumidores.
4. No `AGENTS.md` das apps, manter o bloco de convenção e trocar a leitura da story local por `docs-list` / `docs-show`.
