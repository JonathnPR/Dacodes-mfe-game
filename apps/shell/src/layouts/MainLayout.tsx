import { type User as UserType, queryKeys } from '@dacodes/lib'
import { useQuery } from '@tanstack/react-query'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { User, Search, Trophy, Gamepad2, LogOut, LogIn } from 'lucide-react'
import queryClient, { persister } from '../config/query.client'

export default function MainLayout(): React.ReactNode {
	const { data } = useQuery<UserType>({
		queryKey: [queryKeys.auth],
		queryFn: () => queryClient.getQueryData<UserType>([queryKeys.auth])!,
	})

	const location = useLocation()
	const navigate = useNavigate()

	function handleLogout() {
		queryClient.clear()
		persister.removeClient()
		window.localStorage.removeItem('token')
		window.location.href = '/'
	}

	const navigationItems = [
		{ path: '/directory', icon: Search, label: 'Directory' },
		{ path: '/game', icon: Gamepad2, label: 'Memory Game' },
	]

	const isActive = (path: string) => location.pathname === path
	const isLogged = !!data

	return (
		<div className="min-h-screen">
			<nav className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-8">
							<div 
								className="text-2xl font-bold text-white cursor-pointer"
								onClick={() => navigate('/directory')}
							>
								DaCodes
							</div>
							
							<div className="hidden md:flex space-x-4">
								{navigationItems.map(({ path, icon: Icon, label }) => (
									<button
										key={path}
										onClick={() => navigate(path)}
										className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
											isActive(path)
												? 'bg-white/20 text-white shadow-lg'
												: 'text-white/80 hover:text-white hover:bg-white/10'
										}`}
									>
										<Icon size={18} />
										<span>{label}</span>
									</button>
								))}
							</div>
						</div>
						
						<div className="flex items-center space-x-4">
							{isLogged ? (
								<>
									<div className="flex items-center space-x-2 text-white">
										{data.image ? (
											<img 
												src={data.image} 
												alt={data.username} 
												className="w-8 h-8 rounded-full"
											/>
										) : (
											<User size={20} />
										)}
										<span className="sm:block hidden">
											{data.firstName} {data.lastName}
										</span>
									</div>

									<button
										onClick={handleLogout}
										className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
									>
										<LogOut size={18} />
										<span className="hidden sm:block">Logout</span>
									</button>
								</>
							) : (
								<button
									onClick={() => navigate('/login')}
									className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all duration-200"
								>
									<LogIn size={18} />
									<span className="hidden sm:block">Login</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</nav>
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	)
}
