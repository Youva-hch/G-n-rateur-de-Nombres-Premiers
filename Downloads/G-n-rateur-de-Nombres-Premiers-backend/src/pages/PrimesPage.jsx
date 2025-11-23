import { useState } from 'react'
import { usePrimeStore } from '../stores/usePrimeStore'
import { useFetchPrimes, useVerifyPrime } from '../hooks/usePrimeQuery'
import { Prime } from '../components/Prime'
import { Button } from '../components/ui/Button'
import { validateNumberInput } from '../schemas/numberSchema'
import { isPrime } from '../service/verifIsPrime'

/**
 * Page pour gérer les nombres premiers
 * Utilise TanStack Query pour gérer les appels API
 */
export const PrimesPage = () => {
  // État local pour l'input utilisateur
  const [inputValue, setInputValue] = useState('')
  const [validationError, setValidationError] = useState('')
  const [count, setCount] = useState(10) // Nombre de nombres premiers à charger

  // Store Zustand pour gérer l'état global
  const { primes, setPrimes, addToHistory } = usePrimeStore()

  // TanStack Query hook pour récupérer des nombres premiers depuis l'API
  // useFetchPrimes gère automatiquement : isLoading, isError, error
  const { 
    primes: apiPrimes, 
    isLoading: isLoadingPrimes, 
    isError: isErrorPrimes, 
    error: errorPrimes,
    refetch: refetchPrimes 
  } = useFetchPrimes(count)

  // TanStack Query hook pour vérifier un nombre premier via l'API
  const { 
    verify: verifyPrimeApi, 
    isLoading: isVerifying, 
    isError: isErrorVerify, 
    error: errorVerify,
    data: verifyResult 
  } = useVerifyPrime()

  // Quand l'input change, on réinitialise l'erreur de validation
  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    setValidationError('')
  }

  // Ajouter un nombre premier manuellement
  const handleAddPrime = () => {
    // On valide d'abord avec Zod
    const validation = validateNumberInput(inputValue)
    
    if (!validation.valid) {
      setValidationError(validation.error)
      return
    }

    const number = validation.value
    
    // On vérifie côté client aussi (double vérification)
    if (!isPrime(number)) {
      setValidationError(`${number} n'est pas un nombre premier`)
      return
    }

    // On vérifie si le nombre n'est pas déjà dans la liste
    if (!primes.includes(number)) {
      setPrimes([...primes, number])
      addToHistory(number, 'added')
      setInputValue('')
    } else {
      setValidationError('Ce nombre premier est déjà dans la liste')
    }
  }

  // Vérifier un nombre via l'API (avec TanStack Query)
  const handleVerify = (number) => {
    // On appelle la mutation pour vérifier via l'API
    verifyPrimeApi(number)
  }

  // Vérifier un nombre côté client (sans API)
  const handleVerifyClient = (number) => {
    const result = isPrime(number)
    alert(`${number} est ${result ? 'un nombre premier' : 'pas un nombre premier'}`)
  }

  // Supprimer un nombre premier de la liste
  const handleRemove = (number) => {
    setPrimes(primes.filter(p => p !== number))
    addToHistory(number, 'removed')
  }

  // Charger des nombres premiers depuis l'API
  const handleLoadFromApi = () => {
    // refetch va relancer la requête et mettre à jour les données
    refetchPrimes()
  }

  // Ajouter les nombres premiers de l'API à la liste locale
  const handleAddApiPrimes = () => {
    if (apiPrimes && apiPrimes.length > 0) {
      // On fusionne les nouveaux nombres premiers avec ceux existants
      // On évite les doublons
      const newPrimes = [...new Set([...primes, ...apiPrimes])]
      setPrimes(newPrimes)
      addToHistory(null, `loaded_${apiPrimes.length}_from_api`)
    }
  }

  // Effacer toute la liste
  const handleClearAll = () => {
    setPrimes([])
    addToHistory(null, 'cleared_all')
  }

  return (
    <div className="primes-page">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Générateur de Nombres Premiers Optimisé
      </h1>

      {/* Section pour charger depuis l'API */}
      <div className="api-section mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Charger depuis l'API (simulée)
        </h2>
        
        <div className="flex gap-4 items-end mb-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nombre de nombres premiers :
            </label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min="1"
              max="50"
              className="px-3 py-2 border border-gray-300 rounded w-24"
            />
          </div>
          <Button 
            variant="primary" 
            onClick={handleLoadFromApi}
            disabled={isLoadingPrimes}
          >
            {isLoadingPrimes ? 'Chargement...' : 'Charger depuis API'}
          </Button>
        </div>

        {/* Affichage de l'état de chargement */}
        {isLoadingPrimes && (
          <div className="p-3 bg-blue-100 text-blue-800 rounded">
            ⏳ Chargement des nombres premiers depuis l'API...
          </div>
        )}

        {/* Affichage des erreurs */}
        {isErrorPrimes && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-3">
            ❌ Erreur : {errorPrimes?.message || 'Erreur lors du chargement'}
          </div>
        )}

        {/* Affichage des résultats de l'API */}
        {!isLoadingPrimes && !isErrorPrimes && apiPrimes && apiPrimes.length > 0 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded mb-3">
            <p className="text-green-800 mb-2">
              ✅ {apiPrimes.length} nombres premiers chargés avec succès !
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Nombres : {apiPrimes.slice(0, 10).join(', ')}
              {apiPrimes.length > 10 && ` ... et ${apiPrimes.length - 10} autres`}
            </p>
            <Button variant="success" onClick={handleAddApiPrimes} size="sm">
              Ajouter à la liste
            </Button>
          </div>
        )}
      </div>

      {/* Section pour ajouter manuellement */}
      <div className="manual-section mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Ajouter manuellement
        </h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Entrez un nombre premier"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="2"
            />
            {validationError && (
              <p className="mt-1 text-sm text-red-600">{validationError}</p>
            )}
          </div>
          <Button onClick={handleAddPrime}>
            Ajouter
          </Button>
          {primes.length > 0 && (
            <Button variant="danger" onClick={handleClearAll}>
              Tout effacer
            </Button>
          )}
        </div>
      </div>

      {/* Résultat de la vérification via API */}
      {verifyResult && (
        <div className={`p-4 mb-4 rounded ${
          verifyResult.isPrime 
            ? 'bg-green-100 border border-green-400 text-green-800' 
            : 'bg-orange-100 border border-orange-400 text-orange-800'
        }`}>
          {verifyResult.isPrime ? '✅' : '❌'} 
          {verifyResult.number} est {verifyResult.isPrime ? 'un nombre premier' : 'pas un nombre premier'}
          {' '}(vérifié via API)
        </div>
      )}

      {isVerifying && (
        <div className="p-3 bg-blue-100 text-blue-800 rounded mb-4">
          ⏳ Vérification en cours...
        </div>
      )}

      {isErrorVerify && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          ❌ Erreur lors de la vérification : {errorVerify?.message}
        </div>
      )}

      {/* Liste des nombres premiers */}
      <div className="primes-list">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Mes nombres premiers ({primes.length})
        </h2>
        
        {primes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded">
            Aucun nombre premier ajouté. Commencez par en ajouter un ou chargez depuis l'API !
          </div>
        ) : (
          <div className="space-y-3">
            {primes.map((prime) => (
              <Prime
                key={prime}
                number={prime}
                onVerify={handleVerifyClient}
                onVerifyApi={() => handleVerify(prime)}
                onRemove={handleRemove}
                isVerifying={isVerifying}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
