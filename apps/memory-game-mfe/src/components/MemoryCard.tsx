import React from 'react'

/**
 * Props for MemoryCard component
 * @param id - Unique card id
 * @param name - Emoji or value to display
 * @param revealed - If the card is currently revealed
 * @param matched - If the card has been matched
 * @param onClick - Handler when the card is clicked
 */
type Props = {
	id: number
	name: string
	revealed: boolean
	matched: boolean
	onClick: (name: string, id: number) => void
}

export default function MemoryCard({
	id,
	name,
	revealed,
	matched,
	onClick,
}: Props): React.ReactElement {
	return (
		<button
			onClick={() => onClick(name, id)}
			disabled={revealed || matched}
			className={`
				w-16 h-16 sm:w-20 sm:h-20 rounded-lg text-2xl sm:text-3xl font-bold transition-all duration-300 transform
				${matched 
					? 'bg-green-500/20 border-green-500/30 text-green-400' 
					: revealed 
						? 'bg-white/20 border-white/30 text-white' 
						: 'bg-white/10 border-white/20 text-transparent hover:bg-white/20'
				}
				${matched ? 'scale-95' : 'hover:scale-105'}
				border-2 disabled:cursor-not-allowed
			`}
		>
			{revealed || matched ? name : '?'}
		</button>
	)
}
