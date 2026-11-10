# Cajas Secretas 🎁

App de "amigo secreto" con 3 modalidades — **San Valentín** (Amigo Secreto), **Navidad** (Mi Santa Claus) y **Halloween** (Mi Dulce o Truco) — donde los participantes se enteran de su pareja secreta abriendo cajas una por una, al estilo de la revelación del "impostor".

## Cómo funciona

1. Eliges la ocasión (3 botones).
2. Escribes tu nombre y agregas al resto de participantes.
3. La app arma los emparejamientos al azar, garantizando que **nadie se toque a sí mismo** y que el reparto forme un solo ciclo (algoritmo de Sattolo).
4. Se abren las cajas una por una: "Caja 1 de 5 → abre María" y, al hacer clic, se revela a quién le tocó. Solo se debe mostrar esa pantalla a esa persona antes de pasar a la siguiente caja — igual que revelar el impostor en la mesa.

## Stack

- **Frontend:** React + Vite
- **Backend:** Supabase (Postgres) para guardar la sesión y los emparejamientos
- **Deploy:** Vercel

Si no configuras Supabase, la app sigue funcionando por completo en modo local (los emparejamientos solo viven en la memoria del navegador durante esa partida).

## Desarrollo local

```bash
npm install
cp .env.example .env
# rellena .env con tus credenciales de Supabase (ver abajo)
npm run dev
```

## Con Docker

```bash
cp .env.example .env                   # VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
docker compose up --build web          # producción (nginx) -> http://localhost:8080
docker compose --profile dev up dev    # desarrollo con HMR  -> http://localhost:5173
```

## Configurar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. Ve a **SQL Editor** y ejecuta el contenido de [`supabase/schema.sql`](./supabase/schema.sql). Esto crea las tablas `sessions` y `participants` con RLS abierto por `room_code` (suficiente para un juego casual entre amigos; si quieres más privacidad agrega autenticación).
3. En **Project Settings → API**, copia la `Project URL` y la `anon public key`.
4. Pégalas en tu `.env`:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

## Desplegar en Vercel

1. Sube este proyecto a un repo de GitHub.
2. En Vercel, "Add New Project" → importa el repo (detecta Vite automáticamente).
3. En **Environment Variables**, agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
4. Deploy.

## Estructura

```
src/
  App.jsx              # máquina de estados: tema → formulario → revelación
  themes.js            # copy y colores de las 3 modalidades
  pairing.js           # algoritmo de emparejamiento (derangement)
  supabaseClient.js     # cliente de Supabase
  components/
    ThemeSelect.jsx     # los 3 botones de modalidad
    SetupForm.jsx        # tu nombre + lista de participantes
    Box.jsx               # una caja individual con animación
    BoxReveal.jsx          # secuencia de cajas, una a la vez
supabase/
  schema.sql            # tablas + políticas RLS
```

## Personalizar

- **Colores y textos por modalidad:** `src/themes.js`.
- **Animación de la caja:** clases `.box`, `.box-lid`, `.box-body` en `src/index.css`.
- **Reglas de emparejamiento:** `src/pairing.js` (por ejemplo, si quieres excluir parejas específicas, es el lugar para agregar esa lógica).

## Nota sobre privacidad

Ahora mismo la revelación es secuencial en una sola pantalla (pensada para usarse en persona, pasando el teléfono o mostrando la pantalla). Si más adelante quieres que cada participante entre desde su propio celular y solo vea su propia caja, se puede agregar una vista `?room=CODIGO&nombre=...` que consulte Supabase por ese participante específico — el esquema ya está listo para soportarlo.
