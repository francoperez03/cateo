'use client'
import Link from 'next/link'
import { CATEO, enlaceDireccion, MONEDA } from '@/lib/cadena'
import { corta, fecha, pct, usd } from '@/lib/formato'
import { estadoColecta, useColectas, useEstudios } from '@/lib/lecturas'

export default function Inicio() {
  const estudios = useEstudios()
  const colectas = useColectas()

  return (
    <div className="pagina">
      <section className="portada">
        <h1>Qué muestra la superficie, firmado en la cadena.</h1>
        <p className="bajada">
          Cateo corre un estudio espectral con Sentinel-2 sobre el área que marques, deja el resultado atestado en Avalanche y
          cualquiera puede recomputarlo. Con ese estudio se abre una colecta de exploración en custodia: si no llega a la meta,
          cada aporte vuelve a su dueño.
        </p>
        <div className="acciones">
          <Link className="boton" href="/estudio/nuevo">Pedir un estudio</Link>
          <a className="boton fantasma" href="#estudios">Ver estudios atestados</a>
        </div>
        <dl className="alcance">
          <div>
            <dt>Mide</dt>
            <dd>Dos índices de superficie: óxidos férricos (B04/B02) y arcillas e hidroxilos (B11/B12), como porcentaje del área sobre un umbral.</dd>
          </div>
          <div>
            <dt>Deja en la cadena</dt>
            <dd>El polígono, la escena satelital, los porcentajes, el hash del informe y quién firmó.</dd>
          </div>
          <div>
            <dt>No afirma</dt>
            <dd>Ley, tonelaje, profundidad, valor ni litio en salmuera. Tampoco verifica de quién es el permiso minero: el expediente va declarado.</dd>
          </div>
        </dl>
      </section>

      {!CATEO ? (
        <p className="aviso-pagina" role="status">
          El contrato todavía no está desplegado en Avalanche Fuji. Cuando lo esté, acá aparecen los estudios y las colectas.
        </p>
      ) : null}

      <section id="estudios" className="bloque">
        <header>
          <h2>Estudios</h2>
          {CATEO && enlaceDireccion(CATEO) ? (
            <a className="dato" href={enlaceDireccion(CATEO)} target="_blank" rel="noreferrer">Contrato {corta(CATEO)}</a>
          ) : null}
        </header>
        {estudios.error ? (
          <p className="vacio" role="alert">No se pudo leer la cadena. Revisá la conexión y recargá.</p>
        ) : estudios.cargando ? (
          <p className="vacio">Leyendo la cadena…</p>
        ) : estudios.lista.length === 0 ? (
          <p className="vacio">Todavía no hay estudios. <Link href="/estudio/nuevo">Pedí el primero</Link> con el área de ejemplo del Salar de Pozuelos.</p>
        ) : (
          <ul className="filas">
            {estudios.lista.map((e) => (
              <li key={e.id}>
                <Link href={`/estudio/${e.id}`}>
                  <span className="dato id">N.º {e.id}</span>
                  <span className="principal">
                    {e.atestado ? (
                      <>
                        <span className="indice ox">Óxidos {pct(e.pctOxidos)}</span>
                        <span className="indice ar">Arcillas {pct(e.pctArcillas)}</span>
                      </>
                    ) : (
                      <span className="pendiente">Esperando al satélite</span>
                    )}
                  </span>
                  <span className="secundario">{e.atestado ? `Escena del ${fecha(e.fechaEscena)}` : 'Sin atestar'}</span>
                  <span className="secundario declarado" title="Dato declarado por quien pidió el estudio, sin verificar">Exp. {e.expediente || 'sin declarar'}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="colectas" className="bloque">
        <header>
          <h2>Colectas</h2>
        </header>
        {colectas.cargando ? (
          <p className="vacio">Leyendo la cadena…</p>
        ) : colectas.lista.length === 0 ? (
          <p className="vacio">Todavía no hay colectas. Se abren desde un estudio atestado, y solo las abre quien lo pidió.</p>
        ) : (
          <ul className="filas">
            {colectas.lista.map((c) => {
              const estado = estadoColecta(c)
              return (
                <li key={c.id}>
                  <Link href={`/colecta/${c.id}`}>
                    <span className="dato id">N.º {c.id}</span>
                    <span className="principal">
                      {usd(c.recaudado)} de {usd(c.meta)} {MONEDA}
                      <progress max={Number(c.meta)} value={Number(c.recaudado)} aria-label="Recaudado sobre la meta" />
                    </span>
                    <span className="secundario">{estado.texto}</span>
                    <span className="secundario">Respaldada por el estudio N.º {Number(c.estudioId)}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
