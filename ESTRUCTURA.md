# Estructura de Carpetas y Archivos

## Directorio Principal

```
media-tracker/
├── src/
│   ├── components/
│   │   ├── ui/                    # Componentes UI estilo Catalyst
│   │   │   ├── Button.jsx         # Botón reutilizable
│   │   │   ├── Input.jsx          # Input de texto
│   │   │   ├── Textarea.jsx       # Área de texto
│   │   │   ├── Select.jsx         # Selector desplegable
│   │   │   ├── Modal.jsx          # Modal/dialog
│   │   │   └── Badge.jsx          # Badge de estado
│   │   ├── LoginScreen.jsx        # Pantalla de login (mock)
│   │   ├── DetailScreen.jsx       # Pantalla de detalle y edición
│   │   ├── MediaList.jsx          # Lista de títulos
│   │   ├── MediaItem.jsx          # Item individual en la lista
│   │   ├── MediaForm.jsx          # Formulario crear
│   │   └── EmptyState.jsx         # Estado vacío cuando no hay items
│   ├── services/
│   │   └── storageService.js      # Servicio de persistencia (localStorage)
│   ├── hooks/
│   │   └── useMediaItems.js       # Hook personalizado para gestión de estado
│   ├── utils/
│   │   └── constants.js           # Constantes, tipos y seed inicial
│   ├── App.jsx                    # Componente principal con React Router
│   ├── main.jsx                   # Entry point de React
│   └── index.css                  # Estilos globales con Tailwind CSS
├── public/
│   └── vite.svg                   # Logo de Vite
├── package.json                   # Dependencias del proyecto
├── postcss.config.js              # Configuración de PostCSS
├── vite.config.js                 # Configuración de Vite
├── index.html                     # HTML principal
├── README.md                      # Documentación del proyecto
├── ARCHITECTURE.md                # Arquitectura y migración a Supabase
├── AUTH_MOCK.md                   # Guía de autenticación mock vs Supabase
├── NAVIGATION.md                  # Guía de navegación y rutas
└── ESTRUCTURA.md                  # Este archivo
```

## Archivos Principales

### Componentes UI (`src/components/ui/`)

| Archivo | Descripción | Props principales |
|---------|-------------|-------------------|
| Button.jsx | Botón reutilizable | variant, size, disabled, children |
| Input.jsx | Input de texto | label, type, error, placeholder |
| Textarea.jsx | Área de texto | label, rows, error, placeholder |
| Select.jsx | Selector desplegable | label, options, error |
| Modal.jsx | Modal/dialog | isOpen, onClose, title, children |
| Badge.jsx | Badge de estado | status, className |

### Componentes del Dominio (`src/components/`)

| Archivo | Descripción | Props principales |
|---------|-------------|-------------------|
| LoginScreen.jsx | Pantalla de login con botón Google (mock) | onLogin |
| DetailScreen.jsx | Pantalla de detalle y edición de item | items, onUpdate, onDelete |
| MediaList.jsx | Lista completa de items | items, onDelete, onStatusChange |
| MediaItem.jsx | Item individual (clickeable) | item, onDelete, onStatusChange |
| MediaForm.jsx | Formulario crear | item, onSubmit, onCancel |
| EmptyState.jsx | Estado vacío | - |

### Servicios (`src/services/`)

| Archivo | Descripción | Métodos |
|---------|-------------|---------|
| storageService.js | Persistencia de datos | getItems(), createItem(), updateItem(), deleteItem() |

### Hooks (`src/hooks/`)

| Archivo | Descripción | Retorno |
|---------|-------------|---------|
| useMediaItems.js | Gestión de estado de items | items, loading, createItem(), updateItem(), deleteItem() |

### Utils (`src/utils/`)

| Archivo | Descripción | Exportaciones |
|---------|-------------|---------------|
| constants.js | Constantes y seed | STATUS_TYPES, STATUS_LABELS, PLATFORM_TYPES, PLATFORM_LABELS, STORAGE_KEY, SEED_ITEMS |

## Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home (MediaList) | Listado de todos los títulos |
| `/item/:id` | DetailScreen | Detalle y edición de un título específico |

## Modelo de Datos

```javascript
{
  id: "uuid-string",
  title: "string",
  year: 2024,
  description: "string (opcional)",
  status: "to_watch" | "watched" | "paused" | "dropped",
  platform: "netflix" | "hbo" | "prime" | "disney" | "apple" | "paramount" | "other" | "physical" | "cinema" | "",
  platform_other: "string (opcional, solo cuando platform='other')",
  cover: "https://url-de-imagen.com",
  created_at: "2024-01-29T...",
  updated_at: "2024-01-29T..."
}
```

## Autenticación (Mock)

La app incluye autenticación simulada con localStorage:

```javascript
// Estado de usuario mock
{
  id: "uuid-string",
  email: "usuario@ejemplo.com",
  name: "Usuario Demo",
  avatar: "https://ui-avatars.com/api/?name=Usuario+Demo&background=random"
}
```

La sesión se guarda en `localStorage.setItem('media_tracker_auth', JSON.stringify(user))`

## Seed Inicial

La app incluye 6 títulos de ejemplo:
1. Breaking Bad (2008) - Visto - Netflix
2. The Sopranos (1999) - Visto - HBO Max
3. Better Call Saul (2015) - Pausada - Netflix
4. Mad Men (2007) - Por ver - Sin plataforma
5. The Wire (2002) - Abandonada - HBO Max
6. Severance (2022) - Visto - Apple TV+ (ejemplo de plataforma personalizada)

## Plataformas Disponibles

- Netflix
- HBO Max
- Prime Video
- Disney+
- Apple TV+
- Paramount+
- Otra plataforma (requiere campo personalizado)
- Físico
- Cine

## Estados Disponibles

- Por ver (to_watch)
- Visto (watched)
- Pausada (paused)
- Abandonada (dropped)

## Tecnologías

- React 18+
- Vite 7+
- React Router DOM 6+
- Tailwind CSS 4+
- PostCSS
- Autoprefixer

## Archivos de Documentación

| Archivo | Descripción |
|---------|-------------|
| README.md | Documentación principal del proyecto |
| ARCHITECTURE.md | Arquitectura detallada y guía de migración a Supabase |
| AUTH_MOCK.md | Guía completa de autenticación mock vs Supabase Auth |
| NAVIGATION.md | Guía de navegación y rutas de la aplicación |
| ESTRUCTURA.md | Este archivo - estructura de carpetas y archivos |

## Cambios Recientes

### Navegación por Rutas
- Migrado de modal a pantallas completas
- Añadido React Router para navegación
- Clic en items navega a `/item/:id`
- Header compartido en todas las rutas
- URLs compartibles para cada título
