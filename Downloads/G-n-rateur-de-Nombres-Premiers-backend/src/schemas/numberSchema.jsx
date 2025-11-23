import { z } from 'zod'

/**
 * Schémas de validation avec Zod
 * Zod permet de valider les données avant de les utiliser
 * C'est comme un contrat : on définit ce qu'on attend et Zod vérifie
 */

/**
 * Schéma pour valider un nombre entier positif
 * On peut ajouter des messages d'erreur personnalisés
 */
export const positiveIntegerSchema = z
  .number()
  .int('Le nombre doit être un entier')
  .positive('Le nombre doit être positif')
  .max(1000000, 'Le nombre ne doit pas dépasser 1 000 000')

/**
 * Schéma pour valider la réponse de l'API fetchPrimes
 * On définit exactement la structure qu'on attend de l'API
 */
export const primesResponseSchema = z.object({
  primes: z.array(z.number().int().positive()),
  count: z.number().int().positive(),
  timestamp: z.string() // ISO date string
})

/**
 * Schéma pour valider la réponse de l'API verifyPrimeApi
 */
export const verifyResponseSchema = z.object({
  number: z.number().int(),
  isPrime: z.boolean(),
  method: z.string(),
  timestamp: z.string()
})

/**
 * Validation d'un nombre depuis un input utilisateur
 * Gère les cas où l'utilisateur entre du texte au lieu d'un nombre
 */
export const validateNumberInput = (value) => {
  try {
    // D'abord on essaie de convertir en nombre
    const num = Number(value)
    
    // Puis on valide avec Zod
    const result = positiveIntegerSchema.safeParse(num)
    
    if (result.success) {
      return { 
        valid: true, 
        value: result.data,
        error: null 
      }
    } else {
      // Si erreur, on récupère le premier message d'erreur
      const errorMessage = result.error.errors[0]?.message || 'Nombre invalide'
      return { 
        valid: false, 
        value: null,
        error: errorMessage 
      }
    }
  } catch (error) {
    return { 
      valid: false, 
      value: null,
      error: 'Veuillez entrer un nombre valide' 
    }
  }
}

/**
 * Validation d'une réponse API avec le schéma correspondant
 * Si la réponse ne correspond pas au schéma, on lance une erreur
 */
export const validateApiResponse = (response, schema) => {
  try {
    // Zod vérifie si la réponse correspond au schéma
    const result = schema.safeParse(response)
    
    if (result.success) {
      return { valid: true, data: result.data, error: null }
    } else {
      // Si erreur de validation, on renvoie les détails
      return { 
        valid: false, 
        data: null, 
        error: result.error.errors 
      }
    }
  } catch (error) {
    return { 
      valid: false, 
      data: null, 
      error: 'Erreur lors de la validation de la réponse' 
    }
  }
}

/**
 * Ancien schéma pour compatibilité (utilisé ailleurs dans le code)
 */
export const primeInputSchema = {
  validate: (value) => {
    return validateNumberInput(value)
  }
}
