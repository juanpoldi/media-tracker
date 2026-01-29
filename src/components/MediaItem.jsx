import { useNavigate } from 'react-router-dom'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { STATUS_TYPES, PLATFORM_LABELS, PLATFORM_TYPES } from '../utils/constants'

export function MediaItem({ item, onDelete, onStatusChange }) {
  const navigate = useNavigate()

  function getPlatformLabel(item) {
    if (item.platform === PLATFORM_TYPES.OTHER && item.platform_other) {
      return item.platform_other
    }
    return PLATFORM_LABELS[item.platform]
  }

  function handleViewDetails() {
    navigate(`/item/${item.id}`)
  }

  return (
    <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex gap-4">
        <img
          src={item.cover}
          alt={item.title}
          className="w-20 h-28 object-cover rounded-md flex-shrink-0 bg-gray-100 dark:bg-gray-700"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="112" viewBox="0 0 80 112"%3E%3Crect fill="%23e5e7eb" width="80" height="112"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="10" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo imagen%3C/text%3E%3C/svg%3E'
          }}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{item.year}</span>
                {item.platform && (
                  <>
                    <span>·</span>
                    <span className="text-gray-600 dark:text-gray-300">{getPlatformLabel(item)}</span>
                  </>
                )}
              </div>
            </div>
            <Badge status={item.status} />
          </div>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {item.description || 'Sin descripción'}
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <select
              value={item.status}
              onChange={(e) => onStatusChange(item.id, e.target.value)}
              className="text-sm px-2 py-1 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400"
              aria-label="Cambiar estado"
            >
              <option value={STATUS_TYPES.TO_WATCH}>Por ver</option>
              <option value={STATUS_TYPES.WATCHED}>Visto</option>
              <option value={STATUS_TYPES.PAUSED}>Pausada</option>
              <option value={STATUS_TYPES.DROPPED}>Abandonada</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewDetails}
            >
              Ver detalles
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              Editar
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('¿Estás seguro de que quieres borrar este título?')) {
                  onDelete(item.id)
                }
              }}
            >
              Borrar
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
