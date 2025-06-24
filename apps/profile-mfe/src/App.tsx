import AppProvider from '@dacodes/shell/AppProvider'
import UserProfileView from './views/UserProfileView'
import './styles.css'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<UserProfileView />
		</AppProvider>
	)
}
