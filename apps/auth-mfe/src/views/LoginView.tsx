import { User, Lock, LogIn, Loader2 } from 'lucide-react'
import queryClient from '@dacodes/shell/queryClient'
import { queryKeys } from '@dacodes/lib'
import { useLogin } from '../hooks/useLogin'
import { useState } from 'react'

export default function LoginView(): React.ReactNode {
	const { authLogin } = useLogin()
	const { mutateAsync, isPending } = authLogin()
	const [credentials, setCredentials] = useState({ username: '', password: '' })
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setSuccess('')
		try {
			const result = await mutateAsync(credentials)
			setSuccess('Login successful! Redirecting...')
			queryClient.setQueryData([queryKeys.auth], result)
			queryClient.setQueryData([queryKeys.navigate], '/directory')
			setTimeout(() => setSuccess(''), 3000)
		} catch (err: any) {
			const backendMsg = err?.response?.data?.message
			setError(backendMsg || 'User or Pass incorrect')
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
			<div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
				<div className="text-center mb-8">
					<div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
						<User className="text-white" size={32} />
					</div>
					<h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
					<p className="text-white/80">Sign in to access your portal</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-white/90 text-sm font-medium mb-2">
							Username
						</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
							<input
								type="text"
								value={credentials.username}
								onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
								className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
								placeholder="Enter your username"
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-white/90 text-sm font-medium mb-2">
							Password
						</label>
						<div className="relative">
							<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
							<input
								type="password"
								value={credentials.password}
								onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
								className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
								placeholder="Enter your password"
								required
							/>
						</div>
					</div>

					{error && (
						<div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center gap-2 mb-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
							<p className="text-red-200 text-sm">{error}</p>
						</div>
					)}

					{success && (
						<div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-2">
							<p className="text-green-200 text-sm">{success}</p>
						</div>
					)}

					<button
						type="submit"
						disabled={isPending}
						className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
					>
						{isPending ? (
							<>
								<Loader2 className="animate-spin" size={20} />
								<span>Signing in...</span>
							</>
						) : (
							<>
								<LogIn size={20} />
								<span>Sign In</span>
							</>
						)}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-white/60 text-sm">
						Demo credentials: Use any DummyJSON user (e.g., &quot;kminchelle&quot; / &quot;0lelplR&quot;)
					</p>
				</div>
			</div>
		</div>
	)
}
