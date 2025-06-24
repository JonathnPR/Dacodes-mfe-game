import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { queryKeys } from '@dacodes/lib'
import queryClient from '../../config/query.client'

export function useAutoNavigate(): void {
	const navigate = useNavigate()

	useEffect(() => {
		const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
			if (event?.type === 'updated' && event.query.queryKey[0] === queryKeys.navigate) {
				const nextPath = event.query?.state?.data as string

				if (nextPath) {
					navigate(nextPath)
				}
			}
		})

		return () => {
			unsubscribe()
		}
	}, [navigate])
}
