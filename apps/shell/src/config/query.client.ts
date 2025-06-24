import { QueryClient } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

// Create a single instance of QueryClient with sensible defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1, // Retry once on failure for better UX
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

// Use localStorage for persistence
export const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

// Persist the query client cache
persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60, // 1 hour
})

export default queryClient
