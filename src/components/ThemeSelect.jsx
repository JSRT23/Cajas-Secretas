import { Heart, TreePine, Ghost } from 'lucide-react'
import { THEME_ORDER, THEMES } from '../themes'

const ICONS = {
  'san-valentin': Heart,
  navidad: TreePine,
  halloween: Ghost,
}

const ACCENTS = {
  'san-valentin': '#e0446f',
  navidad: '#2f8f5b',
  halloween: '#ff8c2b',
}

export default function ThemeSelect({ onSelect }) {
  return (
    <div className="stage">
      <h1 className="headline">Elige la ocasión</h1>
      <p className="subcopy">
        Cada modalidad tiene su propia dinámica de cajas. Elige una para armar la lista de participantes.
      </p>
      <div className="theme-grid">
        {THEME_ORDER.map((id) => {
          const theme = THEMES[id]
          const Icon = ICONS[id]
          return (
            <button
              key={id}
              type="button"
              className="theme-card"
              style={{ '--tcolor': ACCENTS[id] }}
              onClick={() => onSelect(id)}
            >
              <span className="tag-corner">{theme.label}</span>
              <span className="icon-chip">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3>{theme.subtitle}</h3>
              <p>{theme.tagline}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
