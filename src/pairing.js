// Genera un "derangement" (permutacion sin puntos fijos) usando el
// algoritmo de Sattolo. Esto garantiza que cada participante reciba a
// otra persona distinta de si mismo, y que la cadena de asignaciones
// forme un unico ciclo cerrado (A -> B -> C -> A), que es justo el
// comportamiento esperado de un amigo secreto.
export function buildSecretPairs(participants) {
  if (participants.length < 2) {
    throw new Error('Se necesitan al menos 2 participantes.')
  }

  const shuffled = [...participants]
  let i = shuffled.length
  while (i > 1) {
    i -= 1
    const j = Math.floor(Math.random() * i)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // shuffled[k] regala a shuffled[k+1] (ciclo cerrado, nadie se regala a si mismo)
  const pairs = new Map()
  shuffled.forEach((giver, idx) => {
    const receiver = shuffled[(idx + 1) % shuffled.length]
    pairs.set(giver.id, receiver.id)
  })
  return pairs
}
