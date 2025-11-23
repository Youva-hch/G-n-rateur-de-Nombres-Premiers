import { create } from 'zustand'

/**
 * Zustand store for managing prime numbers state
 */
export const usePrimeStore = create((set, get) => ({
  // State
  primes: [],
  currentPrime: null,
  isLoading: false,
  error: null,
  history: [],

  // Actions
  setPrimes: (primes) => set({ primes }),

  addPrime: (prime) => {
    const currentPrimes = get().primes
    if (!currentPrimes.includes(prime)) {
      set({ primes: [...currentPrimes, prime] })
    }
  },

  setCurrentPrime: (prime) => set({ currentPrime: prime }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  addToHistory: (prime, action) => {
    const history = get().history
    set({
      history: [
        { prime, action, timestamp: new Date().toISOString() },
        ...history.slice(0, 49) // Keep last 50 entries
      ]
    })
  },

  clearHistory: () => set({ history: [] }),

  clearError: () => set({ error: null }),

  reset: () => set({
    primes: [],
    currentPrime: null,
    isLoading: false,
    error: null,
    history: []
  })
}))

