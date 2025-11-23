import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPrimes, verifyPrimeApi } from '../api/fetchApi'
import { validateApiResponse, primesResponseSchema, verifyResponseSchema } from '../schemas/numberSchema'

/**
 * Hook personnalisé pour récupérer des nombres premiers
 * useQuery gère automatiquement : loading, error, data, refetch
 * 
 * @param {number} count - Nombre de nombres premiers à récupérer
 * @returns {object} - { data, isLoading, error, refetch }
 */
export const useFetchPrimes = (count = 10) => {
  // useQuery prend une clé unique et une fonction qui fait la requête
  // La clé permet de mettre en cache les résultats
  const query = useQuery({
    // Clé unique pour identifier cette requête dans le cache
    queryKey: ['primes', count],
    
    // Fonction qui fait l'appel API
    queryFn: async () => {
      const response = await fetchPrimes(count)
      
      // On valide la réponse avec Zod avant de la retourner
      const validation = validateApiResponse(response, primesResponseSchema)
      
      if (!validation.valid) {
        throw new Error('Réponse API invalide : ' + JSON.stringify(validation.error))
      }
      
      return validation.data
    },
    
    // Options de la requête
    enabled: true, // On peut activer/désactiver la requête conditionnellement
  })

  // Retourne les données et les états de la requête
  return {
    primes: query.data?.primes || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch, // Fonction pour refaire la requête manuellement
  }
}

/**
 * Hook pour vérifier si un nombre est premier
 * Utilise useMutation car c'est une action qui peut modifier l'état
 * 
 * @returns {object} - { mutate, isLoading, isError, error, data }
 */
export const useVerifyPrime = () => {
  const queryClient = useQueryClient()

  // useMutation est utilisé pour des actions (POST, PUT, DELETE)
  // Contrairement à useQuery, ça ne se déclenche pas automatiquement
  const mutation = useMutation({
    // Fonction qui fait l'appel API
    mutationFn: async (number) => {
      const response = await verifyPrimeApi(number)
      
      // Validation avec Zod
      const validation = validateApiResponse(response, verifyResponseSchema)
      
      if (!validation.valid) {
        throw new Error('Réponse API invalide')
      }
      
      return validation.data
    },
    
    // Callback appelé si la mutation réussit
    onSuccess: (data) => {
      console.log('Vérification réussie :', data)
      
      // On peut invalider d'autres requêtes pour les refetch
      // Par exemple, si on modifie quelque chose, on peut dire à React Query
      // de rafraîchir la liste des nombres premiers
      // queryClient.invalidateQueries(['primes'])
    },
    
    // Callback appelé si la mutation échoue
    onError: (error) => {
      console.error('Erreur lors de la vérification :', error)
    },
  })

  return {
    verify: mutation.mutate, // Fonction à appeler pour déclencher la vérification
    verifyAsync: mutation.mutateAsync, // Version async qui retourne une Promise
    isLoading: mutation.isPending, // isPending est le nouveau nom pour isLoading
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data, // Résultat de la dernière mutation réussie
  }
}

