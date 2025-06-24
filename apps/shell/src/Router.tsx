import { Suspense, lazy, useMemo, type JSX } from 'react'
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
	useLocation,
} from 'react-router'
import MainLayout from './layouts/MainLayout'

import { type User, queryKeys } from '@dacodes/lib'
import { useQuery } from '@tanstack/react-query'
import queryClient from './config/query.client'
import { useAutoNavigate } from './hooks/subscriptions/useNavigateSubscription'

const LazyAuth = lazy(() => import('@dacodes/auth-mfe/App'))
const LazyDirectory = lazy(() => import('@dacodes/directory-mfe/App'))
const LazyGame = lazy(() => import('@dacodes/memory-game-mfe/App'))
const LazyProfile = lazy(() => import('@dacodes/profile-mfe/App'))
const LazyNotFound = lazy(() => import('../views/NotFoundView'))

function PrivateRoutes(): JSX.Element {
	useAutoNavigate()
	const location = useLocation()
	const { data: user } = useQuery<User>({
		queryKey: [queryKeys.auth],
		queryFn: () => queryClient.getQueryData<User>([queryKeys.auth])!,
	})

	if (user && location.pathname === '/login') {
		return <Navigate to="/directory" replace />
	}
	if (!user && location.pathname !== '/login') {
		queryClient.removeQueries({ queryKey: [queryKeys.users] })
		return <Navigate to="/login" replace />
	}
	return <MainLayout />
}

const routes = [
	{
		path: '/',
		element: <PrivateRoutes />,
		children: [
			{ index: true, element: <Navigate to="/directory" replace /> },
			{ path: 'login', element: <LazyAuth /> },
			{ path: 'directory', element: <LazyDirectory /> },
			{ path: 'game', element: <LazyGame /> },
			{ path: 'profiles/:id', element: <LazyProfile /> },
			{ path: '*', element: <LazyNotFound /> },
		],
	},
]

export default function AppRouter(): JSX.Element {
	const router = useMemo(() => createBrowserRouter(routes), [])
	return (
		<Suspense
			fallback={
				<div className="flex justify-center my-5">
					<div className="loader" style={{ width: 32, height: 32, border: '4px solid #ccc', borderTop: '4px solid #5240e2', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
					<style>{`
					@keyframes spin {
						0% { transform: rotate(0deg); }
						100% { transform: rotate(360deg); }
					}
					`}</style>
				</div>
			}
		>
			<RouterProvider router={router} />
		</Suspense>
	)
}
