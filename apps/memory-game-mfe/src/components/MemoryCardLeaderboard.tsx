import { type UserScore, queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/shell/queryClient'
import { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { Trophy, Medal, Award, User, Target, Clock, Calendar } from 'lucide-react'
import { useLeaderboards } from '../hooks/useMemoryCardLeaderboard'
import { leaderboardService } from '../services/leaderboard.service'

const VITE_WS_RANK_URL = import.meta.env.VITE_WS_RANK_URL

export default function MemoryCardLeaderboard(): React.ReactNode {
	const socketRef = useRef<Socket>(null)
	const [sortBy, setSortBy] = useState<'score' | 'turns' | 'duration'>('score')
	const [filterBy, setFilterBy] = useState<string>('all')

	const { leaderboardGetTop10 } = useLeaderboards()
	const { data: users = [] } = leaderboardGetTop10()

	useEffect(() => {
		socketRef.current = io(VITE_WS_RANK_URL)

		socketRef.current.on('connect', () => {})

		socketRef.current.on('leaderboard:update', (data) => {
			setUsers(data)
		})

		socketRef.current.on('disconnect', () => {})

		leaderboardService.fetchTop10().then((data) => {
			setUsers(data)
		})

		const setUsers = (users: UserScore[]) => {
			queryClient.setQueryData([queryKeys.leaderboard, 'top10'], users)
		}

		return () => {
			socketRef.current!.disconnect()
		}
	}, [])

	// Convert UserScore to the format expected by the new UI
	const gameResults = users.map((userScore, index) => ({
		id: userScore.user.id,
		username: userScore.user.username,
		score: Math.floor(1000 - (userScore.time / 1000) * 10), // Convert time to score
		turns: Math.floor(userScore.time / 1000 / 2), // Mock turns based on time
		gridSize: '2x2', // Default grid size
		duration: userScore.time,
		timestamp: Date.now() - (index * 86400000), // Mock timestamps
		user: userScore.user
	}))

	const filteredResults = gameResults.filter(result => 
		filterBy === 'all' || result.gridSize === filterBy
	)

	const sortedResults = [...filteredResults].sort((a, b) => {
		switch (sortBy) {
			case 'score':
				return b.score - a.score
			case 'turns':
				return a.turns - b.turns
			case 'duration':
				return a.duration - b.duration
			default:
				return b.score - a.score
		}
	})

	const topResults = sortedResults.slice(0, 10)
	const gridSizes = [...new Set(gameResults.map(result => result.gridSize))]

	const formatTime = (ms: number) => {
		const seconds = Math.floor(ms / 1000)
		const minutes = Math.floor(seconds / 60)
		return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
	}

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString()
	}

	const getRankIcon = (index: number) => {
		switch (index) {
			case 0:
				return <Trophy className="text-yellow-400" size={24} />
			case 1:
				return <Medal className="text-gray-300" size={24} />
			case 2:
				return <Award className="text-orange-400" size={24} />
			default:
				return <span className="text-white font-bold text-lg">#{index + 1}</span>
		}
	}

	const getRankBackground = (index: number) => {
		switch (index) {
			case 0:
				return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
			case 1:
				return 'bg-gradient-to-r from-gray-400/20 to-gray-600/20 border-gray-400/30'
			case 2:
				return 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30'
			default:
				return 'bg-white/5 border-white/10'
		}
	}

	return (
		<div className="space-y-6">
			<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
					<div className="flex flex-wrap gap-4">
						<div>
							<label className="block text-white/80 text-sm mb-2">Sort by:</label>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as 'score' | 'turns' | 'duration')}
								className="bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="score">Highest Score</option>
								<option value="turns">Fewest Turns</option>
								<option value="duration">Fastest Time</option>
							</select>
						</div>

						<div>
							<label className="block text-white/80 text-sm mb-2">Grid size:</label>
							<select
								value={filterBy}
								onChange={(e) => setFilterBy(e.target.value)}
								className="bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="all">All Sizes</option>
								{gridSizes.map(size => (
									<option key={size} value={size}>{size}</option>
								))}
							</select>
						</div>
					</div>

					<div className="text-white/80">
						Total Games: {gameResults.length}
					</div>
				</div>

				{topResults.length === 0 ? (
					<div className="text-center py-12">
						<Trophy className="text-white/30 mx-auto mb-4" size={64} />
						<h3 className="text-xl text-white/60 mb-2">No games played yet</h3>
						<p className="text-white/40">Start playing the Memory Game to see your scores here!</p>
					</div>
				) : (
					<div className="space-y-3">
						{topResults.map((result, index) => (
							<div
								key={result.id}
								className={`p-4 rounded-xl border transition-all duration-200 hover:scale-105 ${getRankBackground(index)}`}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<div className="flex items-center justify-center w-12 h-12">
											{getRankIcon(index)}
										</div>
										
										<div className="flex items-center space-x-4">
											{result.user.image && (
												<img 
													height={48} 
													width={48} 
													src={result.user.image} 
													alt={result.user.firstName}
													className="rounded-full"
												/>
											)}
											
											<div>
												<div className="flex items-center space-x-2">
													<User className="text-blue-400" size={16} />
													<span className="text-white font-semibold">{result.user.firstName} {result.user.lastName}</span>
												</div>
												<div className="flex items-center space-x-4 text-sm text-white/70 mt-1">
													<div className="flex items-center space-x-1">
														<Calendar size={14} />
														<span>{formatDate(result.timestamp)}</span>
													</div>
													<span>User: {result.user.username}</span>
												</div>
											</div>
										</div>
									</div>

									<div className="flex items-center space-x-6 text-right">
										<div className="text-center">
											<div className="text-2xl font-bold text-white">{result.score}</div>
											<div className="text-xs text-white/60">Score</div>
										</div>
										
										<div className="text-center">
											<div className="flex items-center space-x-1 text-white">
												<Target size={16} />
												<span className="font-semibold">{result.turns}</span>
											</div>
											<div className="text-xs text-white/60">Turns</div>
										</div>
										
										<div className="text-center">
											<div className="flex items-center space-x-1 text-white">
												<Clock size={16} />
												<span className="font-semibold">{formatTime(result.duration)}</span>
											</div>
											<div className="text-xs text-white/60">Time</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{gameResults.length > 10 && (
					<div className="mt-6 text-center">
						<p className="text-white/60">
							Showing top 10 results out of {gameResults.length} total games
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
