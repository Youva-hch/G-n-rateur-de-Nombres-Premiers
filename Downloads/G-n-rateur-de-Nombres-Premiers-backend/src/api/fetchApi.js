import axios from 'axios'

/**
 * API simulée pour les nombres premiers
 * Dans un vrai projet, ça serait une vraie API REST
 * Ici on simule un délai réseau avec setTimeout
 */

// Base URL pour l'API (simulée)
const API_BASE_URL = 'https://api.example.com'

// On crée une instance axios pour gérer les requêtes
// On peut configurer des headers, timeouts, etc.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 secondes max pour une requête
})

/**
 * Simule une API qui retourne des nombres premiers
 * @param {number} count - Nombre de nombres premiers à récupérer
 * @returns {Promise<{primes: number[], count: number}>}
 */
export const fetchPrimes = async (count = 10) => {
  // Simule un délai réseau (comme une vraie API)
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simule parfois une erreur (comme une vraie API pourrait le faire)
  // On peut décommenter cette ligne pour tester la gestion d'erreur
  // if (Math.random() < 0.1) throw new Error('Erreur réseau simulée')

  // Génère des nombres premiers aléatoires pour simuler la réponse
  const primes = generateRandomPrimes(count)
  
  // Retourne un objet qui ressemble à une vraie réponse API
  return {
    primes,
    count: primes.length,
    timestamp: new Date().toISOString()
  }
}

/**
 * Simule une API qui vérifie si un nombre est premier
 * @param {number} number - Nombre à vérifier
 * @returns {Promise<{number: number, isPrime: boolean, method: string}>}
 */
export const verifyPrimeApi = async (number) => {
  // Simule un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Vérifie si le nombre est premier (logique simple)
  const isPrime = checkIfPrime(number)

  return {
    number,
    isPrime,
    method: 'api_verification',
    timestamp: new Date().toISOString()
  }
}

/**
 * Génère des nombres premiers aléatoires
 * Fonction helper pour simuler la réponse de l'API
 */
function generateRandomPrimes(count) {
  const knownPrimes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
    157, 163, 167, 173, 179, 181, 191, 193, 197, 199
  ]
  
  // Mélange les nombres premiers et en prend 'count'
  const shuffled = [...knownPrimes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, knownPrimes.length))
}

/**
 * Vérifie si un nombre est premier (méthode simple)
 * Dans un vrai projet, cette logique serait côté serveur
 */
function checkIfPrime(n) {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false

  const sqrt = Math.sqrt(n)
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false
  }
  return true
}
