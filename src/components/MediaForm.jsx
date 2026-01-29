import { useState, useEffect } from 'react'
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

export function MediaForm({ item, onSubmit, onCancel }) {
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
    if (item) {
      setFormData({
        title: item.title || '',
        year: item.year || '',
        description: item.description || '',
        status: item.status || STATUS_TYPES.TO_WATCH,
        platform: item.platform || '',
        platform_other: item.platform_other || '',
        cover: item.cover || '',
      })
    }
  }, [item])

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

  function handleSubmit(e) {
    e.preventDefault()

    if (!validate()) {
      return
    }

    const submitData = {
      ...formData,
      year: parseInt(formData.year, 10),
      platform_other: formData.platform === PLATFORM_TYPES.OTHER ? formData.platform_other : '',
    }

    onSubmit(submitData)
  }

  return (
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
        rows={3}
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
            className="w-24 h-36 object-cover rounded-md border border-gray-200"
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
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">
          {item ? 'Guardar cambios' : 'Añadir título'}
        </Button>
      </div>
    </form>
  )
}
