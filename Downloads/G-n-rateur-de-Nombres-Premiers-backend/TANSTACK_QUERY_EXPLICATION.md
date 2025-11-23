# Explication : TanStack Query + Validation Zod

## 📚 Ce que j'ai appris et implémenté

### 1. TanStack Query (anciennement React Query)

**Pourquoi utiliser TanStack Query ?**
- Gère automatiquement les états : loading, error, success
- Met en cache les résultats des requêtes
- Refetch automatique si besoin
- Moins de code à écrire pour gérer les appels API

**Comment ça marche ?**

#### Configuration (dans main.jsx)
```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes avant que les données soient obsolètes
      cacheTime: 1000 * 60 * 10, // 10 minutes avant suppression du cache
      retry: 3, // Réessaie 3 fois en cas d'erreur
    },
  },
})
```

#### useQuery (pour récupérer des données)
```jsx
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['primes', count], // Clé unique pour le cache
  queryFn: async () => {
    // Fonction qui fait l'appel API
    return await fetchPrimes(count)
  },
})
```

**États gérés automatiquement :**
- `isLoading` : true pendant le chargement
- `isError` : true s'il y a une erreur
- `error` : l'objet d'erreur
- `data` : les données récupérées
- `refetch` : fonction pour relancer la requête

#### useMutation (pour modifier des données)
```jsx
const mutation = useMutation({
  mutationFn: async (number) => {
    return await verifyPrimeApi(number)
  },
  onSuccess: (data) => {
    // Ce qui se passe si ça réussit
    console.log('Succès !', data)
  },
  onError: (error) => {
    // Ce qui se passe si ça échoue
    console.error('Erreur !', error)
  },
})

// Pour déclencher la mutation :
mutation.mutate(number)
```

### 2. Validation avec Zod

**Pourquoi utiliser Zod ?**
- Valide les données avant de les utiliser
- Messages d'erreur clairs
- Type-safe (même en JavaScript)
- Évite les bugs liés aux données incorrectes

**Comment ça marche ?**

#### Définir un schéma
```jsx
import { z } from 'zod'

// Schéma pour valider une réponse API
const primesResponseSchema = z.object({
  primes: z.array(z.number().int().positive()),
  count: z.number().int().positive(),
  timestamp: z.string()
})
```

#### Valider des données
```jsx
const result = primesResponseSchema.safeParse(data)

if (result.success) {
  // Les données sont valides
  console.log(result.data)
} else {
  // Les données sont invalides
  console.error(result.error.errors)
}
```

### 3. Gestion du cycle de vie API

**Les 3 états principaux :**

1. **Chargement (Loading)**
   ```jsx
   {isLoading && (
     <div>⏳ Chargement en cours...</div>
   )}
   ```

2. **Succès (Success)**
   ```jsx
   {!isLoading && !isError && data && (
     <div>✅ Données chargées ! {data.primes}</div>
   )}
   ```

3. **Échec (Error)**
   ```jsx
   {isError && (
     <div>❌ Erreur : {error.message}</div>
   )}
   ```

## 📁 Structure des fichiers

```
src/
├── api/
│   └── fetchApi.js          # API simulée avec axios
├── hooks/
│   └── usePrimeQuery.jsx    # Hooks TanStack Query
├── schemas/
│   └── numberSchema.jsx     # Schémas Zod de validation
└── pages/
    └── PrimesPage.jsx       # Page qui utilise tout ça
```

## 🔄 Flux complet d'une requête

1. **L'utilisateur clique sur "Charger depuis API"**
2. **TanStack Query détecte la requête** → `isLoading = true`
3. **L'API est appelée** (dans fetchApi.js)
4. **La réponse est validée avec Zod** (dans usePrimeQuery.jsx)
5. **Si valide** → `data` est rempli, `isLoading = false`
6. **Si erreur** → `isError = true`, `error` est rempli, `isLoading = false`
7. **L'UI s'affiche selon l'état** (dans PrimesPage.jsx)

## 💡 Points importants à retenir

- TanStack Query cache automatiquement les résultats
- Zod valide avant d'utiliser les données
- Les états (loading/error/success) sont gérés automatiquement
- On peut refetch manuellement avec `refetch()`
- Les mutations sont pour les actions (POST, PUT, DELETE)
- Les queries sont pour les lectures (GET)

