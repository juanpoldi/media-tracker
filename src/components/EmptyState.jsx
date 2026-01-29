export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg 
        className="w-24 h-24 text-gray-300 dark:text-gray-600 mb-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" 
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        No hay títulos registrados
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm">
        Empieza añadiendo tu primera película o serie para crear tu lista personal.
      </p>
    </div>
  )
}
