import { useState } from 'react'
import Box from './Box'
import SecretLetterModal from './SecretLetterModal'
import { THEMES } from '../themes'

export default function BoxReveal({ theme, order, roomCode, onRestart }) {
  const [index, setIndex] = useState(0)
  const [opening, setOpening] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const config = THEMES[theme]

  const current = order[index]
  const isLast = index === order.length - 1

  function handleOpen() {
    if (opening || revealed) return
    setOpening(true)
    window.setTimeout(() => {
      setRevealed(true)
      setModalOpen(true)
    }, 550)
  }

  function handleNext() {
    setOpening(false)
    setRevealed(false)
    setModalOpen(false)
    setIndex((i) => i + 1)
  }

  return (
    <div className="stage">
      {roomCode && <span className="room-code">Código de sala · {roomCode}</span>}

      <div className="progress-row">
        {order.map((_, i) => (
          <span
            key={i}
            className={`progress-dot${i < index ? ' done' : ''}${i === index ? ' current' : ''}`}
          />
        ))}
      </div>

      <p className="box-caption">
        Caja {index + 1} de {order.length}
      </p>
      <p className="box-hint">
        {revealed ? '' : `Abre ${current.name} para ver a quién le tocó.`}
      </p>

      <Box
        icon={config.boxIcon}
        themeId={theme}
        opening={opening}
        onClick={handleOpen}
        disabled={opening || revealed}
      />

      {revealed && (
        <p className="letter-closed-note">
          🤫 Carta leída
          <button type="button" className="link-btn" onClick={() => setModalOpen(true)}>
            volver a abrirla
          </button>
        </p>
      )}

      {revealed && !isLast && (
        <button type="button" className="primary-btn" onClick={handleNext}>
          Siguiente caja →
        </button>
      )}

      {revealed && isLast && (
        <>
          <p className="subcopy" style={{ marginTop: 4 }}>
            Todas las cajas fueron abiertas. ¡Feliz {config.subtitle}!
          </p>
          <button type="button" className="ghost-btn" onClick={onRestart}>
            Armar otro juego
          </button>
        </>
      )}

      {modalOpen && current && (
        <SecretLetterModal
          themeId={theme}
          config={config}
          current={current}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
