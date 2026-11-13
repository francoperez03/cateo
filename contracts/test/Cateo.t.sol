// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Cateo, IERC20 } from '../src/Cateo.sol';
import { TokenPrueba } from '../src/TokenPrueba.sol';
import { Test } from 'forge-std/Test.sol';

contract CateoTest is Test {
  TokenPrueba usd;
  Cateo cateo;
  address satelite = makeAddr('satelite');
  address minero = makeAddr('minero');
  address inversor = makeAddr('inversor');
  uint256 constant PRECIO = 25e6;
  string constant GEO = '{"type":"Polygon","coordinates":[[[-66.9,-24.7],[-66.8,-24.7],[-66.8,-24.6],[-66.9,-24.7]]]}';

  function setUp() public {
    usd = new TokenPrueba('USD de prueba', 'tUSD');
    cateo = new Cateo(IERC20(address(usd)), satelite, PRECIO);
    usd.mint(minero, 100e6);
    usd.mint(inversor, 1000e6);
    vm.prank(minero);
    usd.approve(address(cateo), type(uint256).max);
    vm.prank(inversor);
    usd.approve(address(cateo), type(uint256).max);
  }

  function _pedir() internal returns (uint256 id) {
    vm.prank(minero);
    id = cateo.pedirEstudio(GEO, 'EXP-123');
  }

  function _atestar(uint256 id) internal {
    vm.prank(satelite);
    cateo.atestar(id, 'S2A_T19KGP_20261101', 1_793_500_000, 1234, 567, keccak256('informe'), 'cateo-1');
  }

  function _colecta(uint256 meta) internal returns (uint256 c) {
    uint256 id = _pedir();
    _atestar(id);
    vm.prank(minero);
    c = cateo.crearColecta(id, meta, uint64(block.timestamp + 7 days));
  }

  function test_flujoFeliz() public {
    uint256 c = _colecta(500e6);
    assertEq(usd.balanceOf(satelite), PRECIO, 'el satelite cobra el estudio');
    (, string memory geo,, bool atestado,,, uint16 ox,,,) = cateo.estudios(0);
    assertEq(geo, GEO);
    assertTrue(atestado);
    assertEq(ox, 1234);

    vm.prank(inversor);
    cateo.aportar(c, 500e6);
    vm.prank(minero);
    cateo.retirar(c);
    assertEq(usd.balanceOf(minero), 100e6 - PRECIO + 500e6);
    assertEq(usd.balanceOf(address(cateo)), 0);

    vm.prank(minero);
    vm.expectRevert('ya retirada');
    cateo.retirar(c);
    vm.prank(inversor);
    vm.expectRevert('colecta cerrada');
    cateo.aportar(c, 1e6);
  }

  function test_soloElSateliteAtesta() public {
    uint256 id = _pedir();
    vm.prank(minero);
    vm.expectRevert('solo el satelite');
    cateo.atestar(id, 'x', 0, 1, 1, bytes32(0), 'v');
    _atestar(id);
    vm.prank(satelite);
    vm.expectRevert('ya atestado');
    cateo.atestar(id, 'x', 0, 1, 1, bytes32(0), 'v');
  }

  function test_sinAtestacionNoHayColecta() public {
    uint256 id = _pedir();
    vm.prank(minero);
    vm.expectRevert('estudio sin atestar');
    cateo.crearColecta(id, 1e6, uint64(block.timestamp + 1 days));
    _atestar(id);
    vm.prank(inversor);
    vm.expectRevert('solo quien pidio el estudio');
    cateo.crearColecta(id, 1e6, uint64(block.timestamp + 1 days));
  }

  function test_reembolsoSiNoLlega() public {
    uint256 c = _colecta(500e6);
    vm.prank(inversor);
    cateo.aportar(c, 200e6);

    vm.prank(inversor);
    vm.expectRevert('sin reembolso');
    cateo.reembolsar(c);
    vm.prank(minero);
    vm.expectRevert('meta no alcanzada');
    cateo.retirar(c);

    vm.warp(block.timestamp + 8 days);
    vm.prank(inversor);
    cateo.reembolsar(c);
    assertEq(usd.balanceOf(inversor), 1000e6);
    vm.prank(inversor);
    vm.expectRevert('nada que reembolsar');
    cateo.reembolsar(c);
  }

  function test_metaAlcanzadaNoReembolsa() public {
    uint256 c = _colecta(100e6);
    vm.prank(inversor);
    cateo.aportar(c, 100e6);
    vm.warp(block.timestamp + 8 days);
    vm.prank(inversor);
    vm.expectRevert('sin reembolso');
    cateo.reembolsar(c);
    vm.prank(minero);
    cateo.retirar(c);
  }
}
