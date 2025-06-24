import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import ThemeProvider from '../Theme'
import queryClient, { persister } from '../config/query.client'

interface AppProviderProps {
	children: React.ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
	return (
		<ThemeProvider>
			<PersistQueryClientProvider
				client={queryClient}
				persistOptions={{ persister }}
			>
				{children}
			</PersistQueryClientProvider>
		</ThemeProvider>
	)
}
