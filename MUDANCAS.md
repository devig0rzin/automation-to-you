# ATY 2.0: o que mudou no site

## Posicionamento
O site agora vende **site primeiro**. A automação aparece como o próximo passo, com o simulador de WhatsApp mantido.

## Nova ordem da página
1. **Topo + "Como nasce seu site"** (`components/journey/`). Um site de exemplo (Studio Aurora, negócio fictício) aparece pronto no topo. Conforme a pessoa rola, ele se desmonta em 3D nas etapas do processo (briefing, estrutura, design, código revisado, integrações) e volta montado, "no ar".
2. **Faixa de segmentos** (`SegmentsMarquee.tsx`). Tipos de negócio passando devagar.
3. **Projetos** (`ProjectsSection.tsx`). Clientes e projetos próprios, todos com o mesmo mockup (computador + celular). Cada um tem um vídeo curto que toca sozinho, sem som, só enquanto aparece na tela (no celular vai uma versão mais leve).
4. **O que vem pronto** (`IncludedSection.tsx`). Mini telas animadas de pagamento, WhatsApp, agenda e velocidade, mais uma lista curta com o resto.
5. **A IA acelera, o programador decide** (`HumanAISection.tsx`). Comparação entre site feito só com IA e site feito com a ATY.
6. **Tipos de site** (`SiteTypesSection.tsx`). Landing page, institucional, vendas/agenda e sob medida, sem preço. Cada tipo tem um botão de WhatsApp com a mensagem já escrita.
7. **Manutenção** (`MaintenanceSection.tsx`). O pacote completo, com um painel ilustrativo do site sendo acompanhado.
8. **Automação** (`AutomationBridge.tsx`) seguida do **simulador**. O chat agora usa o modo claro do WhatsApp com os fundos novos, as fotos novas dos atendentes e o selo "Assistente virtual". O atendente do modelo personalizado passou a se chamar Alex, igual à foto.
9. **Dúvidas** (`FaqSection.tsx`), com dados estruturados de FAQ para o Google.
10. **Contato final** (`FinalCTA.tsx`) e rodapé novo.

## Outras mudanças
- **Tela de carregamento removida.** Era um atraso artificial de cerca de 2,5 s antes de mostrar qualquer coisa.
- **Brilho que seguia o cursor removido.**
- **Fontes servidas pelo próprio site** (Bricolage Grotesque e Geist), sem depender do Google Fonts.
- **Arquivos limpos.** Saíram 26 arquivos de código que não eram mais usados e uns 44 MB de vídeos e imagens que nenhuma página carregava.
- **Link do GitHub removido** do site e do rodapé.
- **Novo título e descrição para o Google**, e uma imagem nova para quando o link for compartilhado (`public/og-image.jpg`).
- **Número e e-mail centralizados** em `client/src/lib/site.ts`. Se trocar algum, troque só lá.
- **Animação no celular.** A montagem 3D roda igual no celular, com o site de exemplo maior e balançando de leve no topo. Quem liga "reduzir movimento" no sistema continua vendo a montagem no scroll, só sem os efeitos automáticos.
- **Revelações no scroll** em todas as seções, iguais no celular e no computador.

## Para revisar antes de publicar
- **Foto do site de exemplo (topo):** fica em `client/public/studio-aurora/hero.webp` (3:2). Para trocar, é só substituir o arquivo.
- **Mockup do Next Phase:** a IA embaralhou uma linha de texto na tela do celular ("Full trim aeckaeen eupoie kitchens"). Dá para gerar de novo ou montar no Shots.so.
- **Novos projetos:** as instruções para adicionar estão no topo do `ProjectsSection.tsx`.
- **Plano de manutenção:** confira se os itens da seção batem com o que você entrega hoje.
- **Prazos:** o FAQ diz que o prazo vem na proposta. Se você tiver prazos médios por tipo de site, colocar no site vende mais.
- **E-mail:** o contato é `contato@automationtoyou.com`, sem o `.br`. Confira se é esse mesmo.
- **Espaço Néia:** o site ainda está num endereço `.vercel.app`. Vale apontar um domínio próprio.
- **Promessas:** confira se tudo o que está em "O que vem pronto" e "Tipos de site" é algo que você entrega hoje.

## Rodar
```bash
pnpm install
pnpm dev
```
