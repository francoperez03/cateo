// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
  function transfer(address to, uint256 amount) external returns (bool);
  function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

/// @title Cateo: estudios satelitales atestados que respaldan colectas de exploracion
/// @notice El estudio declara indices espectrales de superficie. No hay campos de ley, tonelaje ni valor: a proposito.
contract Cateo {
  struct Estudio {
    address solicitante;
    string geojson; // poligono completo en storage: el RPC publico de Fuji limita getLogs, asi se lee con una llamada
    string expediente; // numero de expediente minero DECLARADO por el solicitante, sin verificar
    bool atestado;
    string sceneId; // escena Sentinel-2 usada
    uint64 fechaEscena;
    uint16 pctOxidos; // puntos basicos del poligono sobre umbral (0 a 10000)
    uint16 pctArcillas;
    bytes32 hashInforme; // keccak256 del informe JSON canonico, recomputable con satelite/verificar.mjs
    string versionAlgoritmo;
  }

  struct Colecta {
    uint256 estudioId;
    address creador;
    uint256 meta;
    uint64 vence;
    uint256 recaudado;
    bool retirada;
  }

  IERC20 public immutable token;
  // ponytail: firmante unico. Siguiente paso: quorum de firmantes o Chainlink CRE.
  address public immutable satelite;
  uint256 public immutable precioEstudio;

  Estudio[] public estudios;
  Colecta[] public colectas;
  mapping(uint256 => mapping(address => uint256)) public aportes;

  event EstudioPedido(uint256 indexed id, address indexed solicitante, string geojson, string expediente);
  event EstudioAtestado(
    uint256 indexed id, string sceneId, uint64 fechaEscena, uint16 pctOxidos, uint16 pctArcillas, bytes32 hashInforme, string versionAlgoritmo
  );
  event ColectaCreada(uint256 indexed id, uint256 indexed estudioId, address indexed creador, uint256 meta, uint64 vence);
  event Aporte(uint256 indexed colectaId, address indexed aportante, uint256 monto);
  event Retiro(uint256 indexed colectaId, uint256 monto);
  event Reembolso(uint256 indexed colectaId, address indexed aportante, uint256 monto);

  constructor(IERC20 _token, address _satelite, uint256 _precioEstudio) {
    token = _token;
    satelite = _satelite;
    precioEstudio = _precioEstudio;
  }

  function pedirEstudio(string calldata geojson, string calldata expediente) external returns (uint256 id) {
    require(bytes(geojson).length > 0 && bytes(geojson).length <= 2048, 'geojson invalido');
    id = estudios.length;
    Estudio storage e = estudios.push();
    e.solicitante = msg.sender;
    e.geojson = geojson;
    e.expediente = expediente;
    emit EstudioPedido(id, msg.sender, geojson, expediente);
    require(token.transferFrom(msg.sender, satelite, precioEstudio), 'pago fallido');
  }

  function atestar(
    uint256 id,
    string calldata sceneId,
    uint64 fechaEscena,
    uint16 pctOxidos,
    uint16 pctArcillas,
    bytes32 hashInforme,
    string calldata versionAlgoritmo
  ) external {
    require(msg.sender == satelite, 'solo el satelite');
    Estudio storage e = estudios[id];
    require(!e.atestado, 'ya atestado');
    require(pctOxidos <= 10_000 && pctArcillas <= 10_000, 'pct fuera de rango');
    e.atestado = true;
    e.sceneId = sceneId;
    e.fechaEscena = fechaEscena;
    e.pctOxidos = pctOxidos;
    e.pctArcillas = pctArcillas;
    e.hashInforme = hashInforme;
    e.versionAlgoritmo = versionAlgoritmo;
    emit EstudioAtestado(id, sceneId, fechaEscena, pctOxidos, pctArcillas, hashInforme, versionAlgoritmo);
  }

  function crearColecta(uint256 estudioId, uint256 meta, uint64 vence) external returns (uint256 id) {
    Estudio storage e = estudios[estudioId];
    require(e.solicitante == msg.sender, 'solo quien pidio el estudio');
    require(e.atestado, 'estudio sin atestar');
    require(meta > 0 && vence > block.timestamp, 'meta o vencimiento invalido');
    id = colectas.length;
    colectas.push(Colecta(estudioId, msg.sender, meta, vence, 0, false));
    emit ColectaCreada(id, estudioId, msg.sender, meta, vence);
  }

  function aportar(uint256 colectaId, uint256 monto) external {
    Colecta storage c = colectas[colectaId];
    require(block.timestamp < c.vence && !c.retirada, 'colecta cerrada');
    require(monto > 0, 'monto cero');
    c.recaudado += monto;
    aportes[colectaId][msg.sender] += monto;
    emit Aporte(colectaId, msg.sender, monto);
    require(token.transferFrom(msg.sender, address(this), monto), 'aporte fallido');
  }

  /// @notice El creador retira si se llego a la meta.
  function retirar(uint256 colectaId) external {
    Colecta storage c = colectas[colectaId];
    require(msg.sender == c.creador, 'solo el creador');
    require(c.recaudado >= c.meta, 'meta no alcanzada');
    require(!c.retirada, 'ya retirada');
    c.retirada = true;
    emit Retiro(colectaId, c.recaudado);
    require(token.transfer(c.creador, c.recaudado), 'retiro fallido');
  }

  /// @notice El aportante recupera lo suyo si la colecta vencio sin llegar a la meta.
  function reembolsar(uint256 colectaId) external {
    Colecta storage c = colectas[colectaId];
    require(block.timestamp >= c.vence && c.recaudado < c.meta, 'sin reembolso');
    uint256 monto = aportes[colectaId][msg.sender];
    require(monto > 0, 'nada que reembolsar');
    aportes[colectaId][msg.sender] = 0;
    emit Reembolso(colectaId, msg.sender, monto);
    require(token.transfer(msg.sender, monto), 'reembolso fallido');
  }

  function totalEstudios() external view returns (uint256) {
    return estudios.length;
  }

  function totalColectas() external view returns (uint256) {
    return colectas.length;
  }
}
