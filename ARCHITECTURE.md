# Arquitectura del Proyecto

## Separación de Responsabilidades

### 1. Capa de UI (`src/components/`)
Componentes presentacionales que NO contienen lógica de negocio.

- `components/ui/`: Componentes reutilizables estilo Catalyst
- `components/`: Componentes específicos del dominio

### 2. Capa de Estado (`src/hooks/`)
Lógica de estado que conecta UI con persistencia.

- `useMediaItems.js`: Hook que:
  - Maneja estado local (items, loading)
  - Llama al servicio de persistencia
  - Proporciona funciones para CRUD
  - Maneja errores

### 3. Capa de Persistencia (`src/services/`)
Servicio que abstrae el almacenamiento de datos.

- `storageService.js`: Clase que:
  - Implementa interfaz común (getItems, createItem, updateItem, deleteItem)
  - Actualmente usa localStorage
  - Puede sustituirse por Supabase sin afectar UI

### 4. Capa de Autenticación (`src/App.jsx`)
Lógica de autenticación que actualmente es un mock.

- Estado de autenticación (isAuthenticated, user)
- Funciones handleLogin/handleLogout
- Persistencia de sesión en localStorage
- Pantalla de login cuando no autenticado

## Flujo de Datos

```
Usuario → Login → Auth (mock) → UI → useMediaItems → storageService → localStorage
                          ↑                    ↓
                          └────────────────────┘
```

## Flujo de Autenticación (Actual - Mock)

```
Usuario → "Continuar con Google" 
       → handleLogin() 
       → Crear mockUser 
       → Guardar en localStorage 
       → setIsAuthenticated(true) 
       → Mostrar app principal
```

## Flujo de Autenticación (Futuro - Supabase)

```
Usuario → "Continuar con Google" 
       → supabase.auth.signInWithOAuth({ provider: 'google' })
       → Redirect a Google
       → Google auth
       → Redirect a app con session
       → Supabase establece sesión
       → Mostrar app principal
```

## Migración a Supabase

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

### Paso 3: Modificar App.jsx para usar Supabase Auth

**Reemplazar estado de autenticación:**
```javascript
// Estado actual (mock)
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [user, setUser] = useState(null)

// Estado futuro (Supabase)
const [session, setSession] = useState(null)
```

**Reemplazar useEffect de inicialización:**
```javascript
// Actual (mock)
useEffect(() => {
  const savedAuth = localStorage.getItem('media_tracker_auth')
  if (savedAuth) {
    setIsAuthenticated(true)
    setUser(JSON.parse(savedAuth))
  }
}, [])

// Futuro (Supabase)
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
```

**Reemplazar handleLogin:**
```javascript
// Actual (mock)
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

// Futuro (Supabase)
async function handleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
  if (error) console.error('Error signing in:', error.message)
}
```

**Reemplazar handleLogout:**
```javascript
// Actual (mock)
async function handleLogout() {
  setUser(null)
  setIsAuthenticated(false)
  localStorage.removeItem('media_tracker_auth')
}

// Futuro (Supabase)
async function handleLogout() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Error signing out:', error.message)
}
```

**Reemplazar condición de autenticación:**
```javascript
// Actual (mock)
if (!isAuthenticated) {
  return <LoginScreen onLogin={handleLogin} />
}

// Futuro (Supabase)
if (!session) {
  return <LoginScreen onLogin={handleLogin} />
}

const user = session.user
```

### Paso 4: Modificar storageService.js

**Cambiar `getItems()`:**
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
```

**Cambiar `createItem(item)`:**
```javascript
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

**Cambiar `updateItem(id, updates)`:**
```javascript
async updateItem(id, updates) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('media_items')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id) // Seguridad: solo del usuario actual
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

**Cambiar `deleteItem(id)`:**
```javascript
async deleteItem(id) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { error } = await supabase
    .from('media_items')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Seguridad: solo del usuario actual
  
  if (error) throw error
  return id
}
```

### Paso 5: Crear tabla en Supabase

```sql
CREATE TABLE media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'to_watch',
  platform TEXT,
  platform_other TEXT,
  cover TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_media_items_user_id ON media_items(user_id);
CREATE INDEX idx_media_items_status ON media_items(status);
CREATE INDEX idx_media_items_created_at ON media_items(created_at DESC);
```

### Paso 6: Configurar Row Level Security (RLS)

```sql
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Solo pueden ver sus propios items
CREATE POLICY "Users can view own items"
  ON media_items FOR SELECT
  USING (auth.uid() = user_id);

-- Solo pueden crear sus propios items
CREATE POLICY "Users can create own items"
  ON media_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Solo pueden actualizar sus propios items
CREATE POLICY "Users can update own items"
  ON media_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Solo pueden borrar sus propios items
CREATE POLICY "Users can delete own items"
  ON media_items FOR DELETE
  USING (auth.uid() = user_id);
```

### Paso 7: Configurar Google Auth en Supabase

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a Authentication → Providers
3. Habilita Google provider
4. Añade tu Google OAuth Client ID y Secret
5. Configura la URL de redirección (añade tu URL de desarrollo y producción)

### Paso 8: Añadir callback handler (Opcional, si usas React Router)

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

## Ventajas de esta Arquitectura

1. **Fácil Testing**: Cada capa puede testearse independientemente
2. **Reutilizable**: Componentes UI pueden usarse en otros proyectos
3. **Mantenible**: Cambios en una capa no afectan a las otras
4. **Escalable**: Fácil añadir nuevas funcionalidades
5. **Preparada para Supabase**: Mínimos cambios requeridos
6. **Auth Desacoplada**: Mock actual facilita desarrollo sin Supabase
