import React from 'react'
import { Trophy, RotateCcw, ArrowLeftCircle } from 'lucide-react'

/**
 * Props for MemoryCardFinished
 * @param totalTime - Total time in ms
 * @param tryCount - Number of attempts
 * @param onRestart - Callback to restart the game
 * @param onBack - Callback to go back to selection
 */
type Props = {
	totalTime: number
	tryCount: number
	onRestart: () => void
	onBack: () => void
}

function formatTime(ms: number) {
	const seconds = Math.floor(ms / 1000)
	const minutes = Math.floor(seconds / 60)
	return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
}

export default function MemoryCardFinished({ totalTime, tryCount, onRestart, onBack }: Props): React.ReactElement {
	return (
		<div className="text-center py-8">
			<div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-xl p-8 mb-6">
				<Trophy className="text-yellow-400 mx-auto mb-4" size={64} />
				<h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
				<p className="text-white/80 text-lg mb-4">You have completed the game!</p>
				<div className="flex justify-center space-x-8 mb-6">
					<div className="text-white/90">
						<div className="text-lg font-semibold">Time</div>
						<div className="text-2xl">{formatTime(totalTime)}</div>
					</div>
					<div className="text-white/90">
						<div className="text-lg font-semibold">Attempts</div>
						<div className="text-2xl">{tryCount}</div>
					</div>
				</div>
				<div className="flex justify-center space-x-4">
					<button
						className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition"
						onClick={onBack}
					>
						<ArrowLeftCircle className="mr-2" size={20} /> Back
					</button>
					<button
						className="flex items-center px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition"
						onClick={onRestart}
					>
						<RotateCcw className="mr-2" size={20} /> Restart
					</button>
				</div>
			</div>
		</div>
	)
}
