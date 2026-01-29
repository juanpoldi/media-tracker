# Changelog

## v0.2.1 - 2024-01-29 (En Progreso 🚧)

### Correcciones Críticas

#### Tailwind CSS v4
- ✅ Eliminado `tailwind.config.js` (v4 usa configuración CSS-based)
- ✅ Corregida sintaxis de `@import "tailwindcss"` en `src/index.css`
- ✅ Eliminados imports incorrectos `@import "tailwindcss/base"`, `@import "tailwindcss/components"`, `@import "tailwindcss/utilities"`
- ✅ Configuración correcta de `@theme` en CSS

#### React Router
- ✅ Reestructurado `App.jsx` para usar patrón Layout/Outlet
- ✅ Corregido error de `useNavigate()` fuera del `BrowserRouter`
- ✅ Separado componente `AppContent` del wrapper `BrowserRouter`
- ✅ Añadidos componentes `Layout`, `Home`, `Create`, `Detail` para estructura anidada

#### Configuración Vite
- ✅ Actualizado `vite.config.js` con configuración de PostCSS
- ✅ Configurado puerto por defecto (3000)

### Archivos Modificados
- `tailwind.config.js` - **ELIMINADO**
- `src/index.css` - Corregida sintaxis Tailwind v4
- `src/App.jsx` - Reestructurado React Router
- `src/main.jsx` - Limpieza de código
- `vite.config.js` - Configuración PostCSS

### Estado del Proyecto
🚧 **EN PROGRESO** - Corrigiendo errores de configuración y estructura

---

## v0.2.0 - 2024-01-29

### Nuevas Funcionalidades

#### Navegación
- ✅ Navegación por rutas con React Router
- ✅ Rutas compartibles para cada título
- ✅ Pantalla de detalle en página completa
- ✅ Pantalla de crear en página completa
- ✅ Header compartido en todas las rutas
- ✅ Botón "Volver al listado" en detalle y crear
- ✅ Botón "Ver detalles" en cada card
- ✅ Botón "Editar" en cada card

#### Dark Mode
- ✅ Dark mode activado por defecto
- ✅ Toggle de tema en el header
- ✅ Todos los componentes actualizados para ambos modos
- ✅ Transiciones suaves entre modos
- ✅ Colores adaptados para mejor legibilidad

### Cambios Realizados

#### Arquitectura
- Migrado de modal a pantallas completas
- Separada la navegación de la lógica de estado
- Añadido React Router para gestión de rutas
- Añadido ThemeToggle para cambio de tema
- Eliminado Modal.jsx (ya no necesario)

#### Componentes Creados
- `CreateScreen.jsx` - Pantalla para crear nuevos títulos
- `DetailScreen.jsx` - Pantalla de detalle y edición
- `ThemeToggle.jsx` - Toggle de dark/light mode

#### Componentes Actualizados
- `App.jsx` - Añadido Router, dark mode, Header compartido
- `MediaItem.jsx` - Añadido botón "Ver detalles", botón "Editar", dark mode
- `MediaList.jsx` - Eliminado prop onEdit
- `LoginScreen.jsx` - Añadido dark mode
- `EmptyState.jsx` - Añadido dark mode
- `Button.jsx` - Añadido dark mode
- `Input.jsx` - Añadido dark mode
- `Textarea.jsx` - Añadido dark mode
- `Select.jsx` - Añadido dark mode
- `Badge.jsx` - Añadido prop className
- `index.css` - Añadido estilos para dark mode

#### Rutas
- `/` - Pantalla principal con listado
- `/create` - Pantalla para crear nuevo título
- `/item/:id` - Pantalla de detalle y edición

#### Documentación
- Creado `NAVIGATION.md` - Guía de navegación y rutas
- Creado `DARK_MODE.md` - Guía completa de dark mode
- Actualizado `README.md` - Información sobre rutas y dark mode
- Actualizado `NAVIGATION.md` - Incluye ruta /create
- Actualizado `ESTRUCTURA.md` - Estructura actualizada

### Mejoras de UX

- Mejor experiencia en dispositivos móviles con pantallas completas
- Botón "Ver detalles" funciona correctamente en cada card
- Botón "Editar" en cada card para acceso rápido
- Header muestra u oculta botón "Añadir título" según la ruta
- Dark mode por defecto para mejor experiencia en ambientes oscuros
- Toggle de tema accesible en el header
- Navegación fluida con botón atrás/adelante del navegador

### Bug Fixes

- ✅ Botón "Ver detalles