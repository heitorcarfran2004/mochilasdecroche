# Funil — 50 Projetos de Mochilas em Crochê

Página de vendas do e-book em `Downloads/Mochilas 2.0/50 Projetos de Mochilas em Croche.pdf`.
É uma cópia fiel da estrutura e do layout de `funis/brincos-micanga` (micangasdajuh.vercel.app),
com a paleta da coleção de mochilas (rosé, vinho, creme) no lugar do coral/turquesa.

    node servidor.cjs     # http://localhost:4190

## Como o index é gerado — NÃO editar o index.html à mão

    node funis/mochilas-croche/_montar.cjs         # index.html
    node funis/mochilas-croche/_montar-promo.cjs   # promo.html

- O `_montar.cjs` pega o CSS e o JS **da página de miçanga**, troca a paleta e junta com o
  corpo próprio em `_corpo.html`. Amostras, provas e bônus são gerados por listas no script.
- Correção ou melhoria de CSS/JS feita na micanga chega aqui rodando o script de novo.
- Texto de seção se edita no `_corpo.html`; lista de amostras, prints e bônus no `_montar.cjs`.

## Wiapy (cadastrado em 14/09/2026)

- Produto: **50 Projetos de Mochilas em Crochê** (id 6aa7b60c6239131e9490db54), entrega por link: seção "Acesse sua Compra" com dois links para https://ateliedamari.vercel.app/
- Checkout: id 6aa7b7686239131e9490ef0e, e-mail de suporte validado, entrega e recuperação por WhatsApp ativas, sem orderbump e sem upsell
  - R$ 10,00 Pacote Básico — https://pay.wiapy.com/e-o2PNUIe9m
  - R$ 25,90 Pacote Completo — https://pay.wiapy.com/pYw2DaVsqSfq
  - R$ 16,90 popup de upsell — https://pay.wiapy.com/mlk-f4C6_Hv-
  - R$ 8,90 página de saída — https://pay.wiapy.com/grWFJBz5UgAE
- Visual: cronômetro + banner (entregaveis/checkout-mochilas/banner-checkout.jpg) + 3 depoimentos + garantia, igual ao da micanga

UTMify e back redirect (para https://mochilasdecroche.vercel.app/promo) já instalados. Falta: e-mail de contato e CNPJ no rodapé.

## Imagens da página

Todas vieram prontas da pasta `Downloads/imagens p site` (14/09/2026): `hero.jpeg` (hero),
`carossel 1..11` (carrossel de amostras, **na ordem dele**),
`depoimento 1..6` e os prints `1..9.png` da Shopee, já recortados. Mesmos tamanhos dos da
micanga (hero 1100², prints 520x794, depoimentos 560x1059), então o CSS não precisou de ajuste.

## O que você recebe — as 3 páginas da receita

Em vez de foto ilustrativa, a seção mostra as 3 páginas REAIS da Receita 01 (Mochila Bicolor,
arquivos 1, 2 e 3 do Entregável) em 3 cards empilhados: página à esquerda, etapa e texto à
direita, e uma faixa enxuta de 4 benefícios embaixo. Tocar na página abre a versão grande
(assets/receita/pN-full.webp, que só baixa no toque) num visualizador que não mexe no histórico,
então não dispara o back redirect. Testado por CDP: abre, trava o scroll, fecha, sem erro de JS.

## Prova de mercado

9 prints de anúncios da **Shopee de setembro de 2026**, com preço e quantidade vendida
(R$ 185,02 a R$ 352,00; o mais vendido tem 244). O **custo médio de R$ 40** e o piso de
**R$ 200** no "o que estão cobrando" são decisão do Heitor: custo medido com linha de malha
comum, puxado pelas mochilas infantis. Ao atualizar preço, atualizar a data na nota da seção.

## Bônus

As 5 capas foram geradas no ChatGPT seguindo o modelo das capas da micanga (banner 16:9,
livro em 3D à esquerda, páginas abertas à direita). Pedidos em
`entregaveis/bonus-mochilas/capas.cjs`; ciclo em `scripts/moch-capas-ciclo.sh`; conversão
para a página em `scripts/moch-capas-assets.sh`.

| | bônus | valor |
|---|---|---|
| 1 | 30 Carteiras de Crochê (capa feita a partir das fotos de carteira enviadas) | R$ 47 |
| 2 | Dicionário de Pontos Ilustrado | R$ 37 |
| 3 | Guia de Forro, Zíper e Ferragens | R$ 47 |
| 4 | Como Precificar e Vender | R$ 57 |
| 5 | Guia de Fios e Lista de Compras | R$ 29 |

**O conteúdo dos bônus ainda não existe** — só as capas. Precisa ser produzido antes da
primeira entrega. O plano Essencial (R$ 10) não leva bônus ("só as receitas").
