#!/bin/bash
# Flujo completo en un anvil local con datos Sentinel-2 reales:
# pedir estudio -> atestacion -> verificacion -> colecta -> aporte -> retiro, y el camino de reembolso.
# Uso: ./e2e.sh   (necesita foundry, node y red para bajar la escena)
set -euo pipefail
cd "$(dirname "$0")"

# Claves publicas de anvil (cuentas 0, 1 y 2). Solo sirven en la red local.
MINERO_PK=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
SATELITE_PK=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
INVERSOR_PK=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
MINERO=$(cast wallet address $MINERO_PK)
INVERSOR=$(cast wallet address $INVERSOR_PK)
export SATELITE=$(cast wallet address $SATELITE_PK)
export RPC_URL=http://127.0.0.1:8545

anvil --silent & ANVIL=$!
trap 'kill $ANVIL' EXIT
sleep 1

salida=$(cd contracts && PRECIO_ESTUDIO=25000000 forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $MINERO_PK --broadcast 2>&1)
TOKEN=$(echo "$salida" | sed -n 's/.*TOKEN=//p' | head -1)
export CATEO=$(echo "$salida" | sed -n 's/.*CATEO=//p' | head -1)
echo "token $TOKEN  cateo $CATEO"

tx() { cast send --rpc-url $RPC_URL "$@" >/dev/null; }
saldo() { cast call --rpc-url $RPC_URL $TOKEN 'balanceOf(address)(uint256)' $1 | cut -d' ' -f1; }
for pk in $MINERO_PK $INVERSOR_PK; do
  tx --private-key $pk $TOKEN 'mint(address,uint256)' $(cast wallet address $pk) 1000000000
  tx --private-key $pk $TOKEN 'approve(address,uint256)' $CATEO 1000000000000
done

GEO=$(cat web/satelite/ejemplos/pozuelos.geojson)
tx --private-key $MINERO_PK $CATEO 'pedirEstudio(string,string)' "$GEO" 'EXP-DEMO-001'
echo "1. estudio pedido; el satelite cobro $(saldo $SATELITE)"

PRIVATE_KEY=$SATELITE_PK node web/satelite/atestar.mjs
node web/satelite/verificar.mjs 0

VENCE=$(($(cast block --rpc-url $RPC_URL -f timestamp) + 3600))
tx --private-key $MINERO_PK $CATEO 'crearColecta(uint256,uint256,uint64)' 0 500000000 $VENCE
tx --private-key $INVERSOR_PK $CATEO 'aportar(uint256,uint256)' 0 500000000
tx --private-key $MINERO_PK $CATEO 'retirar(uint256)' 0
[ "$(saldo $MINERO)" = 1475000000 ] || { echo "FALLO: saldo del minero $(saldo $MINERO)"; exit 1; }
echo "2. colecta 0: meta alcanzada y retirada"

tx --private-key $MINERO_PK $CATEO 'crearColecta(uint256,uint256,uint64)' 0 500000000 $VENCE
tx --private-key $INVERSOR_PK $CATEO 'aportar(uint256,uint256)' 1 200000000
cast rpc --rpc-url $RPC_URL evm_increaseTime 7200 >/dev/null && cast rpc --rpc-url $RPC_URL evm_mine >/dev/null
tx --private-key $INVERSOR_PK $CATEO 'reembolsar(uint256)' 1
[ "$(saldo $INVERSOR)" = 500000000 ] || { echo "FALLO: saldo del inversor $(saldo $INVERSOR)"; exit 1; }
echo "3. colecta 1: vencio sin llegar y el inversor recupero su aporte"
echo "E2E OK"
