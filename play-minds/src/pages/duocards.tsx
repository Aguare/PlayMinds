import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import NavBar from '../components/navbar'

interface Card {
  id: number
  name: string
  image: string
  description: string
  correct: boolean
}

const Duocards = () => {
  const [cards, setCards] = useState<Card[]>([
    {
      id: 1,
      name: '¿Cuál es la capital de Francia?',
      image: 'https://via.placeholder.com/150',
      description: 'París',
      correct: true,
    },
    {
      id: 2,
      name: '¿Cuál es el río más largo del mundo?',
      image: 'https://via.placeholder.com/150',
      description: 'El río Amazonas',
      correct: false,
    },
  ])

  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const [answeredCards, setAnsweredCards] = useState<Card[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [isAnswered, setIsAnswered] = useState<boolean>(false)

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    config: { mass: 5, tension: 500, friction: 80 },
  }))

  useEffect(() => {
    setCurrentCardIndex(0)
    setAnsweredCards([])
  }, [cards])

  const handleSwipe = (direction: string) => {
    if (!isAnswered) {
      const currentCard = cards[currentCardIndex]
      if (direction === 'right') {
        setIsCorrect(currentCard.correct)
      } else if (direction === 'left') {
        setIsCorrect(!currentCard.correct)
      }
      set({
        x: direction === 'right' ? 300 : -300,
        rotate: direction === 'right' ? 45 : -45,
        scale: 1.2,
      })
      setIsAnswered(true)
      if (!answeredCards.includes(currentCard)) {
        setAnsweredCards([...answeredCards, currentCard])
      }
      setTimeout(() => {
        const remainingCards = cards.filter(
          (card) => !answeredCards.includes(card),
        )
        if (remainingCards.length > 0) {
          setCurrentCardIndex((currentCardIndex + 1) % remainingCards.length)
        } else {
          alert('¡Has completado todas las cartas!')
        }
        setIsAnswered(false)
        set({ x: 0, rotate: 0, scale: 1 })
      }, 500)
    }
  }

  const bind = useDrag(({ down, movement: [xDir], direction: [xDir2] }) => {
    if (!down && xDir !== 0) {
      handleSwipe(xDir > 0 ? 'right' : 'left')
    }
  })

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="flex justify-center items-center h-full">
        <animated.div
          className="card"
          {...bind()}
          style={{
            transform: props.x
              .interpolate({
                range: [-300, 0, 300],
                output: [-45, 0, 45],
              })
              .interpolate((x) => `translate3d(${x}px,0,0)`),
          }}
        >
          <h1 className="card-title">{cards[currentCardIndex].name}</h1>
          <img
            className="card-image"
            src={cards[currentCardIndex].image}
            alt={cards[currentCardIndex].name}
          />
          <p className="card-description">
            {cards[currentCardIndex].description}
          </p>
          {isAnswered && (
            <p className="card-feedback">
              {isCorrect ? '¡Correcto!' : 'Incorrecto.'}
            </p>
          )}
        </animated.div>
      </div>
    </div>
  )
}

export default Duocards
