import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type MemoryCardGridSize = 2 | 4 | 6 | 8 | 10

export type CardItem = {
  id: number
  revealed: boolean
  matched: boolean
  name: string
}

const cardEmojis = [
  '🎯', '🎮', '🎲', '🎪', '🎨', '🎭', '🎺', '🎸', '🎹', '🎤', '🎧',
  '📱', '💻', '⌚', '📷', '🚗', '✈️', '🚀', '⭐', '🌟', '💎', '🔥',
  '💧', '🌸', '🍎', '🍕', '🍰', '🎂', '🍦', '🍩', '🍪', '🍫', '🍬',
  '🐱', '🐶', '🐼', '🐨', '🦁', '🐯', '🐸', '🐙', '🦄', '🦋', '🐞',
  '🌺', '🌻', '🌹', '🌷', '🌼', '🌿', '🍀', '🌱', '🌲', '🌳'
]

export function useMemoryGame(gridSize: MemoryCardGridSize) {
  const initialTime = useRef(new Date().getTime())
  const [totalTime, setTotalTime] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const shuffledCards = useMemo(() => {
    const totalPairs = (gridSize * gridSize) / 2
    const selectedEmojis = cardEmojis
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, totalPairs)
    const cards = [...selectedEmojis, ...selectedEmojis]
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cards[i], cards[j]] = [cards[j], cards[i]]
    }
    return cards
  }, [gridSize])

  const [cardList, setCardList] = useState<CardItem[]>(
    shuffledCards.map((emoji, index) => ({
      id: index,
      name: emoji,
      revealed: false,
      matched: false,
    }))
  )
  const [revealedCards, setRevealedCards] = useState<{ name: string; index: number }[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [tryCount, setTryCount] = useState(0)

  const handleCardClick = useCallback(
    (name: string, index: number) => {
      if (!hasStarted) {
        initialTime.current = new Date().getTime()
        setHasStarted(true)
      }
      if (cardList[index].revealed || cardList[index].matched || revealedCards.length === 2) return
      const currentCard = { name, index }
      const updateCards = cardList.map(card =>
        card.id === index ? { ...card, revealed: true } : card
      )
      setRevealedCards(prev => [...prev, currentCard])
      setCardList(updateCards)
    },
    [cardList, hasStarted, revealedCards.length]
  )

  useEffect(() => {
    if (revealedCards.length === 2) {
      const [first, second] = revealedCards
      setTimeout(() => {
        setCardList(prev => {
          const updated = [...prev]
          if (
            first.name === second.name &&
            first.index !== second.index
          ) {
            updated[first.index].matched = true
            updated[second.index].matched = true
          } else {
            updated[first.index].revealed = false
            updated[second.index].revealed = false
          }
          return updated
        })
        setRevealedCards([])
        setTryCount(t => t + 1)
      }, 750)
    }
  }, [revealedCards])

  useEffect(() => {
    if (cardList.every(card => card.matched)) {
      setGameOver(true)
      setTotalTime(new Date().getTime() - initialTime.current)
    }
  }, [cardList])

  const handleRestart = useCallback(() => {
    setCardList(
      shuffledCards.map((emoji, index) => ({
        id: index,
        name: emoji,
        revealed: false,
        matched: false,
      }))
    )
    setRevealedCards([])
    setGameOver(false)
    setTryCount(0)
    setHasStarted(false)
    setTotalTime(0)
    initialTime.current = new Date().getTime()
  }, [shuffledCards])

  return {
    cardList,
    tryCount,
    totalTime,
    hasStarted,
    gameOver,
    handleCardClick,
    handleRestart,
  }
} 