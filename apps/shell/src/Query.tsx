import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import type { ReactNode } from 'react'
import { persister, queryClient } from './config/query.client'

interface QueryProviderProps {
	children: ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps): React.ReactNode {
	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			{children}
		</PersistQueryClientProvider>
	)
}
