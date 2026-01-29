# Autenticación Mock vs Supabase

## Estado Actual (Mock)

La autenticación actualmente está simulada usando localStorage. Esto permite probar la funcionalidad sin configurar Supabase.

### Implementación en `App.jsx`:

```javascript
// Estado de autenticación
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [user, setUser] = useState(null)

// Inicializar desde localStorage
useEffect(() => {
  const savedAuth = localStorage.getItem('media_tracker_auth')
  if (savedAuth) {
    setIsAuthenticated(true)
    setUser(JSON.parse(savedAuth))
  }
}, [])

// Login mock
async function handleLogin() {
  const mockUser = {
    id: crypto.randomUUID(),
    email: 'usuario@ejemplo.com',
    name: 'Usuario Demo',
    avatar: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=random',
  }

  setUser(mockUser)
  setIsAuthenticated(true)
  localStorage.setItem('media_tracker_auth', JSON.stringify(mockUser))
}

// Logout mock
async function handleLogout() {
  setUser(null)
  setIsAuthenticated(false)
  localStorage.removeItem('media_tracker_auth')
}
```

### Implementación en `LoginScreen.jsx`:

Componente que muestra un botón "Continuar con Google" que ejecuta `handleLogin()`.

## Migración a Supabase Auth

### Paso 1: Instalar Supabase

```bash
npm install @supabase/supabase-js
```

### Paso 2: Crear cliente Supabase

```javascript
// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Paso 3: Configurar Google Auth en Supabase

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a Authentication → Providers
3. Habilita Google provider
4. Añade tu Google OAuth Client ID y Secret
5. Configura la URL de redirección (añade tu URL de desarrollo y producción)

### Paso 4: Modificar `App.jsx` para usar Supabase Auth

```javascript
import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) console.error('Error signing in:', error.message)
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error signing out:', error.message)
  }

  if (!session) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const user = session.user
  // ... resto de la app
}
```

### Paso 5: Crear callback handler

```javascript
// src/pages/Callback.jsx
import { useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

export default function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/')
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Autenticando...</p>
    </div>
  )
}
```

### Paso 6: Añadir redirección al router (si usas React Router)

```javascript
// src/main.jsx o donde configures el router
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Callback from './pages/Callback'
import App from './App'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
)
```

## Variables de Entorno

Crea `.env.local`:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Actualizar `storageService.js` con Auth

Cuando migres a Supabase, actualiza cada método para incluir el `user_id`:

```javascript
async getItems() {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('media_items')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

async createItem(item) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('media_items')
    .insert({
      ...item,
      user_id: user.id,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

## RLS Policies Aseguradas

Asegúrate de tener policies para todos los métodos:

```sql
-- Ver solo los propios items
CREATE POLICY "Users can view own items"
  ON media_items FOR SELECT
  USING (auth.uid() = user_id);

-- Crear solo items propios
CREATE POLICY "Users can create own items"
  ON media_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Actualizar solo items propios
CREATE POLICY "Users can update own items"
  ON media_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Borrar solo items propios
CREATE POLICY "Users can delete own items"
  ON media_items FOR DELETE
  USING (auth.uid() = user_id);
```

## Checklist de Migración

- [ ] Instalar @supabase/supabase-js
- [ ] Crear proyecto en Supabase
- [ ] Configurar Google Auth en Supabase
- [ ] Crear tabla media_items con user_id
- [ ] Configurar RLS policies
- [ ] Crear cliente Supabase
- [ ] Reemplazar auth mock por Supabase Auth
- [ ] Reemplazar storageService para usar Supabase
- [ ] Añadir callback handler
- [ ] Probar en desarrollo
- [ ] Desplegar a producción
