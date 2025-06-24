import QueryClientProviderComponent from './Query'
import RouterProviderComponent from './Router'
import ThemeProvider from './Theme'
import './assets/main.scss'

export default function App(): React.ReactNode {
	return (
		<>
			<ThemeProvider>
				<QueryClientProviderComponent>
					<RouterProviderComponent />
				</QueryClientProviderComponent>
			</ThemeProvider>
		</>
	)
}
