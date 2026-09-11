import { Gift } from 'lucide-react'

const STEPS = ['Ocasión', 'Participantes', 'Revelación']

export default function TopBar({ currentIndex }) {
  return (
    <header className="topbar">
      <div className="brand-mark">
        <Gift size={18} strokeWidth={2} />
        <span>Cajas Secretas</span>
      </div>
      <ol className="steps">
        {STEPS.map((label, i) => (
          <li key={label} className={i === currentIndex ? 'step is-current' : i < currentIndex ? 'step is-done' : 'step'}>
            <span className="step-index">{i + 1}</span>
            <span className="step-label">{label}</span>
          </li>
        ))}
      </ol>
    </header>
  )
}
