import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Select } from './ui/Select'
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

export function CreateScreen({ onSubmit }) {
  const navigate = useNavigate()

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

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
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

  async function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const submitData = {
      ...formData,
      year: parseInt(formData.year, 10),
      platform_other: formData.platform === PLATFORM_TYPES.OTHER ? formData.platform_other : '',
    }

    try {
      await onSubmit(submitData)
      navigate('/')
    } catch (error) {
      console.error('Error creating item:', error)
      alert('Error al crear el título. Por favor, inténtalo de nuevo.')
    }
  }

  function handleCancel() {
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al listado
        </button>
      </div>

      <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Añadir nuevo título
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button type="submit">
                Añadir título
              </Button>
            </div>
          </form>
        </div>
      </article>
    </div>
  )
}
