# Navegación en la App

## Rutas Disponibles

La app usa React Router para la navegación entre páginas.

### Ruta Principal
- **URL**: `/`
- **Componente**: `MediaList` con `Header`
- **Descripción**: Pantalla de inicio con listado de todos los títulos

### Ruta de Crear
- **URL**: `/create`
- **Componente**: `CreateScreen` con `Header`
- **Descripción**: Pantalla para añadir un nuevo título

### Ruta de Detalle
- **URL**: `/item/:id`
- **Componente**: `DetailScreen` con `Header`
- **Descripción**: Pantalla completa con detalles y edición de un título específico

## Estructura de Navegación

```
/ (Home)
  ↓ [botón "Añadir título"]
/create (Crear)
  ↓ [botón "Cancelar" o submit]
/ (Home)

/ (Home)
  ↓ [click en item o "Ver detalles" o "Editar"]
/item/:id (Detalle)
  ↓ [botón "Volver al listado"]
/ (Home)
```

## Componentes de Navegación

### MediaItem (src/components/MediaItem.jsx)
- Clic en el item → Navega a `/item/:id` (para ver detalles)
- Botón "Ver detalles" → Navega a `/item/:id`
- Botón "Editar" → Navega a `/item/:id`
- Otros botones de acción → No navegan
- Usa `useNavigate()` de `react-router-dom`

### CreateScreen (src/components/CreateScreen.jsx)
- Recibe prop `onSubmit`
- Botón "Cancelar" → Navega a `/`
- Submit del formulario → Llama a `onSubmit` y navega a `/`
- Botón "Volver al listado" → Navega a `/`
- Usa `useNavigate()` de `react-router-dom`

### DetailScreen (src/components/DetailScreen.jsx)
- Recibe `id` como parámetro de URL
- Botón "Volver al listado" → Navega a `/`
- Botón "Borrar" → Navega a `/` después de borrar
- Usa `useParams()` y `useNavigate()` de `react-router-dom`

### App.jsx
- Contiene el `BrowserRouter`
- Define las rutas
- Componente `Header` compartido entre rutas
- Maneja el estado de `isDark` para el tema

## Header

El header se muestra en todas las rutas autenticadas:
- Logo y título de la app
- Contador de títulos
- Toggle de tema (dark/light mode)
- Avatar y nombre del usuario
- Botón de cerrar sesión
- Botón "Añadir título" (se oculta en la ruta `/create`)

## Componentes de Formularios

### CreateScreen
- Pantalla completa para crear nuevos títulos
- Botón "Añadir título" para guardar
- Botón "Cancelar" para volver sin guardar
- No usa modal

### DetailScreen
- Modo vista: Muestra información completa del título
- Modo edición: Formulario completo para editar el título
- Cambio entre modo vista y edición sin cambiar de ruta
- Botón "Guardar cambios" para actualizar
- Botón "Cancelar edición" para volver al modo vista

## Ejemplo de Navegación

```javascript
// En MediaItem.jsx
import { useNavigate } from 'react-router-dom'

export function MediaItem({ item }) {
  const navigate = useNavigate()

  function handleViewDetails() {
    navigate(`/item/${item.id}`)
  }

  function handleEdit() {
    navigate(`/item/${item.id}`)
  }

  return (
    <>
      <Button onClick={handleViewDetails}>Ver detalles</Button>
      <Button onClick={handleEdit}>Editar</Button>
    </>
  )
}
```

```javascript
// En CreateScreen.jsx
import { useNavigate } from 'react-router-dom'

export function CreateScreen({ onSubmit }) {
  const navigate = useNavigate()

  async function handleSubmit(formData) {
    await onSubmit(formData)
    navigate('/')
  }

  function handleCancel() {
    navigate('/')
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

```javascript
// En DetailScreen.jsx
import { useParams, useNavigate } from 'react-router-dom'

export function DetailScreen() {
  const { id } = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate('/')
  }

  function handleDelete() {
    await deleteItem(id)
    navigate('/')
  }
}
```

## Ventajas de Navegación por Rutas

1. **URL Compartible**: Se puede enviar el enlace de un título
2. **Navegación del navegador**: Funcionan los botones atrás/adelante
3. **SEO**: Cada título tiene su propia URL (futuro)
4. **Bookmarks**: Los usuarios pueden guardar enlaces
5. **Refrescos**: Se puede recargar la página sin perder estado
6. **Formularios en pantallas completas**: Mejor experiencia en móviles
7. **No modales**: Más espacio para trabajar con formularios complejos

## Próximas Mejoras

- Añadir rutas para filtrar por estado: `/status/watched`
- Añadir rutas para filtrar por plataforma: `/platform/netflix`
- Añadir búsqueda: `/search?q=breaking`
- Añadir 404 page si el item no existe
- Añadir animaciones de transición entre rutas
- Persistir la preferencia de tema en localStorage
