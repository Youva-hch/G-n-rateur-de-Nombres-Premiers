import { usePrimeStore } from '../stores/usePrimeStore'
import { isPrime } from '../service/verifIsPrime'
import { Button } from './ui/Button'

/**
 * Composant pour afficher un nombre premier
 * Permet de vérifier ou supprimer un nombre
 */
export const Prime = ({ number, onVerify, onVerifyApi, onRemove, isVerifying }) => {
  const { addToHistory } = usePrimeStore()
  const isNumberPrime = isPrime(number)

  // Vérifier côté client (rapide, sans API)
  const handleVerify = () => {
    if (onVerify) {
      onVerify(number)
    }
    addToHistory(number, 'verified_client')
  }

  // Vérifier via l'API (avec TanStack Query)
  const handleVerifyApi = () => {
    if (onVerifyApi) {
      onVerifyApi(number)
    }
    addToHistory(number, 'verified_api')
  }

  // Supprimer de la liste
  const handleRemove = () => {
    if (onRemove) {
      onRemove(number)
    }
    addToHistory(number, 'removed')
  }

  return (
    <div className="prime-item">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">{number}</span>
            {isNumberPrime && (
              <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                Premier
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleVerify}>
            Vérifier (Client)
          </Button>
          {onVerifyApi && (
            <Button 
              variant="secondary" 
              onClick={handleVerifyApi}
              disabled={isVerifying}
            >
              {isVerifying ? 'Vérification...' : 'Vérifier (API)'}
            </Button>
          )}
          {onRemove && (
            <Button variant="danger" onClick={handleRemove}>
              Retirer
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
