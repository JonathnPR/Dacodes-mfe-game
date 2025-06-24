import '../styles.css'
import { useState, useCallback } from 'react'
import MemoryCardBoard from '../components/MemoryCardBoard'
import MemoryCardSelection from '../components/MemoryCardSelection'
import type { MemoryCardGridSize } from '../hooks/useMemoryGame'

export default function MemoryCardView(): React.ReactNode {
	const [gridSize, setGridSize] = useState<MemoryCardGridSize>()
	const [boardKey, setBoardKey] = useState(0)

	const handleSelectGridSize = useCallback((size: MemoryCardGridSize) => {
		setGridSize(size)
	}, [])

	const handleBack = useCallback(() => {
		setGridSize(undefined)
	}, [])

	if (gridSize) {
		return (
			<MemoryCardBoard
				key={boardKey}
				gridSize={gridSize}
				handleBack={handleBack}
			/>
		)
	}

	return <MemoryCardSelection handleSelectGridSize={handleSelectGridSize} />
}
