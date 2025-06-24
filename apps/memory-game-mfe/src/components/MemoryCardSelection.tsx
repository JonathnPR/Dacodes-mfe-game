import type { MemoryCardGridSize } from '../hooks/useMemoryGame'
import MemoryCardLeaderboard from './MemoryCardLeaderboard'
import { Gamepad2, Trophy } from 'lucide-react'
import { LeftCircleOutlined } from '@ant-design/icons'
import { queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/shell/queryClient'
import { useState } from 'react'

type Props = {
	handleSelectGridSize: (size: MemoryCardGridSize) => void
}

export default function MemoryCardSelection({
	handleSelectGridSize,
}: Props): React.ReactNode {
	const [activeTab, setActiveTab] = useState<'game' | 'leaderboard'>('game')
	
	const handleBack = () => {
		queryClient.setQueryData([queryKeys.navigate], '/directory')
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Header with Back Button */}
				<div className="flex justify-between items-center">
					<button 
						className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30" 
						onClick={handleBack}
					>
						<LeftCircleOutlined />
						Volver
					</button>
					
					<div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center">
						<Gamepad2 className="text-white" size={32} />
					</div>
				</div>

				{/* Tab Navigation */}
				<div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
					<div className="flex space-x-2">
						<button
							onClick={() => setActiveTab('game')}
							className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
								activeTab === 'game'
									? 'bg-white/20 text-white shadow-lg'
									: 'text-white/80 hover:text-white hover:bg-white/10'
							}`}
						>
							<Gamepad2 size={20} />
							<span className="font-semibold">Memory Game</span>
						</button>
						
						<button
							onClick={() => setActiveTab('leaderboard')}
							className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
								activeTab === 'leaderboard'
									? 'bg-white/20 text-white shadow-lg'
									: 'text-white/80 hover:text-white hover:bg-white/10'
							}`}
						>
							<Trophy size={20} />
							<span className="font-semibold">Leaderboard</span>
						</button>
					</div>
				</div>

				{/* Tab Content */}
				{activeTab === 'game' ? (
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
						<h1 className="text-4xl font-bold text-white mb-4">Memory Game</h1>
						<p className="text-white/80 text-lg mb-8">Test your memory by matching pairs of cards!</p>

						<div className="mb-8">
							<h3 className="text-white text-xl mb-6">Choose Grid Size</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
								{[2, 4, 6, 8, 10].map(size => (
									<button
										key={size}
										onClick={() => handleSelectGridSize(size as MemoryCardGridSize)}
										className="px-6 py-4 rounded-lg text-lg font-medium transition-all duration-200 bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20 hover:border-white/30"
									>
										<div className="text-2xl mb-2">
											{size === 2 ? '🎯' : size === 4 ? '🎮' : size === 6 ? '🎲' : size === 8 ? '🎪' : '🎨'}
										</div>
										{size}x{size}
										<div className="text-sm text-white/60 mt-1">
											{size === 2 ? '4 cards' : size === 4 ? '16 cards' : size === 6 ? '36 cards' : size === 8 ? '64 cards' : '100 cards'}
										</div>
									</button>
								))}
							</div>
						</div>

						<div className="text-white/60 text-sm">
							<p>Click on a grid size to start playing!</p>
						</div>
					</div>
				) : (
					<MemoryCardLeaderboard />
				)}
			</div>
		</div>
	)
}
