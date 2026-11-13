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
          Un estudio con Sentinel-2 sobre tu área, atestado en Avalanche y recomputable por cualquiera. Con él se abre una
          colecta de exploración en custodia.
        </p>
        <div className="acciones">
          <Link className="boton" href="/estudio/nuevo">Pedir un estudio</Link>
          <a className="boton fantasma" href="#estudios">Ver estudios</a>
        </div>
        <dl className="alcance">
          <div>
            <dt>Mide</dt>
            <dd>Óxidos férricos y arcillas, como porcentaje del área sobre un umbral.</dd>
          </div>
          <div>
            <dt>Deja en la cadena</dt>
            <dd>Polígono, escena, porcentajes, hash del informe y firmante.</dd>
          </div>
          <div>
            <dt>No afirma</dt>
            <dd>Ley, tonelaje, valor, litio ni titularidad del permiso.</dd>
          </div>
        </dl>
      </section>

      {!CATEO ? (
        <p className="aviso-pagina" role="status">
          El contrato todavía no está desplegado en Avalanche Fuji.
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
          <p className="vacio" role="alert">No se pudo leer la cadena. Recargá.</p>
        ) : estudios.cargando ? (
          <p className="vacio">Leyendo la cadena…</p>
        ) : estudios.lista.length === 0 ? (
          <p className="vacio">Todavía no hay estudios. <Link href="/estudio/nuevo">Pedí el primero</Link>.</p>
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
                  <span className="secundario">{e.atestado ? fecha(e.fechaEscena) : 'Sin atestar'}</span>
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
          <p className="vacio">Todavía no hay colectas. Se abren desde un estudio atestado.</p>
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
                    <span className="secundario">Estudio N.º {Number(c.estudioId)}</span>
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
