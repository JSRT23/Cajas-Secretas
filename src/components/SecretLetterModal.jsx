import { useEffect } from 'react'

export default function SecretLetterModal({ themeId, config, current, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const watermark = config.icons?.watermark ?? []
  const seal = config.icons?.seal

  return (
    <div className="letter-overlay" role="dialog" aria-modal="true" aria-label="Carta secreta" onClick={onClose}>
      <div className="letter-frame" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="letter-close" onClick={onClose} aria-label="Cerrar carta">
          ✕
        </button>

        <div className={`letter-card letter-${themeId}`}>
          {themeId === 'navidad' && <div className="letter-ribbon letter-ribbon-top" aria-hidden="true" />}

          <div className="letter-watermark" aria-hidden="true">
            {watermark.map((src, i) => (
              <img key={i} src={src} alt="" className={`letter-watermark-item wm${i}`} />
            ))}
          </div>

          <div className="letter-inner">
            {seal && (
              <span className="letter-seal">
                <img src={seal} alt="" />
              </span>
            )}
            <p className="letter-kicker">{config.cardEyebrow}</p>
            <p className="letter-eyebrow">
              {current.name} {config.revealVerb}…
            </p>
            <p className="letter-name">{current.assignedName}</p>
            <div className="letter-divider" aria-hidden="true" />
            <p className="letter-sub">
              Muéstrale la pantalla solo a {current.name} antes de pasar a la siguiente caja.
            </p>
          </div>

          {themeId === 'navidad' && <div className="letter-ribbon letter-ribbon-bottom" aria-hidden="true" />}
        </div>
      </div>
    </div>
  )
}
