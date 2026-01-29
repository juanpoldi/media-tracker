# Dark Mode

El modo oscuro está activado por defecto en la aplicación.

## Configuración

### Estado del Tema

El estado del tema se maneja en `App.jsx`:

```javascript
const [isDark, setIsDark] = useState(true)
```

### Aplicación del Tema

El tema se aplica añadiendo o removiendo la clase `dark` del elemento `html`:

```javascript
useEffect(() => {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [isDark])
```

### Componente ThemeToggle

El componente `ThemeToggle.jsx` muestra el icono apropiado según el estado:

- Sol (luz) cuando `isDark = true` (modo oscuro activo)
- Luna cuando `isDark = false` (modo claro activo)

## Estilos Dark Mode

### Clases de Tailwind

Los componentes usan las variantes de Tailwind CSS para dark mode:

```jsx
className="bg-white dark:bg-gray-800"
className="text-gray-900 dark:text-white"
className="border-gray-200 dark:border-gray-700"
```

### Variables CSS

En `src/index.css`:

```css
.dark body {
  background-color: theme('colors.gray.900');
  color: theme('colors.gray.100');
}
```

## Componentes Actualizados

Todos los componentes principales han sido actualizados con soporte para dark mode:

- `Button.jsx`
- `Input.jsx`
- `Textarea.jsx`
- `Select.jsx`
- `Badge.jsx`
- `Modal.jsx`
- `LoginScreen.jsx`
- `EmptyState.jsx`
- `MediaItem.jsx`
- `MediaList.jsx`
- `CreateScreen.jsx`
- `DetailScreen.jsx`

## Colores en Dark Mode

### Fondo
- Principal: `gray-900`
- Secundario: `gray-800`
- Inputs: `gray-700`

### Texto
- Principal: `white`
- Secundario: `gray-300`
- Placeholder: `gray-500`
- Labels: `gray-300`

### Bordes
- Principal: `gray-700`
- Inputs: `gray-600`

### Estados
- Hover: `gray-700` o `gray-600`
- Focus ring: `gray-500` o `gray-400`

## Posibles Mejoras

### Persistencia del Tema

Guardar la preferencia del usuario en localStorage:

```javascript
useEffect(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    setIsDark(savedTheme === 'dark')
  }
}, [])

function handleToggle() {
  const newTheme = !isDark
  setIsDark(newTheme)
  localStorage.setItem('theme', newTheme ? 'dark' : 'light')
}
```

### Detectar Preferencia del Sistema

Usar `window.matchMedia` para detectar la preferencia del sistema:

```javascript
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  setIsDark(mediaQuery.matches)

  const handler = (e) => setIsDark(e.matches)
  mediaQuery.addEventListener('change', handler)

  return () => mediaQuery.removeEventListener('change', handler)
}, [])
```

### Animaciones Suaves

Añadir transiciones al cambiar el tema:

```css
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

## Pruebas

Para probar el modo oscuro:

1. Abre la aplicación en el navegador
2. Haz clic en el icono de sol/luna en el header
3. Verifica que todos los componentes cambien de color apropiadamente
4. Comprueba que los inputs, botones y textos sean legibles en ambos modos
5. Verifica que los bordes y estados hover funcionen correctamente
