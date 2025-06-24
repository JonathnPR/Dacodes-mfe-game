import './styles.css'
import AppProvider from '@dacodes/shell/AppProvider'
import UserDirectoryView from './views/UserDirectoryView'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<UserDirectoryView />
		</AppProvider>
	)
}
