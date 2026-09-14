#!/usr/bin/env bash
# Gera index.html e promo.html prontos para produção.
#   bash build.sh
#
# 1. monta as duas páginas legíveis (_montar.cjs e _montar-promo.cjs)
# 2. só então minifica: o _montar-promo.cjs lê trechos da index pelos COMENTÁRIOS do CSS,
#    e a minificação remove comentários. Rodar a promo depois de minificar quebra ela.
# 3. acrescenta decoding="async" nas imagens lazy que não têm
#
# O que NÃO muda: texto, CSS, imagens, links de checkout, UTMify e back redirect. A
# minificação só tira espaço e comentário; o JS passa pelo terser sem renomear nada
# global, então o script da UTMify e o do back redirect continuam idênticos no efeito.
set -eu
cd "$(dirname "$0")"
node _montar.cjs
node _montar-promo.cjs

for f in index.html promo.html; do
  npx -y html-minifier-terser@7.2.0 \
    --collapse-whitespace --conservative-collapse \
    --remove-comments --minify-css true \
    --minify-js '{"mangle":{"toplevel":false},"compress":{"passes":1}}' \
    --remove-redundant-attributes --remove-script-type-attributes \
    -o "$f.min" "$f"
  node -e "
    const fs=require('fs');let h=fs.readFileSync('$f.min','utf8');
    h=h.replace(/<img(?![^>]*decoding=)([^>]*loading=\"lazy\"[^>]*)>/g,'<img decoding=\"async\"\$1>');
    fs.writeFileSync('$f',h);fs.unlinkSync('$f.min');"
  echo "$f: $(wc -c < "$f") bytes"
done
