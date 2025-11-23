/**
 * Composant Button réutilisable
 * Avec différentes variantes et tailles
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  size = 'md',
  ...props
}) => {
  // Styles selon la taille
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  // Styles de base pour tous les boutons
  const baseStyles = `${sizeStyles[size]} rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2`
  
  // Styles selon la variante (couleur)
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border-2 border-gray-600 text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  }

  // Styles pour l'état disabled
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
