/**
 * Service for prime number verification
 * Business logic for checking if a number is prime
 */

/**
 * Check if a number is prime using optimized algorithm
 * @param {number} n - Number to check
 * @returns {boolean} True if prime, false otherwise
 */
export const isPrime = (n) => {
  // Edge cases
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false

  // Check divisibility up to sqrt(n)
  const sqrt = Math.sqrt(n)
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false
  }

  return true
}

/**
 * Generate list of prime numbers up to a given limit
 * @param {number} limit - Maximum number to check
 * @returns {number[]} Array of prime numbers
 */
export const generatePrimes = (limit) => {
  const primes = []
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i)
    }
  }
  return primes
}

/**
 * Get next prime number after a given number
 * @param {number} n - Starting number
 * @returns {number} Next prime number
 */
export const getNextPrime = (n) => {
  let candidate = n + 1
  while (!isPrime(candidate)) {
    candidate++
  }
  return candidate
}



