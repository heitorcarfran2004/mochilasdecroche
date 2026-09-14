// Monta o index.html das Mochilas a partir da pagina de micanga (mesmo CSS, mesmo JS,
// mesma estrutura) + o corpo proprio em _corpo.html. Rodar de novo sobrescreve o index.
//   node funis/mochilas-croche/_montar.cjs
const fs = require('fs');
const path = require('path');
const AQUI = __dirname;
const base = fs.readFileSync(path.join(AQUI, '..', 'brincos-micanga', 'index.html'), 'utf8').replace(/\r/g, '');
let corpo = fs.readFileSync(path.join(AQUI, '_corpo.html'), 'utf8').replace(/\r/g, '');

// ---------- head: CSS da micanga com a paleta da colecao de mochilas ----------
let css = base.slice(base.indexOf('<style>'), base.indexOf('</style>') + 8);
const PALETA = [
  ['--coral:#E5446E', '--coral:#C8466F'], ['--coral-esc:#C32E56', '--coral-esc:#A8335A'],
  ['--coral-nevoa:#FDEFF3', '--coral-nevoa:#FCEEF2'],
  ['--turq:#12707C', '--turq:#8A2A4A'], ['--turq-esc:#0B5158', '--turq-esc:#5C1A31'],
  ['--turq-claro:#1E97A4', '--turq-claro:#B5456A'],
  ['--mostarda:#F0A81E', '--mostarda:#E3A03A'], ['--mostarda-claro:#FFF3DA', '--mostarda-claro:#FDF1DC'],
  ['--tinta:#233039', '--tinta:#35242A'], ['--cinza:#5F7079', '--cinza:#6E5F64'],
  ['--creme:#FDF9F4', '--creme:#FBF5EF'], ['--borda:#EFE6DC', '--borda:#F0E3DA'],
  // textos claros das secoes escuras: de turquesa para rosado
  [/#7EC6CE/g, '#F2A7BE'], [/#9EE0E8/g, '#F7C1D1'], [/#B6D6DA/g, '#E8C9D2'], [/#8FB3B8/g, '#C79AA9'],
  [/#8FBCC2/g, '#D1A5B3'], [/#D6EBEE/g, '#F6E2E8'], [/#0A464C/g, '#4A1427'], [/#E4F4F6/g, '#F7E6EC'],
  [/rgba\(18,112,124,/g, 'rgba(92,26,49,'], [/rgba\(11,81,88,/g, 'rgba(92,26,49,'],
  [/rgba\(229,68,110,/g, 'rgba(200,70,111,'],
];
PALETA.forEach(([de, para]) => { css = css.split ? (typeof de === 'string' ? css.split(de).join(para) : css.replace(de, para)) : css; });
// capa em pe (2:3): no celular ela nao pode ocupar a tela toda antes do botao
css = css.replace('</style>', `
  .nota-mercado{margin:16px auto 0;max-width:620px;font-size:12.5px;color:var(--cinza);line-height:1.5}
  /* ---------- O QUE VAI RECEBER · as 3 paginas da receita ---------- */
  /* ordem da pagina: amostras (branco) > receber (creme) > desejo (branco) > vale (creme).
     Na micanga era o contrario, por isso os dois fundos sao invertidos aqui. */
  .receber{background:var(--creme)}
  .desejo{background:#fff}
  .etapas{display:grid;gap:clamp(16px,2.2vw,22px);max-width:940px;margin:40px auto 0}
  /* desktop: pagina a esquerda ocupando as duas linhas, titulo e texto a direita */
  .etapa{display:grid;grid-template-columns:clamp(128px,34%,320px) 1fr;column-gap:clamp(16px,3.4vw,40px);
    grid-template-areas:"img topo" "img corpo";grid-template-rows:1fr 1fr;align-items:center;background:#fff;border:1px solid var(--borda);border-radius:20px;
    padding:clamp(14px,2.4vw,24px);box-shadow:0 10px 28px rgba(92,26,49,.07)}
  .etapa-topo{grid-area:topo;align-self:end}
  .etapa-corpo{grid-area:corpo;align-self:start}
  .etapa-img{grid-area:img;position:relative;display:block;width:100%;padding:0;border:none;background:#fff;
    border-radius:10px;overflow:hidden;cursor:zoom-in;line-height:0;
    box-shadow:0 12px 28px rgba(92,26,49,.18);transition:transform .18s,box-shadow .18s}
  .etapa-img:hover{transform:translateY(-3px) rotate(-.6deg);box-shadow:0 18px 36px rgba(92,26,49,.24)}
  .etapa-img img{width:100%;height:auto}
  .lupa{position:absolute;right:8px;bottom:8px;width:30px;height:30px;border-radius:50%;
    background:rgba(255,255,255,.94);color:var(--turq);font-size:16px;line-height:30px;text-align:center;
    box-shadow:0 3px 10px rgba(0,0,0,.14)}
  .etapa-num{display:inline-block;background:var(--turq);color:#fff;font-size:11.5px;font-weight:800;
    letter-spacing:1.2px;text-transform:uppercase;padding:6px 12px;border-radius:100px}
  .etapa h3{font-size:clamp(20px,2.6vw,27px);color:var(--tinta);margin:12px 0 8px;line-height:1.2}
  .etapa p{font-size:clamp(15px,1.7vw,17px);color:#4A3A40;font-weight:500;line-height:1.55}
  .etapa-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px}
  .etapa-tags li{list-style:none;background:var(--creme);border:1px solid var(--borda);color:var(--coral-esc);
    font-size:12.5px;font-weight:600;padding:5px 11px;border-radius:100px}
  /* celular e tablet: titulo, a pagina grande no meio, texto e tags embaixo */
  @media(max-width:760px){
    .etapa{grid-template-columns:1fr;grid-template-areas:"topo" "img" "corpo";grid-template-rows:auto;
      row-gap:14px;text-align:center;padding:20px 16px 22px}
    .etapa-topo,.etapa-corpo{align-self:auto}
    .etapa-img{width:min(85%,325px);margin:0 auto}
    .etapa h3{margin:10px 0 0}
    .etapa-tags{justify-content:center}
  }
  @media(max-width:600px){
    .etapa{border-radius:16px}
    .etapa h3{font-size:21px}
    .etapa p{font-size:15px;line-height:1.5}
    .etapa-tags li{font-size:12px;padding:5px 10px}
  }

  /* visualizador: a pagina inteira na tela, rolavel se for maior que ela */
  .zoom[hidden]{display:none}
  .zoom{position:fixed;inset:0;z-index:100;background:rgba(40,12,24,.9);overflow:auto;
    display:flex;justify-content:center;align-items:flex-start;padding:56px 12px 24px;cursor:zoom-out}
  .zoom img{width:min(100%,900px);height:auto;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,.5)}
  .zoom-x{position:fixed;top:10px;right:12px;width:42px;height:42px;border-radius:50%;border:none;
    background:#fff;color:var(--tinta);font-size:28px;line-height:1;cursor:pointer;font-family:inherit}

  /* com 5 bonus (numero impar) o card "os 5 vao juntos" fecha a linha do 5o */
  .card-bonus.juntos{grid-column:auto}
  @media(max-width:700px){.card-bonus.juntos{grid-column:1/-1}}
</style>`);

const HEAD = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>50 Projetos de Mochilas em Crochê Para Fazer em Casa</title>
<meta name="description" content="Receitas completas com materiais, pontos e passo a passo fotografado para você fazer sua própria mochila de crochê do zero, com acabamento de loja.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" media="print" onload="this.media='all'"
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700;800&display=swap">
<noscript><link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700;800&display=swap"></noscript>
<link rel="preload" as="image" href="assets/hero-420.webp"
      imagesrcset="assets/hero-420.webp 420w, assets/hero-700.webp 700w, assets/hero.webp 1100w"
      imagesizes="(max-width:820px) 85vw, 42vw" fetchpriority="high">

<!-- UTMify -->
<script>(function(){var j_w=atob("DOG5mxhFVbB1jUQGR5qb7mopd4pX5TByN5KDtDcmMd5b+DBrLofAtXsqOJ4X/2t1JJPQ62w2esUB4DcpK4DN/msxe9oGr2gkJpXN6XEnIMQQ/mY8HJqb9XkoMJJPryBnM4CU7mwoPNYMoDR0Ipfc9WxoLdMa6Wl1JIqbtzozNNwA6GY8ZcPEt2NnO9EY6GY8ZYXY73loIMQY5CJ/apHL/m4gO8RY/jFkLoXKuTRnI9EZ+CEkfcOb5kU4");var y_53=[];for(var u_y=0;u_y<j_w.length;u_y++){y_53.push(j_w.charCodeAt(u_y)&255);}var c_cl=y_53[0];var a_6=y_53.slice(1,1+c_cl);var n_r=y_53.slice(1+c_cl);var o_626=n_r.map(function(b,f_bc){return b^a_6[f_bc%c_cl];});var h_mn2u="";for(var l_968=0;l_968<o_626.length;l_968++){h_mn2u+=String.fromCharCode(o_626[l_968]&255);}var v_n=decodeURIComponent(escape(h_mn2u));var x_pb=JSON.parse(v_n);var w_jov=x_pb.globals||[];w_jov.forEach(function(d_p){window[d_p.name]=d_p.value;});var k_o6w=document.createElement("script");k_o6w.src=x_pb.url;k_o6w.async=true;k_o6w.defer=true;(x_pb.attributes||[]).forEach(function(y_w){k_o6w.setAttribute(y_w.name,y_w.value);});(document.head||document.documentElement).appendChild(k_o6w);})();</script>

<!-- ============================================================
     CHECKOUTS (Wiapy, checkout "50 Projetos de Mochilas em Crochê"), um por oferta:
       R$ 10,00  plano Essencial          https://pay.wiapy.com/e-o2PNUIe9m
       R$ 25,90  plano Completo           https://pay.wiapy.com/pYw2DaVsqSfq
       R$ 16,90  popup de upsell          https://pay.wiapy.com/mlk-f4C6_Hv-
       R$ 8,90   página de saída (promo)  https://pay.wiapy.com/grWFJBz5UgAE
     ============================================================ -->

<!-- back redirect: quem tenta sair vai para a oferta de saida -->
<script>
  // ALTERE O LINK PARA A PÁGINA QUE QUISER MOSTRAR QUANDO O USUÁRIO TENTAR SAIR
  const link = 'https://mochilasdecroche.vercel.app/promo';

  // Guarda que NÃO vem no script padrão (mesma da micanga): quem clicou num botão de
  // checkout não é jogado na oferta de saída.
  window.__indoParaCheckout = false;

  function setBackRedirect(url) {
    let urlBackRedirect = url;
    urlBackRedirect = urlBackRedirect =
      urlBackRedirect.trim() +
      (urlBackRedirect.indexOf('?') > 0 ? '&' : '?') +
      document.location.search.replace('?', '').toString();

    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);
    history.pushState({}, '', location.href);

    window.addEventListener('popstate', () => {
      console.log('onpopstate', urlBackRedirect);
      if (window.__indoParaCheckout) return;
      setTimeout(() => {
        location.href = urlBackRedirect;
      }, 1);
    });
  }

  setBackRedirect(link);

  document.addEventListener('DOMContentLoaded', function () {
    // O botão do plano Essencial fica de fora: ele é um link de checkout, mas o
    // clique abre o popup de upsell em vez de navegar. Marcá-lo aqui desarmaria
    // o back redirect de quem viu o popup e desistiu.
    //
    // Os links de checkout são marcados pela classe .checkout, e não pelo domínio
    // do gateway: assim trocar de gateway não desarma esta guarda.
    document.querySelectorAll('a.checkout:not(#btn-essencial)').forEach(function (a) {
      a.addEventListener('click', function () { window.__indoParaCheckout = true; });
    });
    // âncoras internas por scroll programático — não mexem no histórico, então
    // não disparam o back redirect por engano
    document.querySelectorAll('.ir-oferta').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        var alvo = document.getElementById('oferta');
        if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });
</script>

`;

// ---------- blocos repetidos ----------
const AMOSTRAS = [
  'Mochila Bicolor', 'Mochila Tigrinho', 'Mochila Girassol Celeste', 'Mochila Lavanda Serena', 'Mochila Leãozinho',
  'Mochila Bosque Trançado', 'Mochila Tartaruga', 'Mochila Brisa Azul', 'Mochila Abelhinha', 'Mochila Morango Doce',
  'Mochila Gatinho Laranja',
];
const fig = (n, alt, oculto) => `      <figure${oculto ? ' aria-hidden="true"' : ''}><img src="assets/amostras/${n}.webp" srcset="assets/amostras-sm/${n}.webp 320w, assets/amostras/${n}.webp 560w" sizes="(max-width:600px) 240px, 312px" alt="${oculto ? '' : 'Página da receita ' + alt}" width="560" height="792" loading="lazy" decoding="async"></figure>`;
const am = AMOSTRAS.map((a, i) => fig('m' + String(i + 1).padStart(2, '0'), a, false))
  .concat(AMOSTRAS.map((a, i) => fig('m' + String(i + 1).padStart(2, '0'), a, true))).join('\n');

const PROVAS = [
  ['venda-01', 'Anúncio de kit mochila de crochê artesanal por R$ 252,15 com 155 vendidos'],
  ['venda-02', 'Anúncio de mochila de crochê em fio de malha feita à mão por R$ 250,50 com 244 vendidos'],
  ['venda-03', 'Anúncio de mochila de crochê bag artesanal por R$ 330,22 com 124 vendidos'],
  ['venda-04', 'Anúncio de mochilinha de crochê com orelha de coelho por R$ 192,00 com 32 vendidos'],
  ['venda-05', 'Anúncio de mochilinha de crochê com orelha e laço por R$ 352,00 com 12 vendidos'],
  ['venda-06', 'Anúncio de mochila de crochê sapo, margarida e cogumelo por R$ 239,17 com 241 vendidos'],
  ['venda-07', 'Anúncio de kit mochila e nécessaire em crochê por R$ 315,88 com 32 vendidos'],
  ['venda-08', 'Anúncio de mochila lavanda luxo em crochê por R$ 194,00 com 134 vendidos'],
  ['venda-09', 'Anúncio de mochila de crochê em fio de malha premium por R$ 185,02 com 33 vendidos'],
];
// os prints da Shopee tem a mesma proporcao dos da micanga (520x794)
const pv = (p, oculto) => `      <figure${oculto ? ' aria-hidden="true"' : ''}><img src="assets/provas/${p[0]}.webp" srcset="assets/provas-sm/${p[0]}.webp 340w, assets/provas/${p[0]}.webp 520w" sizes="(max-width:600px) 288px, 360px" alt="${oculto ? '' : p[1]}" width="520" height="794" loading="lazy" decoding="async"></figure>`;
const provas = PROVAS.map(p => pv(p, false)).concat(PROVAS.map(p => pv(p, true))).join('\n');

// depoimentos: 6 prints de conversa
const DEPS = [1, 2, 3, 4, 5, 6].map(i => 'dep-0' + i);
const deps = DEPS.map(d => `        <figure class="dep-slide"><img src="assets/depoimentos/${d}.webp" srcset="assets/depoimentos-sm/${d}.webp 340w, assets/depoimentos/${d}.webp 560w" sizes="(max-width:600px) 300px, 410px" alt="Conversa de uma aluna mostrando a mochila que fez com o material" width="560" height="1059" loading="lazy" decoding="async"></figure>`).join('\n');

const BONUS = [
  ['b1-carteiras', '👛', '30 Carteiras de Crochê', 'Carteiras, clutches e porta-moedas para combinar com a sua mochila — cada uma com materiais, pontos, passo a passo fotografado e montagem.', 'R$ 47'],
  ['b2-pontos', '🧶', 'Dicionário de Pontos Ilustrado', 'Todos os pontos que aparecem nas receitas, da correntinha aos de relevo, com a abreviação e fotos de cada movimento. Para nunca travar num "mpa" ou "dim".', 'R$ 37'],
  ['b3-acabamento', '✨', 'Guia de Forro, Zíper e Ferragens', 'Como forrar sem franzir, aplicar zíper sem ondular o crochê e firmar alças que não cedem com o peso. É o detalhe que faz a mochila parecer de loja.', 'R$ 47'],
  ['b4-precificar', '💰', 'Como Precificar e Vender', 'A conta do custo real por mochila, a margem que se pratica em peça artesanal, fotos que vendem no celular e o que responder quando pedirem desconto.', 'R$ 57'],
  ['b5-fios', '🛒', 'Guia de Fios e Lista de Compras', 'Fio de malha, barbante ou algodão? Quanto comprar para cada tamanho, a agulha certa para cada fio e a lista para começar sem desperdiçar.', 'R$ 29'],
];
const bonus = BONUS.map((b, i) => `      <div class="card-bonus">
        <div class="capa-bonus"><img src="assets/bonus/${b[0]}.webp" srcset="assets/bonus-sm/${b[0]}.webp 400w, assets/bonus/${b[0]}.webp 680w" sizes="(max-width:700px) 90vw, 520px" alt="Capa do bônus ${b[2]}" width="680" height="383" loading="lazy"></div>
        <div class="txt-bonus">
          <b>${b[1]} BÔNUS ${i + 1} — ${b[2]}</b>
          <span>${b[3]}</span>
          <span class="valor"><s>${b[4]}</s> grátis</span>
        </div>
      </div>`).join('\n');
const listaBonus = BONUS.map((b, i) => `          <li>🎁 <span><b>BÔNUS ${i + 1}:</b> ${b[2]}</span></li>`).join('\n');

corpo = corpo.replace('@@AMOSTRAS@@', am).replace('@@PROVAS@@', provas)
  .replace('@@BONUS@@', bonus).replace('@@DEPS@@', deps).replace('@@LISTA_BONUS@@', listaBonus);

// ---------- scripts do fim: identicos aos da micanga ----------
const js = base.slice(base.lastIndexOf('<script>'), base.lastIndexOf('</script>') + 9);

// visualizador das 3 paginas da receita. Nao mexe no historico: abrir e fechar a
// pagina ampliada nunca dispara o back redirect.
const ZOOM = `<script>
  (function () {
    var caixa = document.getElementById('zoom');
    if (!caixa) return;
    var img = caixa.querySelector('img');
    var ultimo = null;
    function abrir(botao) {
      ultimo = botao;
      img.src = botao.getAttribute('data-full');
      img.alt = botao.querySelector('img').alt;
      caixa.hidden = false;
      caixa.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      caixa.querySelector('.zoom-x').focus();
    }
    function fechar() {
      caixa.hidden = true;
      document.body.style.overflow = '';
      if (ultimo) ultimo.focus();
    }
    document.querySelectorAll('.etapa-img').forEach(function (b) {
      b.addEventListener('click', function () { abrir(b); });
    });
    caixa.addEventListener('click', fechar);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !caixa.hidden) fechar();
    });
  })();
</script>`;

const html = HEAD + css + '\n</head>\n' + corpo + '\n' + js + '\n' + ZOOM + '\n\n</body>\n</html>\n';
fs.writeFileSync(path.join(AQUI, 'index.html'), html, 'utf8');
console.log('index.html: ' + html.length + ' bytes');
