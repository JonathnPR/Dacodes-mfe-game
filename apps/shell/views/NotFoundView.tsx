import { useNavigate } from 'react-router'
import { LeftCircleOutlined } from '@ant-design/icons'
import { AlertTriangle } from 'lucide-react'

const NotFoundView: React.FC = () => {
	const navigate = useNavigate()

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
			<div className="max-w-4xl mx-auto min-h-[80vh] flex items-center justify-center">
				<div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center w-full max-w-md">
					<div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
						<AlertTriangle className="text-white" size={32} />
					</div>
					
					<h1 className="text-4xl font-bold text-white mb-4">
						Página no encontrada
					</h1>
					
					<p className="text-white/80 text-lg mb-8">
						Lo sentimos, la página que buscas no existe.
					</p>

					<button
						onClick={() => navigate('/')}
						className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/30 w-full"
					>
						<LeftCircleOutlined />
						<span>Volver al inicio</span>
					</button>
				</div>
			</div>
		</div>
	)
}

export default NotFoundView
