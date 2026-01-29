import { forwardRef } from 'react'

export const Input = forwardRef(({ 
  label,
  type = 'text',
  error,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full
          px-3 py-2
          border
          rounded-md
          text-base
          bg-white dark:bg-gray-700
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-gray-500 dark:focus:ring-gray-400
          focus:border-transparent
          disabled:bg-gray-100 dark:disabled:bg-gray-800
          disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
