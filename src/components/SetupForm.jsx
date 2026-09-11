import { useState } from 'react'
import { THEMES } from '../themes'

export default function SetupForm({ theme, onBack, onSubmit, submitting, errorMessage }) {
  const [names, setNames] = useState(['', ''])
  const config = THEMES[theme]

  function updateName(index, value) {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)))
  }

  function addRow() {
    setNames((prev) => [...prev, ''])
  }

  function removeRow(index) {
    setNames((prev) => (prev.length <= 2 ? prev : prev.filter((_, i) => i !== index)))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const cleaned = names.map((n) => n.trim()).filter(Boolean)
    onSubmit(cleaned)
  }

  return (
    <div className="stage">
      <h1 className="headline">
        {config.icon} {config.subtitle}
      </h1>
      <p className="subcopy">
        Escribe tu nombre primero y luego agrega a cada persona que va a participar. Necesitas al menos 2 personas.
      </p>

      <form className="panel" onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
        <label className="field-label">Tu nombre</label>
        <input
          className="text-input"
          value={names[0]}
          onChange={(e) => updateName(0, e.target.value)}
          placeholder="Ej: María"
          autoFocus
        />

        <label className="field-label">Participantes</label>
        {names.slice(1).map((name, i) => {
          const index = i + 1
          return (
            <div className="participant-row" key={index}>
              <input
                className="text-input"
                value={name}
                onChange={(e) => updateName(index, e.target.value)}
                placeholder={`Participante ${index}`}
              />
              <button
                type="button"
                className="icon-btn"
                onClick={() => removeRow(index)}
                aria-label="Quitar participante"
              >
                ×
              </button>
            </div>
          )
        })}

        <button type="button" className="add-row-btn" onClick={addRow}>
          + Agregar otro participante
        </button>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <div className="form-actions">
          <button type="button" className="ghost-btn" onClick={onBack}>
            ← Cambiar ocasión
          </button>
          <button type="submit" className="primary-btn" disabled={submitting}>
            {submitting ? 'Preparando cajas…' : 'Armar las cajas'}
          </button>
        </div>
      </form>
    </div>
  )
}
