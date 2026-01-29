# Media Tracker

> **⚠️ PROYECTO EN PROGRESO** - Este proyecto está activamente en desarrollo y puede contener cambios frecuentes.

App minimalista para tracking de series y películas con arquitectura preparada para Supabase.

## 🌟 Características

- **Navegación por rutas** con URLs compartibles
- **Dark mode activado por defecto** con toggle
- **Pantallas completas** para crear y editar
- **Header compartido** en todas las rutas
- **Arquitectura modular** preparada para Supabase
- **Autenticación mock** con Google OAuth (futuro)

## 📋 Funcionalidades

- ✅ Listado de títulos con cards
- ✅ Pantalla de detalle para cada título
- ✅ Pantalla de crear título (página completa)
- ✅ Pantalla de editar título (modo inline en detalle)
- ✅ Borrar título
- ✅ Cambiar estado desde la lista o detalle
- ✅ Navegación por rutas (URLs compartibles)
- ✅ Botón "Ver detalles" en cada card
- ✅ Botón "Editar" en cada card
- ✅ Registro de plataforma donde se ha visto
- ✅ Campo personalizado para "otra plataforma"
- ✅ Pantalla de login con Google (mock)
- ✅ Dark mode activado por defecto con toggle
- ✅ Persistencia en localStorage
- ✅ Seed inicial con 6 ejemplos
- ✅ Estados vacíos bien diseñados
- ✅ Validaciones de formulario
- ✅ Accesibilidad básica (labels, focus ring, navegación teclado)

## 📁 Estructura de Carpetas

```
src/
├── components/
│   ├── ui/                    # Componentes UI estilo Catalyst
│   │   ├── Button.jsx         # Botón reutilizable
│   │   ├── Input.jsx          # Input de texto
│   │   ├── Textarea.jsx       # Área de texto
│   │   ├── Select.jsx         # Selector desplegable
│   │   ├── Modal.jsx          # Modal/dialog (no usado actualmente)
│   │   └── Badge.jsx          # Badge de estado
│   ├── LoginScreen.jsx        # Pantalla de login (mock)
│   ├── DetailScreen.jsx       # Pantalla de detalle y edición
│   ├── CreateScreen.jsx       # Pantalla de crear título
│   ├── MediaList.jsx          # Lista de títulos
│   ├── MediaItem.jsx          # Item individual
│   ├── MediaForm.jsx          # Formulario (legacy, no usado)
│   ├── EmptyState.jsx         # Estado vacío
│   └── ThemeToggle.jsx        # Toggle dark/light mode
├── services/
│   └── storageService.js      # Capa de persistencia (localStorage)
├── hooks/
│   └── useMediaItems.js       # Hook personalizado para estado
├── utils/
│   └── constants.js           # Constantes y seed inicial
├── App.jsx                    # Componente principal con React Router
├── main.jsx                   # Entry point
└── index.css                  # Estilos globales (Tailwind + dark mode)
```

## 🚀 Tecnologías

- **React 19+** - Framework de UI
- **Vite 7+** - Build tool y dev server
- **React Router DOM** - Navegación por rutas
- **Tailwind CSS 4+** - Framework de CSS
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 🏗️ Arquitectura

### Capa de Persistencia
- **Actual**: LocalStorage vía `storageService.js`
- **Futuro**: Sustituible por Supabase sin tocar UI

### Capa de Estado
- `useMediaItems.js`: Hook que abstrae lógica de estado
- Separa UI de lógica de negocio
- Maneja loading, errores y CRUD operations

### Capa de UI
- Componentes modulares estilo Catalyst
- Tailwind CSS con paleta neutral (grises)
- Tamaño base de texto: 18px
- Dark mode activado por defecto
- Responsive design

### Navegación
- React Router para navegación por rutas
- URLs compartibles para cada título
- Header compartido en todas las rutas autenticadas
- Botón atrás/adelante del navegador funcionales

### Autenticación (Mock)
- **Actual**: Simulada con localStorage
- **Futuro**: Supabase Auth con Google OAuth
- Sesión persistente en navegador

## 📍 Rutas

| Ruta | Descripción | Header |
|------|-------------|--------|
| `/` | Pantalla principal con listado de títulos | ✅ |
| `/create` | Pantalla para añadir nuevo título | ✅ (sin botón "Añadir") |
| `/item/:id` | Pantalla de detalle y edición de un título | ✅ |
| `/login` | Pantalla de login (implícita) | ❌ |

## 🌗 Dark Mode

El modo oscuro está **activado por defecto**. El toggle de tema se encuentra en el header a la izquierda del nombre de usuario.

### Características
- ✅ Activo por defecto
- ✅ Toggle con icono de sol/luna
- ✅ Todos los componentes adaptados
- ✅ Colores optimizados para legibilidad
- ⏳ Persistencia de preferencia (futuro)

Ver más detalles en [DARK_MODE.md](./DARK_MODE.md).

## 🎨 Modelo de Datos

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

## 🎯 Estados Disponibles

- **Por ver** (to_watch) - Aún no visto
- **Visto** (watched) - Completado
- **Pausada** (paused) - Viendo pero pausado
- **Abandonada** (dropped) - No continuado

## 📺 Plataformas Soportadas

- Netflix
- HBO Max
- Prime Video
- Disney+
- Apple TV+
- Paramount+
- Otra plataforma (con campo personalizado)
- Físico (DVD/Blu-ray)
- Cine

## 🔧 Scripts

```bash
npm run dev      # Servidor de desarrollo en http://localhost:3000
npm run build    # Build para producción
npm run preview  # Preview del build de producción
```

## 📚 Documentación

| Archivo | Descripción |
|---------|-------------|
| [README.md](./README.md) | Este archivo |
| [ESTRUCTURA.md](./ESTRUCTURA.md) | Estructura completa de carpetas y archivos |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Arquitectura detallada y migración a Supabase |
| [AUTH_MOCK.md](./AUTH_MOCK.md) | Guía de autenticación mock vs Supabase |
| [NAVIGATION.md](./NAVIGATION.md) | Guía de navegación y rutas |
| [DARK_MODE.md](./DARK_MODE.md) | Guía completa de dark mode |
| [CHANGELOG.md](./CHANGELOG.md) | Historial de cambios |

## 🚀 Migración a Supabase

### Tabla Supabase

```sql
CREATE TABLE media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
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
```

### RLS Policies

```sql
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own items"
  ON media_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own items"
  ON media_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own items"
  ON media_items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own items"
  ON media_items FOR DELETE
  USING (auth.uid() = user_id);
```

Ver más detalles en [ARCHITECTURE.md](./ARCHITECTURE.md).

## 💡 Flujo de Usuario

1. **Login**: Usuario inicia sesión con Google (mock)
2. **Home**: Ve listado de sus títulos
3. **Crear**: Clic en "Añadir título" → Ruta `/create` → Llena formulario → Guarda
4. **Ver detalles**: Clic en item o "Ver detalles" → Ruta `/item/:id` → Ve información completa
5. **Editar**: Clic en "Editar" → Cambia a modo edición en misma pantalla → Guarda cambios
6. **Borrar**: Clic en "Borrar" → Confirma → Vuelve al home
7. **Cambiar estado**: Usa dropdown en lista o detalle → Estado actualizado inmediatamente
8. **Cambiar tema**: Clic en toggle de tema → Cambia entre dark/light mode
9. **Logout**: Clic en "Cerrar sesión" → Vuelve a pantalla de login

## 🔄 Estado del Proyecto

### v0.2.0 (Actual - En Progreso 🚧)
- ✅ Navegación por rutas implementada
- ✅ Dark mode activado por defecto
- ✅ Pantallas completas para crear/editar
- ✅ Header compartido en todas las rutas
- ✅ Todos los componentes adaptados para dark mode
- ✅ Tailwind CSS v4 configurado correctamente
- ✅ Estructura de rutas con Layout y Outlet

### Roadmap (Futuro)
- ⏳ Migración a Supabase Auth
- ⏳ Migración a Supabase Database
- ⏳ Persistencia de preferencia de tema
- ⏳ Filtrado por estado y plataforma
- ⏳ Búsqueda de títulos
- ⏳ Página 404 personalizada
- ⏳ Animaciones de transición
- ⏳ Exportar/importar datos
- ⏳ Estadísticas de visualización

## 📝 Notas

- **🚧 PROYECTO EN DESARROLLO ACTIVO** - Puede haber cambios frecuentes y breaking changes
- La app usa localStorage para persistencia temporal
- La autenticación es un mock de Google OAuth
- La arquitectura está preparada para migrar a Supabase sin tocar la UI
- El dark mode está activado por defecto pero la preferencia no se persiste
- Todos los componentes siguen las mejores prácticas de accesibilidad
- Tailwind CSS v4 usa configuración basada en CSS (no tailwind.config.js)

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Versión**: 0.2.0  
**Estado**: 🚧 En Progreso  
**Última actualización**: 2024-01-29
