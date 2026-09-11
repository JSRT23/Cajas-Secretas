import { THEMES } from '../themes'

export default function BowSVG({ themeId }) {
  const charm = THEMES[themeId]?.icons?.bow

  return (
    <svg className="box-bow" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        className="bow-tail bow-tail-left"
        d="M92 58 L74 96 L90 88 L96 96 Z"
      />
      <path
        className="bow-tail bow-tail-right"
        d="M108 58 L126 96 L110 88 L104 96 Z"
      />
      <path
        className="bow-loop bow-loop-left"
        d="M100 55
           C 78 18, 22 14, 12 40
           C 4 62, 40 82, 100 55 Z"
      />
      <path
        className="bow-loop bow-loop-right"
        d="M100 55
           C 122 18, 178 14, 188 40
           C 196 62, 160 82, 100 55 Z"
      />
      <circle className="bow-knot" cx="100" cy="55" r="19" />
      {charm && (
        <image href={charm} x="84" y="39" width="32" height="32" preserveAspectRatio="xMidYMid meet" />
      )}
    </svg>
  )
}
