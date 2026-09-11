import { useState } from 'react'
import ThemeSelect from './components/ThemeSelect'
import SetupForm from './components/SetupForm'
import BoxReveal from './components/BoxReveal'
import TopBar from './components/TopBar'
import { THEMES } from './themes'
import { buildSecretPairs } from './pairing'
import { supabase, supabaseConfigured } from './supabaseClient'

function makeRoomCode() {
  return Math.random().toString(36).slice(2, 7).toUpperCase()
}

export default function App() {
  const [step, setStep] = useState('theme') // theme | setup | reveal
  const [theme, setTheme] = useState(null)
  const [order, setOrder] = useState([])
  const [roomCode, setRoomCode] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleThemeSelect(id) {
    setTheme(id)
    setErrorMessage('')
    setStep('setup')
  }

  async function handleSetupSubmit(names) {
    const unique = names.filter((n, i) => names.indexOf(n) === i)
    if (unique.length < names.length) {
      setErrorMessage('Hay nombres repetidos. Cada participante necesita un nombre distinto.')
      return
    }
    if (names.length < 2) {
      setErrorMessage('Agrega al menos 2 participantes.')
      return
    }

    setSubmitting(true)
    setErrorMessage('')

    try {
      const participants = names.map((name, i) => ({ id: `local-${i}`, name }))
      const pairs = buildSecretPairs(participants)
      const byId = Object.fromEntries(participants.map((p) => [p.id, p]))
      const revealOrder = participants.map((p) => ({
        name: p.name,
        assignedName: byId[pairs.get(p.id)].name,
      }))

      const code = makeRoomCode()

      if (supabaseConfigured) {
        await persistToSupabase(code, theme, participants, pairs)
      }

      setOrder(revealOrder)
      setRoomCode(supabaseConfigured ? code : null)
      setStep('reveal')
    } catch (err) {
      console.error(err)
      setErrorMessage('No se pudieron armar las cajas. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  async function persistToSupabase(code, themeId, participants, pairs) {
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .insert({ room_code: code, theme: themeId })
      .select()
      .single()
    if (sessionError) throw sessionError

    const rows = participants.map((p, i) => ({
      session_id: session.id,
      name: p.name,
      order_index: i,
    }))
    const { data: inserted, error: participantsError } = await supabase
      .from('participants')
      .insert(rows)
      .select()
    if (participantsError) throw participantsError

    const localToRealId = Object.fromEntries(
      inserted.map((row, i) => [participants[i].id, row.id]),
    )

    const updates = participants.map((p) =>
      supabase
        .from('participants')
        .update({ assigned_to: localToRealId[pairs.get(p.id)] })
        .eq('id', localToRealId[p.id]),
    )
    const results = await Promise.all(updates)
    const failed = results.find((r) => r.error)
    if (failed) throw failed.error
  }

  function handleBackToTheme() {
    setStep('theme')
    setErrorMessage('')
  }

  function handleRestart() {
    setTheme(null)
    setOrder([])
    setRoomCode(null)
    setErrorMessage('')
    setStep('theme')
  }

  const themeClassName = theme ? THEMES[theme].className : ''
  const stepIndex = { theme: 0, setup: 1, reveal: 2 }[step]

  return (
    <div className={`app-shell ${themeClassName}`}>
      <TopBar currentIndex={stepIndex} />

      {step === 'theme' && <ThemeSelect onSelect={handleThemeSelect} />}

      {step === 'setup' && (
        <SetupForm
          theme={theme}
          onBack={handleBackToTheme}
          onSubmit={handleSetupSubmit}
          submitting={submitting}
          errorMessage={errorMessage}
        />
      )}

      {step === 'reveal' && (
        <BoxReveal theme={theme} order={order} roomCode={roomCode} onRestart={handleRestart} />
      )}

      <p className="footer-note">
        {supabaseConfigured
          ? 'Sesión guardada en Supabase.'
          : 'Modo local — conecta Supabase para guardar la sesión (ver README).'}
      </p>
    </div>
  )
}
