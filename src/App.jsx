import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useMediaItems } from './hooks/useMediaItems'
import { Button } from './components/ui/Button'
import { MediaList } from './components/MediaList'
import { LoginScreen } from './components/LoginScreen'
import { DetailScreen } from './components/DetailScreen'
import { CreateScreen } from './components/CreateScreen'
import { ThemeToggle } from './components/ThemeToggle'

function Header({ user, onLogout, onOpenCreate, items, isDark, onToggleTheme }) {
  const location = useLocation()
  const isCreatePage = location.pathname === '/create'

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Media Tracker
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {items.length} {items.length === 1 ? 'título' : 'títulos'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{user.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
            >
              Cerrar sesión
            </Button>
            {!isCreatePage && (
              <Button onClick={onOpenCreate}>
                + Añadir título
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function Layout({ user, onLogout, onOpenCreate, items, isDark, onToggleTheme }) {
  return (
    <>
      <Header 
        user={user} 
        onLogout={onLogout} 
        onOpenCreate={onOpenCreate}
        items={items}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </>
  )
}

function Home({ items, onDelete, onStatusChange }) {
  return (
    <MediaList
      items={items}
      onDelete={onDelete}
      onStatusChange={onStatusChange}
    />
  )
}

function Create({ onSubmit }) {
  return <CreateScreen onSubmit={onSubmit} />
}

function Detail({ items, onUpdate, onDelete }) {
  return (
    <DetailScreen
      items={items}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  )
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isDark, setIsDark] = useState(true)
  
  const navigate = useNavigate()

  const {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
  } = useMediaItems()

  useEffect(() => {
    const savedAuth = localStorage.getItem('media_tracker_auth')
    if (savedAuth) {
      setIsAuthenticated(true)
      setUser(JSON.parse(savedAuth))
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

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

  async function handleLogout() {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('media_tracker_auth')
  }

  async function handleCreate(formData) {
    try {
      await createItem(formData)
      navigate('/')
    } catch (error) {
      console.error('Error creating item:', error)
      throw error
    }
  }

  async function handleDelete(id) {
    try {
      await deleteItem(id)
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Error al borrar. Por favor, inténtalo de nuevo.')
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await updateItem(id, { status })
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error al actualizar el estado. Por favor, inténtalo de nuevo.')
    }
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout 
              user={user} 
              onLogout={handleLogout}
              onOpenCreate={() => navigate('/create')}
              items={items}
              isDark={isDark}
              onToggleTheme={() => setIsDark(prev => !prev)}
            />
          }
        >
          <Route index element={<Home items={items} onDelete={handleDelete} onStatusChange={handleStatusChange} />} />
          <Route path="create" element={<Create onSubmit={handleCreate} />} />
          <Route path="item/:id" element={<Detail items={items} onUpdate={updateItem} onDelete={handleDelete} />} />
        </Route>
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
