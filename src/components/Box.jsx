import BowSVG from './BowSVG'

export default function Box({ icon, themeId, opening, onClick, disabled }) {
  return (
    <div className="box-wrap">
      <button
        type="button"
        className={`box${opening ? ' opening' : ''}`}
        onClick={onClick}
        disabled={disabled}
        aria-label="Abrir caja"
      >
        <span className="box-body">
          <span className="box-ribbon-v" />
          <span className="box-ribbon-h" />
          <img src={icon} alt="" className="glyph-icon" />
        </span>
        <span className="box-lid">
          <BowSVG themeId={themeId} />
        </span>
      </button>
    </div>
  )
}
