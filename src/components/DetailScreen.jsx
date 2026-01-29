import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Select } from './ui/Select'
import { Badge } from './ui/Badge'
import { STATUS_TYPES, STATUS_LABELS, PLATFORM_TYPES, PLATFORM_LABELS } from '../utils/constants'

const statusOptions = Object.entries(STATUS_TYPES).map(([key, value]) => ({
  value,
  label: STATUS_LABELS[value],
}))

const platformOptions = [
  { value: '', label: 'Seleccionar plataforma...' },
  ...Object.entries(PLATFORM_TYPES).map(([key, value]) => ({
    value,
    label: PLATFORM_LABELS[value],
  })),
]

export function DetailScreen({ items, onUpdate, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    description: '',
    status: STATUS_TYPES.TO_WATCH,
    platform: '',
    platform_other: '',
    cover: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const foundItem = items.find(i => i.id === id)
    if (foundItem) {
      setItem(foundItem)
      setFormData({
        title: foundItem.title || '',
        year: foundItem.year || '',
        description: foundItem.description || '',
        status: foundItem.status || STATUS_TYPES.TO_WATCH,
        platform: foundItem.platform || '',
        platform_other: foundItem.platform_other || '',
        cover: foundItem.cover || '',
      })
    }
  }, [id, items])

  if (!item) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gray-500 dark:text-gray-400">Item no encontrado</p>
      </div>
    )
  }

  function handleEdit() {
    setIsEditing(true)
  }

  function handleCancelEdit() {
    setIsEditing(false)
    setFormData({
      title: item.title || '',
      year: item.year || '',
      description: item.description || '',
      status: item.status || STATUS_TYPES.TO_WATCH,
      platform: item.platform || '',
      platform_other: item.platform_other || '',
      cover: item.cover || '',
    })
    setErrors({})
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  function handleStatusChange(status) {
    setFormData(prev => ({ ...prev, status }))
    onUpdate(item.id, { status })
  }

  function validate() {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio'
    }

    if (!formData.year || formData.year < 1888 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Año inválido'
    }

    if (formData.platform === PLATFORM_TYPES.OTHER && !formData.platform_other.trim()) {
      newErrors.platform_other = 'Especifica la plataforma'
    }

    if (!formData.cover.trim()) {
      newErrors.cover = 'La URL de la imagen es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSave() {
    if (!validate()) {
      return
    }

    const submitData = {
      ...formData,
      year: parseInt(formData.year, 10),
      platform_other: formData.platform === PLATFORM_TYPES.OTHER ? formData.platform_other : '',
    }

    try {
      await onUpdate(item.id, submitData)
      setItem({ ...item, ...submitData })
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Error al guardar. Por favor, inténtalo de nuevo.')
    }
  }

  async function handleDelete() {
    if (confirm('¿Estás seguro de que quieres borrar este título?')) {
      try {
        await onDelete(item.id)
        navigate('/')
      } catch (error) {
        console.error('Error deleting item:', error)
        alert('Error al borrar. Por favor, inténtalo de nuevo.')
      }
    }
  }

  function getPlatformLabel(item) {
    if (item.platform === PLATFORM_TYPES.OTHER && item.platform_other) {
      return item.platform_other
    }
    return PLATFORM_LABELS[item.platform]
  }

  const displayItem = isEditing ? formData : item

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al listado
        </button>
      </div>

      <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {isEditing ? (
          <form className="p-6 space-y-4">
            <Input
              id="title"
              name="title"
              label="Título"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder="Ej: Breaking Bad"
            />

            <Input
              id="year"
              name="year"
              label="Año"
              type="number"
              value={formData.year}
              onChange={handleChange}
              error={errors.year}
              placeholder="Ej: 2008"
            />

            <Select
              id="status"
              name="status"
              label="Estado"
              value={formData.status}
              onChange={handleChange}
              options={statusOptions}
            />

            <div className="space-y-2">
              <Select
                id="platform"
                name="platform"
                label="Dónde la he visto"
                value={formData.platform}
                onChange={handleChange}
                options={platformOptions}
              />

              {formData.platform === PLATFORM_TYPES.OTHER && (
                <Input
                  id="platform_other"
                  name="platform_other"
                  label="Otra plataforma"
                  value={formData.platform_other}
                  onChange={handleChange}
                  error={errors.platform_other}
                  placeholder="Ej: Filmin, Rakuten..."
                />
              )}
            </div>

            <Textarea
              id="description"
              name="description"
              label="Descripción"
              value={formData.description}
              onChange={handleChange}
              placeholder="Sinopsis o notas sobre el título..."
              rows={4}
            />

            <Input
              id="cover"
              name="cover"
              label="URL de la imagen"
              value={formData.cover}
              onChange={handleChange}
              error={errors.cover}
              placeholder="https://ejemplo.com/imagen.jpg"
            />

            {formData.cover && (
              <div className="mt-2">
                <img
                  src={formData.cover}
                  alt="Vista previa"
                  className="w-48 h-72 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancelEdit}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={handleSave}>
                Guardar cambios
              </Button>
            </div>
          </form>
        ) : (
          <div className="md:flex">
            <div className="md:w-1/3 p-6 bg-gray-50 dark:bg-gray-900">
              <img
                src={displayItem.cover}
                alt={displayItem.title}
                className="w-full h-auto max-w-xs mx-auto object-cover rounded-lg shadow-md"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450"%3E%3Crect fill="%23e5e7eb" width="300" height="450"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo imagen%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>

            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                    {displayItem.title}
                  </h1>
                  <div className="flex items-center gap-3 text-lg text-gray-600 dark:text-gray-400">
                    <span>{displayItem.year}</span>
                    {displayItem.platform && (
                      <>
                        <span>·</span>
                        <span className="text-gray-700 dark:text-gray-300">{getPlatformLabel(displayItem)}</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge status={displayItem.status} className="text-base" />
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Estado</h2>
                <select
                  value={displayItem.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                  aria-label="Cambiar estado"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Descripción</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {displayItem.description || 'Sin descripción'}
                </p>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button onClick={handleEdit}>
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                >
                  Borrar
                </Button>
              </div>

              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Creado: {new Date(displayItem.created_at).toLocaleDateString('es-ES')}
                {displayItem.updated_at !== displayItem.created_at && (
                  <> · Actualizado: {new Date(displayItem.updated_at).toLocaleDateString('es-ES')}</>
                )}
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
