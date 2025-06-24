import { ConfigProvider } from 'antd'
import es from 'antd/locale/es_ES'

interface Props {
	children: React.ReactNode
}

export default function ThemeProvider({ children }: Props): React.ReactNode {
	return (
		<ConfigProvider
			locale={es}
			theme={{
				cssVar: true,
				token: {
					fontFamily: 'Assistant',
					colorPrimary: '#5240e2',
					colorText: '#333765',
				},
			}}
		>
			{children}
		</ConfigProvider>
	)
}
