import { useState, useRef, useCallback, useEffect } from 'react'
import { Search, Mail, Phone, Building, Users } from 'lucide-react'
import queryClient from '@dacodes/shell/queryClient'
import { useUsers } from '../hooks/useUserDirectory'

export default function UserDirectoryView(): React.ReactNode {
	const [searchQuery, setSearchQuery] = useState('')
	const { usersGetAll } = useUsers()
	const {
		data,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch
	} = usersGetAll(searchQuery)

	const users = data?.pages.flatMap(page => page.users) || []

	const observer = useRef<IntersectionObserver | null>(null)
	const loadMoreRef = useRef<HTMLDivElement | null>(null)

	const handleViewProfile = (id: number) => {
		queryClient.setQueryData(['navigate'], `/profiles/${id}`)
	}

	// Infinite scroll: observe the load more div
	const lastUserRef = useCallback((node: HTMLDivElement | null) => {
		if (isLoading || isFetchingNextPage) return
		if (observer.current) observer.current.disconnect()
		observer.current = new window.IntersectionObserver(entries => {
			if (entries[0].isIntersecting && hasNextPage) {
				fetchNextPage()
			}
		})
		if (node) observer.current.observe(node)
	}, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage])

	// Debounced search
	function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchQuery(e.target.value)
	}

	// Refetch on search change
	useEffect(() => {
		refetch()
	}, [searchQuery, refetch])

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
			<div className="max-w-7xl mx-auto space-y-6">
				<div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
					<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
						<h1 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
							<Users className="text-blue-400" size={32} />
							<span>User Directory</span>
						</h1>
						<div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
							<div className="relative w-full lg:w-80">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
								<input
									type="text"
									placeholder="Search users..."
									value={searchQuery}
									onChange={handleSearchChange}
									className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>
					</div>

					{isLoading && !users.length ? (
						<div className="text-center py-12">
							<div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
							<p className="text-white/60">Loading users...</p>
						</div>
					) : (
						<>
							<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
								{users.map((user, idx) => {
									const isLast = idx === users.length - 1
									return (
										<div
											key={user.id}
											className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:bg-white/30"
											onClick={() => handleViewProfile(user.id)}
											ref={isLast ? lastUserRef : undefined}
										>
											<div className="flex items-center space-x-4 mb-4">
												<img
													width={64}
													height={64}
													src={user.image}
													alt={`${user.firstName} ${user.lastName}`}
													className="w-16 h-16 rounded-full border-2 border-white/20 object-cover group-hover:border-blue-400 transition-all duration-200"
												/>
												<div>
													<h3 className="text-white font-semibold text-lg group-hover:text-blue-900 transition-all duration-200">
														{user.firstName} {user.lastName}
													</h3>
													<p className="text-white/70 text-sm">@{user.username}</p>
												</div>
											</div>
											<div className="space-y-2 mb-4">
												<div className="flex items-center space-x-2 text-white/80">
													<Mail size={16} />
													<span className="text-sm">{user.email}</span>
												</div>
												{'phone' in user && (user as any).phone && (
													<div className="flex items-center space-x-2 text-white/80">
														<Phone size={16} />
														<span className="text-sm">{(user as any).phone}</span>
													</div>
												)}
												{user.company && (
													<div className="flex items-center space-x-2 text-white/80">
														<Building size={16} />
														<span className="text-sm">{user.company.name}</span>
													</div>
												)}
											</div>
										</div>
									)
								})}
							</div>
							<div ref={loadMoreRef}></div>
							{isFetchingNextPage && (
								<div className="text-center py-4">
									<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
									<p className="text-white/60">Loading more users...</p>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
