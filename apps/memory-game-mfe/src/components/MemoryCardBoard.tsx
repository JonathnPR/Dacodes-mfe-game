import React from 'react'
import { useLeaderboards } from '../hooks/useMemoryCardLeaderboard'
import MemoryCard from './MemoryCard'
import MemoryCardFinished from './MemoryCardFinished'
import { Gamepad2, RotateCcw, Clock, Target } from 'lucide-react'
import { useMemoryGame } from '../hooks/useMemoryGame'
import type { MemoryCardGridSize } from '../hooks/useMemoryGame'

type Props = {
	gridSize: MemoryCardGridSize
	handleBack: () => void
}

export default function MemoryCardBoard({
	gridSize,
	handleBack,
}: Props): React.ReactElement {
	const { leaderboardRegisterNewScore } = useLeaderboards()
	const { mutate } = leaderboardRegisterNewScore()

	const {
		cardList,
		tryCount,
		totalTime,
		gameOver,
		handleCardClick,
		handleRestart,
	} = useMemoryGame(gridSize)

	// Registrar score cuando termina el juego
	// (Opcional: podrías mover esto al hook si quieres desacoplar más)
	React.useEffect(() => {
		if (gameOver && totalTime > 0) {
			mutate({ time: totalTime })
		}
	}, [gameOver, totalTime, mutate])

	const formatTime = (ms: number) => {
		const seconds = Math.floor(ms / 1000)
		const minutes = Math.floor(seconds / 60)
		return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
			<div className="max-w-6xl mx-auto space-y-6">
				<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
					<div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
						<h1 className="text-2xl font-bold text-white flex items-center space-x-3">
							<Gamepad2 className="text-purple-400" size={28} />
							<span>Memory Game - {gridSize}x{gridSize}</span>
						</h1>

						<div className="flex items-center space-x-6">
							<div className="flex items-center space-x-2 text-white">
								<Target size={20} />
								<span className="font-semibold">{tryCount}</span>
								<span className="text-sm">Turns</span>
							</div>
							
							<div className="flex items-center space-x-2 text-white">
								<Clock size={20} />
								<span className="font-semibold">{formatTime(totalTime)}</span>
								<span className="text-sm">Time</span>
							</div>
						</div>
					</div>

					<div className="grid gap-2 mb-6 mx-auto" style={{
						gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
						maxWidth: `${gridSize * 80}px`
					}}>
						{cardList.map((card) => (
							<MemoryCard
								key={card.id}
								id={card.id}
								name={card.name}
								revealed={card.revealed}
								matched={card.matched}
								onClick={handleCardClick}
							/>
						))}
					</div>

					<div className="flex justify-center space-x-4">
						<button 
							className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition"
							onClick={handleBack}
						>
							Back
						</button>
						<button 
							className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition"
							onClick={handleRestart}
						>
							<RotateCcw size={16} />
							Restart Game
						</button>
					</div>
				</div>

				{gameOver && (
					<MemoryCardFinished 
						totalTime={totalTime}
						tryCount={tryCount}
						onRestart={handleRestart}
						onBack={handleBack}
					/>
				)}
			</div>
		</div>
	)
}
