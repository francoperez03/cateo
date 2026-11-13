// El recorrido es una secuencia real: cada paso depende del anterior.
const PASOS = ['Área', 'Estudio', 'Atestación', 'Colecta']

export default function Recorrido({ paso }) {
  return (
    <ol className="recorrido" aria-label="Recorrido">
      {PASOS.map((nombre, i) => (
        <li key={nombre} className={i < paso ? 'hecho' : i === paso ? 'actual' : ''} aria-current={i === paso ? 'step' : undefined}>
          <span className="num">{i + 1}</span>
          {nombre}
        </li>
      ))}
    </ol>
  )
}
