import { queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/shell/queryClient'
import { useUserProfile } from '../hooks/useUserProfile'
import { 
	ArrowLeft, 
	User, 
	Mail, 
	Phone, 
	MapPin, 
	Building, 
	CreditCard, 
	GraduationCap,
	Shield,
	Globe,
	Smartphone,
	Monitor,
	Coins,
	IdCard,
	Heart,
	Eye,
	Scissors,
	Scale,
	Ruler
} from 'lucide-react'

export default function UserProfileView(): React.ReactNode {
	const profileId = window.location.pathname.split('/')[2]
	const { profilesGetById } = useUserProfile()
	const { data, isLoading, isFetched } = profilesGetById(+profileId)

	const handleBack = () => {
		queryClient.setQueryData([queryKeys.navigate], '/directory')
	}

	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
				<div className="max-w-4xl mx-auto">
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
						<p className="text-white/80 mt-4">Cargando perfil...</p>
					</div>
				</div>
			</div>
		)
	}

	if (!data && isFetched) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
				<div className="max-w-4xl mx-auto">
					<div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/30">
						<div className="flex items-center space-x-3 text-red-400">
							<Shield size={24} />
							<h3 className="text-lg font-semibold">No se encontró el usuario</h3>
						</div>
						<p className="text-red-300 mt-2">El perfil solicitado no existe o no está disponible.</p>
					</div>
				</div>
			</div>
		)
	}

	if (!data) return null

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<button
						onClick={handleBack}
						className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-200"
					>
						<ArrowLeft size={20} />
						<span>Volver</span>
					</button>
					
					<div className="text-right">
						<h1 className="text-2xl font-bold text-white">Perfil de Usuario</h1>
						<p className="text-white/60">Información detallada</p>
					</div>
				</div>

				{/* Profile Header Card */}
				<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
					<div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
						<div className="relative">
							<img
								src={data.image}
								alt={`${data.firstName} ${data.lastName}`}
								className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20"
							/>
							<div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-6 h-6 border-2 border-white"></div>
						</div>
						
						<div className="text-center md:text-left">
							<h2 className="text-3xl font-bold text-white mb-2">
								{data.firstName} {data.lastName}
							</h2>
							<p className="text-white/80 text-lg mb-2">@{data.username}</p>
							<div className="flex flex-wrap justify-center md:justify-start gap-2">
								<span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
									{data.gender}
								</span>
								<span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
									{data.age} años
								</span>
								<span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
									{data.role}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Information Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Personal Information */}
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
						<div className="flex items-center space-x-3 mb-6">
							<User className="text-blue-400" size={24} />
							<h3 className="text-xl font-bold text-white">Información Personal</h3>
						</div>
						
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<Mail className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Email</p>
									<p className="text-white font-medium">{data.email}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Phone className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Teléfono</p>
									<p className="text-white font-medium">{data.phone}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Heart className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Fecha de nacimiento</p>
									<p className="text-white font-medium">{data.birthDate}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<IdCard className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Apellido de soltera</p>
									<p className="text-white font-medium">{data.maidenName}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Physical Information */}
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
						<div className="flex items-center space-x-3 mb-6">
							<Scale className="text-green-400" size={24} />
							<h3 className="text-xl font-bold text-white">Información Física</h3>
						</div>
						
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<Heart className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Grupo sanguíneo</p>
									<p className="text-white font-medium">{data.bloodGroup}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Ruler className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Altura</p>
									<p className="text-white font-medium">{data.height} cm</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Scale className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Peso</p>
									<p className="text-white font-medium">{data.weight} kg</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Eye className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Color de ojos</p>
									<p className="text-white font-medium">{data.eyeColor}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Scissors className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Cabello</p>
									<p className="text-white font-medium">{data.hair.color} - {data.hair.type}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Address Information */}
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
						<div className="flex items-center space-x-3 mb-6">
							<MapPin className="text-red-400" size={24} />
							<h3 className="text-xl font-bold text-white">Dirección</h3>
						</div>
						
						<div className="space-y-4">
							<div>
								<p className="text-white/60 text-sm">Dirección completa</p>
								<p className="text-white font-medium">
									{data.address.address}, {data.address.city}
								</p>
								<p className="text-white font-medium">
									{data.address.state}, {data.address.postalCode}
								</p>
								<p className="text-white font-medium">{data.address.country}</p>
							</div>
							
							<div className="flex items-center space-x-3">
								<Globe className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">IP Address</p>
									<p className="text-white font-medium">{data.ip}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Smartphone className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">MAC Address</p>
									<p className="text-white font-medium">{data.macAddress}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Company Information */}
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
						<div className="flex items-center space-x-3 mb-6">
							<Building className="text-yellow-400" size={24} />
							<h3 className="text-xl font-bold text-white">Información Laboral</h3>
						</div>
						
						<div className="space-y-4">
							<div>
								<p className="text-white/60 text-sm">Empresa</p>
								<p className="text-white font-medium">{data.company.name}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">Cargo</p>
								<p className="text-white font-medium">{data.company.title}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">Departamento</p>
								<p className="text-white font-medium">{data.company.department}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">Dirección de la empresa</p>
								<p className="text-white font-medium">
									{data.company.address.address}, {data.company.address.city}
								</p>
								<p className="text-white font-medium">
									{data.company.address.state}, {data.company.address.postalCode}
								</p>
								<p className="text-white font-medium">{data.company.address.country}</p>
							</div>
						</div>
					</div>

					{/* Bank Information */}
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
						<div className="flex items-center space-x-3 mb-6">
							<CreditCard className="text-green-400" size={24} />
							<h3 className="text-xl font-bold text-white">Información Bancaria</h3>
						</div>
						
						<div className="space-y-4">
							<div>
								<p className="text-white/60 text-sm">Tarjeta</p>
								<p className="text-white font-medium">{data.bank.cardType}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">Número</p>
								<p className="text-white font-medium">{data.bank.cardNumber}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">Expira</p>
								<p className="text-white font-medium">{data.bank.cardExpire}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">Moneda</p>
								<p className="text-white font-medium">{data.bank.currency}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">IBAN</p>
								<p className="text-white font-medium">{data.bank.iban}</p>
							</div>
						</div>
					</div>

					{/* Additional Information */}
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
						<div className="flex items-center space-x-3 mb-6">
							<Shield className="text-purple-400" size={24} />
							<h3 className="text-xl font-bold text-white">Información Adicional</h3>
						</div>
						
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<GraduationCap className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Universidad</p>
									<p className="text-white font-medium">{data.university}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Coins className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">Criptomoneda</p>
									<p className="text-white font-medium">{data.crypto.coin}</p>
								</div>
							</div>
							
							<div className="flex items-center space-x-3">
								<Monitor className="text-white/60" size={18} />
								<div>
									<p className="text-white/60 text-sm">User Agent</p>
									<p className="text-white font-medium text-xs truncate">{data.userAgent}</p>
								</div>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">EIN</p>
								<p className="text-white font-medium">{data.ein}</p>
							</div>
							
							<div>
								<p className="text-white/60 text-sm">SSN</p>
								<p className="text-white font-medium">{data.ssn}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
