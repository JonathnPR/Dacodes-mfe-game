import AppProvider from '@dacodes/shell/AppProvider'
import LoginView from './views/LoginView'
import './styles.css'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<LoginView />
		</AppProvider>
	)
}
