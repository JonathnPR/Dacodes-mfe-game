import AppProvider from '@dacodes/shell/AppProvider'
import MemoryCardView from './views/MemoryCardView'

export default function App(): React.ReactNode {
	return (
		<AppProvider>
			<MemoryCardView />
		</AppProvider>
	)
}
