// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Cateo, IERC20 } from '../src/Cateo.sol';
import { TokenPrueba } from '../src/TokenPrueba.sol';
import { Script, console } from 'forge-std/Script.sol';

/// forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast
/// TOKEN vacio despliega una stablecoin de prueba (anvil). En Fuji: TOKEN=0x5425890298aed601595a70AB815c96711a31Bc65 (USDC).
contract Deploy is Script {
  function run() external {
    address satelite = vm.envAddress('SATELITE');
    uint256 precio = vm.envOr('PRECIO_ESTUDIO', uint256(1e6)); // 1 USDC: el faucet de Circle da poco
    address token = vm.envOr('TOKEN', address(0));
    vm.startBroadcast();
    if (token == address(0)) token = address(new TokenPrueba('USD de prueba', 'tUSD'));
    Cateo cateo = new Cateo(IERC20(token), satelite, precio);
    vm.stopBroadcast();
    console.log('TOKEN=%s', token);
    console.log('CATEO=%s', address(cateo));
  }
}
