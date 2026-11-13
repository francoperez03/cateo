#!/bin/bash
# Despliega Cateo en Avalanche Fuji con una stablecoin de prueba acuñable, deja un estudio atestado y una colecta
# de ejemplo, y apunta la web de Vercel al contrato. Necesita .env con PRIVATE_KEY y SATELITE, y AVAX de prueba
# en esa dirección. Uso: ./desplegar-fuji.sh
set -euo pipefail
cd "$(dirname "$0")"
set -a; source .env; set +a
R=$RPC_URL
[ "$(cast balance $SATELITE --rpc-url $R)" != "0" ] || { echo "La wallet $SATELITE no tiene AVAX en Fuji."; exit 1; }

salida=$(cd contracts && TOKEN= PRECIO_ESTUDIO=25000000 forge script script/Deploy.s.sol --rpc-url $R --private-key $PRIVATE_KEY --broadcast 2>&1)
TOKEN=$(echo "$salida" | sed -n 's/.*TOKEN=//p' | head -1)
CATEO=$(echo "$salida" | sed -n 's/.*CATEO=//p' | head -1)
[ -n "$CATEO" ] || { echo "$salida" | tail -20; exit 1; }
echo "TOKEN=$TOKEN CATEO=$CATEO"
sed -i '' "s|^TOKEN=.*|TOKEN=$TOKEN|; s|^CATEO=.*|CATEO=$CATEO|" .env
export CATEO

tx() { cast send --rpc-url $R --private-key $PRIVATE_KEY "$@" >/dev/null; }
tx $TOKEN 'mint(address,uint256)' $SATELITE 1000000000
tx $TOKEN 'approve(address,uint256)' $CATEO 1000000000000
tx $CATEO 'pedirEstudio(string,string)' "$(cat web/satelite/ejemplos/pozuelos.geojson)" 'EXP-DEMO-001'
(cd web && node satelite/atestar.mjs && node satelite/verificar.mjs 0)
VENCE=$(($(cast block --rpc-url $R -f timestamp) + 2592000))
tx $CATEO 'crearColecta(uint256,uint256,uint64)' 0 500000000 $VENCE
tx $CATEO 'aportar(uint256,uint256)' 0 180000000
echo "Estudio 0 atestado y colecta 0 abierta con 180 de 500 tUSD."

cd web
# --type config: son direcciones públicas, no secretos (Vercel pregunta por el nombre NEXT_PUBLIC_TOKEN)
poner() { printf '%s' "$2" | vercel env add "$1" production --force ${3:-} --scope francoperez03s-projects >/dev/null 2>&1 || echo "No se pudo cargar $1 en Vercel"; }
poner NEXT_PUBLIC_CATEO "$CATEO"
poner NEXT_PUBLIC_TOKEN "$TOKEN" "--type config"
poner NEXT_PUBLIC_MONEDA tUSD
poner PRIVATE_KEY "$PRIVATE_KEY"
vercel deploy --prod --yes --scope francoperez03s-projects 2>&1 | grep -E '"status"' || true
echo "Explorer: https://testnet.snowtrace.io/address/$CATEO"
