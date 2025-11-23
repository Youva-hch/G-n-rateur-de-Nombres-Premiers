import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'

/**
 * Configuration de TanStack Query (anciennement React Query)
 * QueryClient gère le cache et l'état des requêtes
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Temps avant que les données soient considérées comme obsolètes
      staleTime: 1000 * 60 * 5, // 5 minutes
      // Temps avant que les données soient retirées du cache
      cacheTime: 1000 * 60 * 10, // 10 minutes
      // En cas d'erreur, on réessaie 3 fois avant d'abandonner
      retry: 3,
      // Délai entre chaque tentative
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Si la fenêtre reprend le focus, on refetch les données
      refetchOnWindowFocus: true,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* QueryClientProvider enveloppe l'app pour donner accès à QueryClient partout */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
