import { type IRegisterScoreDto, queryKeys } from '@dacodes/lib'
import { useMutation, useQuery } from '@tanstack/react-query'
import { leaderboardService } from '../services/leaderboard.service'
import { useEffect, useState } from 'react'
import { getMemoryCardLeaderboard } from '../services/leaderboard.service'

export function useLeaderboards() {
	const leaderboardGetTop10 = () =>
		useQuery({
			queryKey: [queryKeys.leaderboard, 'top10'],
			queryFn: leaderboardService.fetchTop10,
			refetchOnMount: true,
		})

	const leaderboardRegisterNewScore = () =>
		useMutation({
			mutationKey: [queryKeys.leaderboard, 'register'],
			mutationFn: (dto: IRegisterScoreDto) =>
				leaderboardService.addScore(dto),
			onSuccess: () => {},
		})

	return {
		leaderboardGetTop10,
		leaderboardRegisterNewScore,
	}
}

export default function useMemoryCardLeaderboard() {
	const [leaderboard, setLeaderboard] = useState<any[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getMemoryCardLeaderboard().then((data) => {
			setLeaderboard(data || [])
			setLoading(false)
		})
	}, [])

	return { leaderboard, loading }
}
