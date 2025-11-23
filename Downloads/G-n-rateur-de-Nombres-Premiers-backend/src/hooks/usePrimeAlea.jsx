import { useState, useEffect } from 'react'
import { usePrimeStore } from '../stores/usePrimeStore'
import { getNextPrime } from '../service/verifIsPrime'

/**
 * Custom hook for generating random prime numbers
 */
export const usePrimeAlea = () => {
  const [randomPrime, setRandomPrime] = useState(null)
  const { addPrime, setIsLoading, setError } = usePrimeStore()

  /**
   * Generate a random prime number within a range
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   */
  const generateRandomPrime = async (min = 2, max = 1000) => {
    setIsLoading(true)
    setError(null)

    try {
      // Generate random number in range
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min

      // Find next prime from random number
      let prime = randomNum
      let attempts = 0
      const maxAttempts = 1000

      // If random number is not prime, find next one
      while (!isPrime(prime) && attempts < maxAttempts) {
        prime = getNextPrime(prime)
        attempts++

        // If we go beyond max, start from min
        if (prime > max) {
          prime = min
        }
      }

      if (attempts >= maxAttempts) {
        throw new Error('Impossible de générer un nombre premier dans cette plage')
      }

      setRandomPrime(prime)
      addPrime(prime)

      return prime
    } catch (error) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Helper function to check if number is prime
   * @param {number} n - Number to check
   */
  const isPrime = (n) => {
    if (n < 2) return false
    if (n === 2) return true
    if (n % 2 === 0) return false

    const sqrt = Math.sqrt(n)
    for (let i = 3; i <= sqrt; i += 2) {
      if (n % i === 0) return false
    }
    return true
  }

  return {
    randomPrime,
    generateRandomPrime
  }
}

