import { MediaItem } from './MediaItem'
import { EmptyState } from './EmptyState'

export function MediaList({ items, onDelete, onStatusChange }) {
  if (items.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <MediaItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}
