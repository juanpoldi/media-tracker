import { STATUS_TYPES, STATUS_LABELS } from '../../utils/constants'

export function Badge({ status, className = '' }) {
  const variants = {
    [STATUS_TYPES.TO_WATCH]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    [STATUS_TYPES.WATCHED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    [STATUS_TYPES.PAUSED]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    [STATUS_TYPES.DROPPED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-0.5
        rounded-full
        text-xs
        font-medium
        ${variants[status] || variants[STATUS_TYPES.TO_WATCH]}
        ${className}
      `}
    >
      {STATUS_LABELS[status] || STATUS_LABELS[STATUS_TYPES.TO_WATCH]}
    </span>
  )
}
